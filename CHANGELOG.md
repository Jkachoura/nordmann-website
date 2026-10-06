# Changelog

Alle noemenswaardige wijzigingen aan deze website.
Formaat volgens [Keep a Changelog](https://keepachangelog.com/nl/1.1.0/), versies volgens [SemVer](https://semver.org/).

## [Unreleased]

### Toegevoegd
- Automatische browsertests (Playwright) bij elke pull request
- Algemene voorwaarden: keuzepagina (/algemene-voorwaarden/) met particulier (/voorwaarden/) en zakelijk (/voorwaarden-zakelijk/), elk als pdf te downloaden; link in de footer
- Volkswagen Golf 8.5 R in de hero, het wagenpark en het reserveringsformulier
- KvK-nummer in de footer
- Privacyverklaring op /privacy/, gelinkt vanuit de footer en het reserveringsformulier
- Uitgebreide specificaties van de RS3: topsnelheid, koppel, kW, onderstel en velgen
- Uitrusting van de RS3: RS Torque Rear met drift mode, Matrix LED, virtual cockpit plus

### Gewijzigd
- Website verplaatst naar `public/`; ongebruikte bestanden verwijderd
- Reserveringsformulier controleert datums, naam en auto in JavaScript (datum in het verleden kwam er eerder door)
- Verzendknop van het formulier staat uit tot het script geladen is (anders kwamen naam en datums in de URL)
- Donkerder grijs voor kleine tekst (WCAG AA-contrast), onderstreepte links in de footer, tabellen in de privacyverklaring met toetsenbord te bereiken
- Privacyverklaring: de tabel in hoofdstuk 2 wordt op tablet en mobiel een lijst met blokken per situatie
- Bedrijfsnaam "Nordmann Automotive B.V." in de footer en de bedrijfsgegevens voor zoekmachines
- Privacyverklaring vervangen door de versie van Nordmann Automotive B.V. (5 oktober 2026): adresbewijs, uitgifte en retour, waarborgsom, GPS-tracker, dashcam, zakelijke huur, garantstelling en incasso
- Gelijke ruimte tussen alle secties; "social media" verwijst nu naar Instagram, TikTok en Snapchat
- Alle teksten in de u-vorm; nieuwe teksten voor hero, wagenpark, RS3 en de drie stappen
- Minder witruimte boven het wagenpark en bij Reserveren
- Privacyverklaring formeler opgesteld; kopie van het identiteitsbewijs (met afgeschermd BSN) en bezorgadres toegevoegd
- Lettertype Montserrat zelf gehost: geen verbinding meer met Google Fonts
- Logo's in header, reserveringsblok en footer groter
- Autofoto's tijdelijk vervangen door een merkvisual tot de professionele foto's er zijn
- Ruimer ontwerp: bredere pagina, grotere letters en tussenruimtes die meegroeien met het scherm
- Hero met kop over de volle breedte en een brede "showroomvloer" voor de RS3
- Pijlers in een eigen sectie; wagenpark als productpagina met meescrollend beeld
- Sectiekoppen met label, omlijnde stapnummers en rustige animaties bij het scrollen
- Reserveren en de tijdelijke RS3-visuals: wazige marmerfoto vervangen door een scherpe CSS-achtergrond met krijtstreep en merkstrepen

## [1.0.0] - 2026-10-03

### Toegevoegd
- Homepage met hero, drie pijlers en merkstijl uit logo, banner en magneetsticker
- Wagenpark met de Audi RS3 Sportback
- Uitleg "Zo werkt het" in drie stappen
- Reserveringsformulier dat een WhatsApp-bericht opstelt (geen backend nodig)
- Contactgegevens, footer en zwevende WhatsApp-knop op mobiel
- SEO: meta-tags, Open Graph, structured data (AutoRental), sitemap en robots.txt
- 404-pagina, favicons en webmanifest
- Automatisch publiceren naar GitHub Pages
