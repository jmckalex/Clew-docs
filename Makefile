# Makefile for clew-app.com — the Clew website and manual
#
# Usage:
#   make dry-run          Preview what a sync would change (no upload)
#   make sync             Upload the site to the droplet (NOT the binaries)
#   make stage-downloads  Copy release binaries out of Clew-app/out/
#   make sync-downloads   Upload the staged binaries (slow — ~640 MB)
#   make serve            Serve site/ locally at http://localhost:8000
#   make check-links      Verify every local href/src resolves on disk
#   make dns-check        Have the domains been pointed at the droplet yet?
#   make provision        One-time: create the remote web root (idempotent)
#   make nginx-install    Install/refresh the nginx site config on the droplet
#   make tls              One-time: get the certificate for all four names
#   make ls               List remote files
#   make tail-log         Tail the nginx access log for this site
#   make help             Show available targets
#
# First time, in order: dns-check, provision, nginx-install, sync, tls.

REMOTE_HOST  := jmck-web
REMOTE_PATH  := /var/www/clew-app.com
REMOTE_OWNER := web:web
SITE_URL     := https://clew-app.com
SITE_NAME    := clew-app.com
NGINX_CONF   := clew-app.com.nginx.conf

# clew-app.com is canonical; clew-app.net redirects to it. All four names go
# on one certificate — an alternate domain without one fails outright in a
# browser that tries https first, instead of redirecting.
CERT_DOMAINS := clew-app.com www.clew-app.com clew-app.net www.clew-app.net
DROPLET_IP   := 139.59.191.156

# The published tree. The other sites in ~/Sites/digital_ocean list their
# files explicitly; this one cannot — the manual alone is 28 pages and 24
# images, and a hand-kept list would be wrong the first time a chapter is
# added. site/ earns its keep instead: everything inside it is publishable,
# and everything that is not (README, Makefile, nginx conf, .git) sits above
# it, where a directory sync can never sweep it up.
LOCAL_DIR := site

# Release binaries: ~640 MB, so they are in neither git nor the ordinary
# sync. They change only when a release ships. `make stage-downloads` copies
# them out of the app repo's out/ and `make sync-downloads` uploads them.
VERSION := 0.9.0
OUT_DIR := ../Clew-app/out
DL_DIR  := $(LOCAL_DIR)/downloads

# rsync flags:
#   -a  archive mode (preserves timestamps, perms, etc.)
#   -v  verbose
#   -z  compress in transit
#   --delete               remove remote files that are gone locally, so a
#                          renamed or retired manual page does not linger
#                          and keep answering requests
#   --chown                set owner:group on remote
#   --chmod                sane permissions (rw owner, r group/world)
#   --exclude='downloads/' the binaries are uploaded separately. rsync does
#                          NOT delete excluded paths on the remote, so this
#                          one line is also what stops --delete from wiping
#                          640 MB of releases on every ordinary sync.
#   --rsync-path="sudo rsync"  run rsync as root on the droplet so we can
#                              write into /var/www and apply --chown
RSYNC_FLAGS := -avz --delete \
               --chown=$(REMOTE_OWNER) \
               --chmod=F644,D755 \
               --exclude='downloads/' \
               --exclude='.DS_Store' \
               --exclude='.git*' \
               --exclude='*~' \
               --exclude='*.sw?' \
               --rsync-path="sudo rsync"

# --delete makes a truncated local tree catastrophic: syncing an empty or
# half-copied site/ would erase the live site. `check` refuses to run in that
# case. Never remove this guard.
MIN_FILES := 50

# The social card. Rendered from og/clew-og.html rather than drawn by hand, so
# the wordmark, palette and tagline cannot drift from the landing page.
# Headless Chrome and sips are both already on this machine — the other sites'
# og-renderer needs puppeteer and sharp, which this repo deliberately does not.
CHROME  := /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
OG_SRC  := og/clew-og.html
OG_OUT  := $(LOCAL_DIR)/images/clew-og-card.jpg
OG_TMP  := /tmp/clew-og-2x.png

.PHONY: help check check-links sync dry-run stage-downloads sync-downloads \
        serve preview ls tail-log provision nginx-install nginx-diff \
        dns-check tls og-card og-tags

help:
	@echo "Targets:"
	@echo "  make dry-run          - Preview changes without uploading"
	@echo "  make sync             - Upload $(LOCAL_DIR)/ to $(REMOTE_HOST):$(REMOTE_PATH)"
	@echo "  make stage-downloads  - Copy v$(VERSION) binaries from $(OUT_DIR)"
	@echo "  make sync-downloads   - Upload staged binaries (~640 MB)"
	@echo "  make serve            - Serve $(LOCAL_DIR)/ at http://localhost:8000"
	@echo "  make check            - Verify the local tree is safe to sync"
	@echo "  make check-links      - Verify local links resolve on disk"
	@echo "  make og-card          - Re-render the social card (1200x630)"
	@echo "  make og-tags          - Regenerate the manual's social tags"
	@echo "  make dns-check        - Do the domains point at the droplet yet?"
	@echo "  make provision        - Create the remote web root (one-time)"
	@echo "  make nginx-install    - Install the nginx config on the droplet"
	@echo "  make tls              - Certificate for all four names (one-time)"
	@echo "  make ls               - List remote files with permissions"
	@echo "  make tail-log         - Tail the nginx access log"
	@echo ""
	@echo "First time, in order: dns-check, provision, nginx-install, sync, tls."

