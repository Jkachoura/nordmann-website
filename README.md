# Nordmann Automotive — website

Website van **Nordmann Automotive**, premium autoverhuur in Rotterdam.
Live op [www.nordmannautomotive.nl](https://www.nordmannautomotive.nl).

Een snelle, statische site (HTML, CSS en JavaScript) zonder build-stap en zonder server.
Reserveringsaanvragen lopen via WhatsApp, dus er is geen database of backend nodig.

## Projectstructuur

```
.
├── index.html               Homepage
├── 404.html                 Pagina-niet-gevonden
├── assets/
│   ├── css/
│   │   ├── tokens.css       Kleuren, typografie, ruimtes (merkwaarden)
│   │   ├── base.css         Reset, basisstijlen, knoppen
│   │   ├── header.css       Header en navigatie
│   │   ├── hero.css         Hero en drie pijlers
│   │   ├── fleet.css        Wagenpark
│   │   ├── steps.css        Zo werkt het
│   │   ├── booking.css      Reserveren en contact
│   │   └── footer.css       Footer en WhatsApp-knop
│   ├── js/
│   │   ├── main.js          Navigatie, header, jaartal
│   │   └── booking.js       Formulier dat een WhatsApp-bericht opstelt
│   └── img/
│       ├── brand/           Logo's (kleur en wit) en marmertextuur
│       ├── cars/            Autofoto's
│       └── icons/           Favicons en app-iconen
├── docs/                    Deployment en werkafspraken
├── .github/workflows/       Automatisch publiceren naar GitHub Pages
├── CNAME                    Eigen domein voor GitHub Pages
├── robots.txt, sitemap.xml  Vindbaarheid in Google
└── site.webmanifest         App-icoon op telefoons
```

## Lokaal bekijken

Omdat de site absolute paden gebruikt (`/assets/...`), open je hem via een lokale server:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Een auto toevoegen

1. Zet de foto in `assets/img/cars/` (liggend of staand, minimaal 1600 px breed, `.jpg`).
2. Kopieer in `index.html` het blok `<article class="car">…</article>` en pas tekst, specificaties en foto aan.
3. Voeg de auto toe als `<option>` in het formulier (`#bf-car`).

## Werkwijze

Zie [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) voor branches en commitberichten,
en [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) voor publiceren en het koppelen van het Strato-domein.

## Nog te doen

- [ ] KvK-nummer in de footer (wettelijk verplicht)
- [ ] Prijzen, borg en huurvoorwaarden (minimumleeftijd, rijervaring, kilometers)
- [ ] Specificaties van de RS3 controleren tegen het kenteken (bouwjaar, uitvoering)
- [ ] Eigen foto's in hoge resolutie van de RS3
- [ ] Privacyverklaring
- [ ] Lettertype lokaal hosten in plaats van via Google Fonts (privacy/AVG)

---

© Nordmann Automotive. Alle rechten voorbehouden.
