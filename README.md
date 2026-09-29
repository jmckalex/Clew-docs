# Clew — website and manual

The public documentation for Clew: a landing page and a 28-chapter manual,
served as one static tree.

Live at **<https://clew-app.com>** — or it will be: the domain is registered
but still on the registrar's parking IPs. See
[First-time server setup](#first-time-server-setup).

`clew-app.net` is registered too and redirects to `.com`, so the two do not
become separately-indexed copies of the same site.

This is a sibling of `Clew-app` and `Clew-iOS` under `~/Source/Clew/`, and it is
its own git repository. The docs describe *Clew*, not the desktop app
specifically, so they belong beside both implementations rather than inside
either one.

## Layout

```
site/                 ← the web root; everything here is published
├── index.html        landing page
├── images/           landing-page art + the app icon (see below)
├── manual/           the manual: 28 chapters + index
│   ├── manual.css    shared stylesheet (landing-page palette)
│   ├── nav.js        single source of the sidebar tree and prev/next links
│   └── images/       the manual's own copy of every screenshot
└── downloads/        release binaries — not in git, staged from Clew-app/out/

check-links.js        link checker: `make check-links`
apply-og.js           regenerates the manual's social tags: `make og-tags`
og/clew-og.html       source of the social card: `make og-card`
clew-app.com.nginx.conf   the server config, mirrored on the droplet at
                          /etc/nginx/sites-available/clew-app.com
Makefile              deployment; `make help` lists the targets
CLAUDE.md             guidance for Claude Code, including the editing conventions
HANDOVER.md           session state and open items — read this first
```

Nothing outside `site/` is ever published. That is the whole reason for the
extra directory level: the deploy is a directory sync, so anything that must
not reach the web has to be somewhere the sync cannot see.

### The manual is self-contained on purpose

`site/manual/images/` duplicates ten files from `site/images/`. **Keep the
duplication.** The manual is sometimes served as its own web root, and every
`../images/` reference 404s the moment it is. `make check-links` fails the
build if a manual page reaches above `manual/` for an asset.

The one deliberate exception is the top bar's Home and Download links, which
point at `../index.html`. Those are navigation rather than assets, they are
expected to leave the manual, and `check-links` reports them as a counted
note rather than an error.

## Social previews

Every page carries Open Graph and Twitter card tags, so a shared link renders
as a card rather than a bare URL. Two moving parts:

**The image** — `site/images/clew-og-card.jpg`, 1200×630, generated from
`og/clew-og.html` by `make og-card`. It is HTML rather than a drawing so the
wordmark, palette and tagline cannot drift from the landing page. Rendered
with headless Chrome at 2× and downsampled by `sips`; both ship with macOS, so
unlike the `og-renderer` used by the other sites this needs no puppeteer, no
sharp, and no `node_modules`.

**Must be re-rendered on a Mac.** The card asks for Avenir Next, the same face
the landing page asks for first. Anywhere else it silently falls back and the
wordmark comes out in Helvetica.

**The tags** — the landing page's are hand-written and describe the site. The
manual's 28 pages get theirs from `make og-tags`, derived from each page's own
`<title>` and `<meta name="description">` so there is one source for a page's
description rather than two that can disagree.

Run `make og-tags` after adding a chapter. A chapter written by copying an
existing page inherits its `og:url` and `og:title`, and nothing about the
rendered page looks wrong — the tags are invisible until someone shares the
link, at which point the new chapter claims to be the old one. `make
check-links` reports any page whose `og:url` disagrees with its filename.

If the domain ever changes, it appears in `apply-og.js` (`SITE`), in
`site/index.html`, and in `og/clew-og.html`'s footer.

## Deploying

```sh
make dry-run     # see exactly what would change
make sync        # upload site/ (not the binaries)
```

`sync` uses `rsync --delete`, so a page removed here is removed from the
server — that is how a renamed chapter stops answering at its old URL. It also
means a truncated local tree would erase the live site, so `make check`
(which `sync` depends on) refuses to run unless the landing page, the manual
index, and at least 50 files are all present.

`site/downloads/` is excluded from that sync, which both keeps 640 MB off the
wire on every ordinary deploy and protects the remote copy from `--delete`.

### Publishing a release

```sh
make stage-downloads   # copies v0.9.0 binaries from ../Clew-app/out/
make check-links       # confirms the landing page's four hrefs now resolve
make sync-downloads    # ~640 MB, uploaded once per release
```

`VERSION` at the top of the Makefile must match the version the landing page
links to. `stage-downloads` renames the Windows installer from
`Clew Setup 0.9.0.exe` to `Clew-Setup-0.9.0.exe`, because electron-builder
writes spaces and a URL with `%20` in it is the kind of thing that gets
mangled when someone pastes the link.

Older versions are left in place on the server — `sync-downloads` does not
use `--delete`, so a link that has been posted somewhere keeps working.

## First-time server setup

The droplet is `jmck-web` (→ 139.59.191.156, Ubuntu, nginx 1.24), the one
that serves jmckalex.org and fishhooksoftware.com; this adds one more site in
the same pattern. (Until 2026-09-23 this targeted the TROCP droplet, `do` →
144.126.236.254, which still holds an unserved August copy in
`/var/www/clew-app.com` — safe to delete once this one is live.)

In order:

```sh
make dns-check        # gate: are the domains pointed here yet?
make provision        # mkdir /var/www/clew-app.com{,/downloads}, chown web:web
make nginx-install    # install the config, nginx -t, reload only if it passes
make sync             # upload the site
make tls              # certificate for all four names
```

**1. DNS — the only step that cannot be done from here.** Both domains are
registered with GoDaddy (`ns75`/`ns76.domaincontrol.com`) and still resolve to
its parking IPs. In the GoDaddy DNS panel, point the A record for each apex at
`139.59.191.156`. `www` is already a CNAME to the apex on both, so it
follows automatically.

`make dns-check` verifies all four names and refuses to go on until they
agree. Propagation is usually minutes, but the TTL on the parked records can
hold the old answer for up to an hour.

**2. Web root and config.** `nginx-install` runs `nginx -t` before reloading,
because a bad config that reaches nginx unchecked takes down every other site
on the droplet, not just this one.

**3. TLS.** `make tls` runs certbot for all four names at once:

```
clew-app.com  www.clew-app.com  clew-app.net  www.clew-app.net
```

The two `.net` names are on the certificate deliberately, even though they
only ever redirect. A browser in HTTPS-first mode tries `https://clew-app.net`
before it will try `http://` — without a certificate covering it, that fails
outright instead of redirecting. This matches the `opensocietyasanenemy.info`
certificate on the same droplet, which covers all six of its names.

`make tls` is gated on `dns-check` because a failed certbot run counts against
Let's Encrypt's rate limit (5 failed validations per hostname per hour), so a
premature attempt costs you the next few as well.

Certbot rewrites `/etc/nginx/sites-available/clew-app.com` in place, adding
the 443 blocks and the http→https redirects, and installs a renewal timer. The
copy in this repo stays at port 80 by design; `make nginx-diff` shows how far
the server has moved from it.

## Relationship to Clew-app

One real coupling: `Clew-app/scripts/make-icon.js` renders the app icon from
`build-resources/icon.svg` and writes `icon.svg`, `favicon.svg`, and
`icon-256.png` into `site/images/` here, so the site's mark cannot drift from
the app's. It locates this repo as a sibling (`../Clew-docs/site/images`) and
skips the step silently if it is not checked out.

The other coupling is editorial and has no mechanism behind it: **when a
feature changes, the manual has to change with it.** That was easy to
remember when the docs lived inside the app repo and showed up in its
`git status`. It is not any more. Both `CLAUDE.md` files say so.