check:
	@[ -f "$(LOCAL_DIR)/index.html" ] || { \
	  echo "ERROR: $(LOCAL_DIR)/index.html is missing."; exit 1; }
	@[ -f "$(LOCAL_DIR)/manual/index.html" ] || { \
	  echo "ERROR: $(LOCAL_DIR)/manual/index.html is missing."; exit 1; }
	@n=$$(find $(LOCAL_DIR) -type f ! -path '*/downloads/*' | wc -l | tr -d ' '); \
	 if [ "$$n" -lt $(MIN_FILES) ]; then \
	   echo "ERROR: only $$n files under $(LOCAL_DIR)/ (expected at least $(MIN_FILES))."; \
	   echo "       Refusing to sync — --delete would erase the live site."; \
	   exit 1; \
	 fi; \
	 echo "$(LOCAL_DIR)/: $$n files; landing page and manual both present."

check-links:
	@node check-links.js $(LOCAL_DIR)

# Regenerate the manual's social tags from each page's own <title> and
# description. Idempotent, and the landing page is left alone (its tags are
# hand-written and describe the site, not a chapter). Run after adding a
# chapter — `make check-links` reports pages that need it.
og-tags:
	@node apply-og.js $(LOCAL_DIR)

# Rendered at 2x and downsampled, which is what makes the type crisp — a
# straight 1200x630 screenshot of the same page looks soft next to it.
# Must run on the Mac: the card uses Avenir Next, the same face the landing
# page asks for first, and it falls back silently anywhere that lacks it.
og-card:
	@[ -x "$(CHROME)" ] || { echo "ERROR: Chrome not found at $(CHROME)"; exit 1; }
	@rm -f "$(OG_TMP)"
	@"$(CHROME)" --headless --disable-gpu --hide-scrollbars \
	  --force-device-scale-factor=2 --window-size=1200,630 \
	  --screenshot="$(OG_TMP)" "file://$(CURDIR)/$(OG_SRC)" >/dev/null 2>&1
	@[ -f "$(OG_TMP)" ] || { echo "ERROR: Chrome wrote no screenshot."; exit 1; }
	@sips -s format jpeg -s formatOptions 88 -z 630 1200 "$(OG_TMP)" --out "$(OG_OUT)" >/dev/null
	@rm -f "$(OG_TMP)"
	@echo "Wrote $(OG_OUT):"
	@sips -g pixelWidth -g pixelHeight "$(OG_OUT)" | tail -2
	@ls -lh "$(OG_OUT)" | awk '{print "  " $$5}'

sync: check
	rsync $(RSYNC_FLAGS) $(LOCAL_DIR)/ $(REMOTE_HOST):$(REMOTE_PATH)/
	@echo ""
	@echo "Deployed to $(SITE_URL)"

dry-run: check
	rsync $(RSYNC_FLAGS) --dry-run --itemize-changes $(LOCAL_DIR)/ $(REMOTE_HOST):$(REMOTE_PATH)/

# The landing page links hyphenated filenames; electron-builder writes the
# Windows installer with spaces ("Clew Setup 0.9.0.exe"). Rename on the way
# in rather than percent-encoding the href — a URL with %20 in it is the kind
# of thing that gets mangled when someone pastes the link.
stage-downloads:
	@[ -d "$(OUT_DIR)" ] || { echo "ERROR: $(OUT_DIR) not found."; exit 1; }
	@mkdir -p $(DL_DIR)
	@set -e; \
	 cp -v "$(OUT_DIR)/Clew-$(VERSION)-universal.dmg" "$(DL_DIR)/Clew-$(VERSION)-universal.dmg"; \
	 cp -v "$(OUT_DIR)/Clew Setup $(VERSION).exe"     "$(DL_DIR)/Clew-Setup-$(VERSION).exe"; \
	 cp -v "$(OUT_DIR)/Clew-$(VERSION).AppImage"      "$(DL_DIR)/Clew-$(VERSION).AppImage"; \
	 cp -v "$(OUT_DIR)/clew_$(VERSION)_amd64.deb"     "$(DL_DIR)/clew_$(VERSION)_amd64.deb"
	@echo ""
	@echo "Staged into $(DL_DIR):"
	@ls -lh $(DL_DIR)
	@echo ""
	@echo "Now run 'make check-links' to confirm the page finds them,"
	@echo "then 'make sync-downloads' to upload."

