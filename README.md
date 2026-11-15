# VDS PROJECTEUR digital business card

This is a static, mobile-first digital contact card. Deploy the folder to any static web host.

## Set the QR destination

After deploying, edit `config.js` and set `window.VDS_CARD_URL` to the public HTTPS URL for the card. Leave it blank to use the current page address. The QR code is generated in the visitor's browser and contains one link to the full card.

The QR generator is the open-source `qrcode` browser library loaded from cdnjs; it does not call a paid QR service. The Google Fonts import is optional; system fallbacks are defined.

## Brand asset

The official transparent vertical logo is stored at `assets/vds-projecteur-logo.png` and used throughout the card. Keep the relative `assets/` folder beside `index.html` when deploying; this works with GitHub Pages project sites and custom domains.

## GitHub Pages

1. Commit and push `index.html`, `styles.css`, `app.js`, `config.js`, and the complete `assets/` folder to the repository.
2. In the repository, open **Settings → Pages** and select the branch and folder that contain `index.html` (usually the `main` branch and `/ (root)`).
3. Save, then wait for GitHub Pages to publish the site over HTTPS.
4. Put the exact HTTPS address GitHub Pages publishes into `window.VDS_CARD_URL` in `config.js`. If you leave the setting blank, the card uses its current page address, which is the deployed HTTPS URL when visitors open it on GitHub Pages.
5. Commit and push the `config.js` change if you set an explicit address, then open the published URL and scan the QR code to confirm it opens that card.

The QR code uses the open-source `qrcode` library from cdnjs in the visitor's browser. It does not use a paid QR service. GitHub Pages serves the page and local assets; the QR library and optional Google Fonts need an internet connection.
