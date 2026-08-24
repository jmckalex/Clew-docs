# Clew — website and manual

The public documentation for [Clew](https://github.com/jmckalex/clew): a landing
page and a 28-chapter manual, served as one static tree.

Live at **<https://clew.jmckalex.org>** (see [First-time server setup](#first-time-server-setup)
— the DNS record is not in place yet).

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
clew.nginx.conf       the server config, mirrored at /etc/nginx/sites-available/clew
Makefile              deployment; `make help` lists the targets
CLAUDE.md             guidance for Claude Code, including the editing conventions
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
make stage-downloads   # copies v0.8.0 binaries from ../Clew-app/out/
make check-links       # confirms the landing page's four hrefs now resolve
make sync-downloads    # ~640 MB, uploaded once per release
```

`VERSION` at the top of the Makefile must match the version the landing page
links to. `stage-downloads` renames the Windows installer from
`Clew Setup 0.8.0.exe` to `Clew-Setup-0.8.0.exe`, because electron-builder
writes spaces and a URL with `%20` in it is the kind of thing that gets
mangled when someone pastes the link.

Older versions are left in place on the server — `sync-downloads` does not
use `--delete`, so a link that has been posted somewhere keeps working.

## First-time server setup

The droplet (`do` → 144.126.236.254, Ubuntu 24.04, nginx 1.24) already hosts
several sites in this pattern; this adds one more.

**1. DNS.** Add an A record for `clew` under `jmckalex.org` pointing at
`144.126.236.254`. This is the only step that cannot be done from here — it
needs registrar access. Nothing below will work until it resolves:

```sh
dig +short clew.jmckalex.org      # must print 144.126.236.254
```

**2. Web root and config.**

```sh
make provision        # mkdir /var/www/clew{,/downloads}, chown web:web
make nginx-install    # install the config, nginx -t, reload only if it passes
make sync             # upload the site
```

`nginx-install` runs `nginx -t` before reloading, because a bad config that
reaches nginx unchecked takes down every other site on the droplet, not just
this one.

**3. TLS.** Once DNS resolves and the site answers on port 80:

```sh
ssh do 'certbot --nginx -d clew.jmckalex.org'
```

Certbot rewrites `/etc/nginx/sites-available/clew` in place, adding the 443
block and the http→https redirect. The copy in this repo stays at port 80 by
design; `make nginx-diff` shows how far the server has moved from it.

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