# Separate from `sync` on purpose: this moves ~640 MB and is needed only when
# a release ships. No --delete here — older versions stay downloadable, so a
# link someone bookmarked or posted does not rot the moment a new build lands.
sync-downloads:
	@[ -d "$(DL_DIR)" ] || { \
	  echo "ERROR: $(DL_DIR) does not exist — run 'make stage-downloads' first."; exit 1; }
	rsync -avz --progress \
	  --chown=$(REMOTE_OWNER) --chmod=F644,D755 \
	  --rsync-path="sudo rsync" \
	  $(DL_DIR)/ $(REMOTE_HOST):$(REMOTE_PATH)/downloads/
	@echo ""
	@echo "Binaries live at $(SITE_URL)/downloads/"

# file:// works for the manual, but the landing page and the nginx config are
# both about how this behaves over http — serve it the way it will be served.
serve:
	@echo "Serving $(LOCAL_DIR)/ at http://localhost:8000/  (Ctrl-C to stop)"
	@cd $(LOCAL_DIR) && python3 -m http.server 8000

preview:
	open $(LOCAL_DIR)/index.html

ls:
	ssh $(REMOTE_HOST) 'ls -la $(REMOTE_PATH)'

tail-log:
	ssh $(REMOTE_HOST) 'sudo tail -f /var/log/nginx/$(SITE_NAME).access.log'

provision:
	ssh $(REMOTE_HOST) 'mkdir -p $(REMOTE_PATH)/downloads && chown -R $(REMOTE_OWNER) $(REMOTE_PATH) && chmod 755 $(REMOTE_PATH) $(REMOTE_PATH)/downloads && ls -ld $(REMOTE_PATH) $(REMOTE_PATH)/downloads'

# Copies the config up, tests it, and reloads only if the test passes — a bad
# config that reaches nginx without `nginx -t` takes every other site on the
# droplet down with it, not just this one.
nginx-install:
	scp $(NGINX_CONF) $(REMOTE_HOST):/tmp/$(NGINX_CONF)
	ssh $(REMOTE_HOST) 'set -e; \
	  install -m 644 /tmp/$(NGINX_CONF) /etc/nginx/sites-available/$(SITE_NAME); \
	  ln -sfn /etc/nginx/sites-available/$(SITE_NAME) /etc/nginx/sites-enabled/$(SITE_NAME); \
	  rm -f /tmp/$(NGINX_CONF); \
	  nginx -t && systemctl reload nginx && echo "nginx reloaded"'

# Everything else is blocked on this. The domains are registered with GoDaddy
# and still resolve to its parking IPs; the A records have to be repointed at
# the droplet by hand. www is a CNAME to the apex at the registrar, so it
# follows automatically — but it is checked here too rather than assumed,
# because certbot fails the whole request if any one name does not resolve.
dns-check:
	@ok=1; \
	 for d in $(CERT_DOMAINS); do \
	   got=$$(dig +short $$d A | tail -1); \
	   if [ "$$got" = "$(DROPLET_IP)" ]; then \
	     printf "  OK       %-22s -> %s\n" "$$d" "$$got"; \
	   else \
	     printf "  WRONG    %-22s -> %s\n" "$$d" "$${got:-(no A record)}"; ok=0; \
	   fi; \
	 done; \
	 if [ $$ok -eq 1 ]; then \
	   echo ""; echo "All four names point at the droplet. Safe to run 'make tls'."; \
	 else \
	   echo ""; \
	   echo "Point the A records at $(DROPLET_IP) in the GoDaddy DNS panel."; \
	   echo "Propagation is usually minutes, but the TTL on the parked records"; \
	   echo "may hold the old answer for up to an hour."; \
	   exit 1; \
	 fi

# One-time. Certbot rewrites /etc/nginx/sites-available/$(SITE_NAME) in place,
# adding the 443 blocks and the http -> https redirects, and installs a renewal
# timer. Gated on dns-check because a certbot failure counts against Let's
# Encrypt's rate limit (5 failed validations per account per hostname per hour)
# — a premature run costs you the next few attempts as well.
tls: dns-check
	ssh -t $(REMOTE_HOST) 'certbot --nginx $(foreach d,$(CERT_DOMAINS),-d $(d))'
	@echo ""
	@echo "Now live at $(SITE_URL) — check with: make nginx-diff"

# Certbot rewrites the live config in place (adding the 443 blocks), so the
# copy here drifts from the server by design. This shows how far.
nginx-diff:
	@ssh $(REMOTE_HOST) 'cat /etc/nginx/sites-available/$(SITE_NAME) 2>/dev/null' \
	  | diff -u $(NGINX_CONF) - && echo "identical to the droplet's copy"
