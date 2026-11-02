# XP BOT website

Product introduction at [xp-bot.cn](https://xp-bot.cn/), independently hosted on GitHub Pages. Static HTML, CSS and JavaScript; no build step, third-party scripts, analytics or credentials. Keep CNAME and .nojekyll. The existing personal website is separate.

The November 3 redesign follows the measured layout and interaction sequence of the [Apple product reference](https://www.apple.com.cn/macbook-pro/proled-xdr-display/): product-first hero, sticky local navigation, large highlight cards with dot/progress and pause controls, product exploration, and continuous scroll close-ups. All product content and imagery belong to the XP BOT presentation; no Apple product media is included.

Five 18-second H.264 films cover RAG, robot configuration, company onboarding, image templates and automation. They combine reviewed development screenshots with illustrative workflows and example data, clearly labelled; they are not live operation recordings. Films play in an accessible native dialog with controls. Motion respects reduced-motion settings. Video and carousel activity pause when appropriate.

## Availability

Installer preparation is in progress. No public installation package is available. The download control stays disabled until a real distributable package is verified. The current development environment is macOS 13.0+ on Apple Silicon. Windows has not been released.

## Product claims

The creator reports that a manual run previously took 1–2 hours and is now executed on a configured background schedule. This is an individual usage example. Company onboarding assumes existing authorization and quota; model and external service costs depend on the configured services. No company endpoints, private documents or credentials are published. Local jobs require the computer and relevant services to remain available.

XP BOT is an independent customization based on DeepSeek Harness, not an official DeepSeek product.

## Preview and updates

Run `python3 -m http.server 8765` from this directory and open `http://127.0.0.1:8765/`. CSS, script and film URLs use content hashes for cache updates. On release, replace the disabled download control with a verified package URL and update system requirements, release status and FAQ together.
