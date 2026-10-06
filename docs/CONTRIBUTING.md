# Werkafspraken

## Branches

| Branch | Doel |
| --- | --- |
| `main` | Wat live staat. Elke merge naar `main` wordt automatisch gepubliceerd. |
| `feature/<naam>` | Nieuwe onderdelen, bijvoorbeeld `feature/wagenpark-bmw-m2`. |
| `content/<naam>` | Teksten, prijzen en foto's, bijvoorbeeld `content/rs3-fotos`. |
| `fix/<naam>` | Reparaties, bijvoorbeeld `fix/mobiel-menu`. |
| `chore/<naam>` | Onderhoud en configuratie. |

Werkwijze:

1. Maak een korte branch vanaf `main`: `git switch -c feature/<naam> main`
2. Commit in kleine, logische stappen.
3. Open een pull request naar `main`. De controles draaien automatisch.
4. Alles groen en ziet het er goed uit? Mergen. De site staat binnen een minuut live.
5. Bij een grotere mijlpaal: zet een versietag (`v1.1.0`) en werk de changelog bij.

## Automatische controles

Bij elke pull request naar `main` draait `.github/workflows/checks.yml`:

| Controle | Wat het vangt | Instellingen |
| --- | --- | --- |
| HTMLHint | Ongeldige HTML, ontbrekende `alt`-teksten, dubbele id's | `.htmlhintrc` |
| Stylelint | Fouten in de CSS | `.stylelintrc.json` |
| lychee | Dode interne links en ontbrekende afbeeldingen of bestanden | `checks.yml` |
| Playwright | Opent de site in een echte browser (desktop en mobiel): laadfouten, horizontaal scrollen, toegankelijkheid (axe), het reserveringsformulier, het mobiele menu, de voorwaarden en de beveiliging (CSP, headers, frames) | `tests/`, `playwright.config.js` |

Een rood kruisje in de pull request betekent: nog niet mergen. Klik op **Details** om te zien wat er mis is.
Links naar social media worden niet gecontroleerd; die sites blokkeren automatische controles.

## Commitberichten

We volgen [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<onderdeel>): <korte omschrijving>
```

| Type | Wanneer |
| --- | --- |
| `feat` | Nieuwe functie of sectie |
| `fix` | Iets repareren |
| `style` | Alleen opmaak, geen inhoudelijke wijziging |
| `content` | Teksten, prijzen, foto's |
| `docs` | Documentatie |
| `chore` / `ci` | Onderhoud, configuratie, automatisering |

Voorbeelden:

```
feat(fleet): add BMW M2 to wagenpark
content(fleet): update RS3 daily rate
fix(header): close mobile menu on link click
```

## Versies

We gebruiken [Semantic Versioning](https://semver.org/): `v1.0.0` → `v1.1.0` (nieuwe functie) → `v1.1.1` (reparatie).
Wijzigingen staan in [CHANGELOG.md](../CHANGELOG.md).
