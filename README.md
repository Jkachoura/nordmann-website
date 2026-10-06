# Nordmann Automotive — website

Website van **Nordmann Automotive**, premium autoverhuur in Rotterdam.
Live op [www.nordmannautomotive.nl](https://www.nordmannautomotive.nl).

Een snelle, statische site (HTML, CSS en JavaScript) zonder build-stap en zonder server.
Reserveringsaanvragen lopen via WhatsApp, dus er is geen database of backend nodig.

## Projectstructuur

Alles wat online komt staat in `public/`. De rest is projectbeheer.

```
.
├── public/                       De website (dit wordt gepubliceerd)
│   ├── index.html                Homepage
│   ├── 404.html                  Pagina niet gevonden
│   ├── privacy/                  Privacyverklaring
│   ├── algemene-voorwaarden/     Keuze: particulier of zakelijk
│   ├── voorwaarden/              Algemene voorwaarden particulier
│   ├── voorwaarden-zakelijk/     Algemene voorwaarden zakelijk
│   ├── downloads/                Voorwaarden als pdf
│   ├── assets/
│   │   ├── css/                  Eén bestand per onderdeel (tokens, base, header, hero, fleet, …)
│   │   ├── js/                   main.js (navigatie) en booking.js (reserveringsformulier)
│   │   ├── fonts/                Montserrat, zelf gehost
│   │   └── img/                  brand/ (logo's), icons/ (favicons), og-image.jpg
│   ├── favicon.ico, site.webmanifest
│   └── robots.txt, sitemap.xml
├── tests/                        Automatische browsertests (Playwright)
├── docs/                         Werkafspraken en publiceren
├── .github/workflows/            Controles op pull requests en publiceren naar GitHub Pages
├── netlify.toml                  Netlify publiceert alleen public/
└── package.json                  Testgereedschap (alleen voor ontwikkeling)
```

## Lokaal bekijken

```bash
python -m http.server 8000 --directory public
# open http://localhost:8000
```

## Een auto toevoegen

1. Zet de foto in `public/assets/img/cars/` (minimaal 1600 px breed, `.jpg`).
2. Kopieer in `public/index.html` een blok `<article class="car">…</article>` en pas tekst, specificaties en foto aan.
3. Voeg de auto toe als `<option>` in het formulier (`#bf-car`) en als kaart in de hero (`.hero__cars`).

## Foto's plaatsen

Zolang er geen eigen foto's zijn, toont de site per auto een merkvisual (`public/assets/css/visual.css`).
Vervang in `public/index.html` elk blok `<figure class="… visual">` door een foto:

| Plek | Formaat | Voorbeeld |
| --- | --- | --- |
| Hero, één kaart per auto (`.hero__media`) | Liggend (4:3), min. 1600 px breed | `<figure class="hero__media" style="aspect-ratio: 4 / 3"><img src="assets/img/cars/rs3-hero.jpg" alt="…"></figure>` |
| Wagenpark (`.car__media`) | Staand (4:5), min. 1600 px hoog | `<figure class="car__media"><img src="assets/img/cars/rs3-detail.jpg" alt="…" loading="lazy"></figure>` |

## Algemene voorwaarden bijwerken

De voorwaarden staan op `/voorwaarden/` (particulier) en `/voorwaarden-zakelijk/`, met een keuzepagina op `/algemene-voorwaarden/`.
De pdf's in `public/downloads/` zijn gemaakt van de Word-documenten van Nordmann. Wijzigt de tekst, pas dan de pagina én de pdf aan,
zodat beide gelijk blijven. Verhoog het versienummer en de datum bovenaan.

## Testen

Bij elke pull request draaien automatisch de controles (HTML, CSS, links) en de browsertests in `tests/`.
Zelf draaien kan met Node.js:

```bash
npm install
npx playwright install chromium
npm test
```

## Werkwijze

Zie [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) voor branches en commitberichten,
en [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) voor publiceren en het koppelen van het Strato-domein.

## Nog te doen

- [x] KvK-nummer in de footer (wettelijk verplicht)
- [x] Algemene voorwaarden particulier en zakelijk
- [ ] Tarievenlijst (de voorwaarden verwijzen ernaar)
- [ ] Specificaties van de RS3 controleren tegen het kenteken (bouwjaar, uitvoering)
- [ ] Eigen foto's in hoge resolutie van de RS3
- [x] Privacyverklaring (`/privacy/`)
- [x] Lettertype lokaal hosten in plaats van via Google Fonts (privacy/AVG)

---

© Nordmann Automotive. Alle rechten voorbehouden.
