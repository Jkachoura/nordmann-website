# Werkafspraken

## Branches

| Branch | Doel |
| --- | --- |
| `main` | Wat live staat. Elke push naar `main` wordt automatisch gepubliceerd. |
| `develop` | Werk dat klaar is maar nog niet live. |
| `feature/<naam>` | Nieuwe onderdelen, bijvoorbeeld `feature/wagenpark-bmw-m2`. |
| `fix/<naam>` | Reparaties, bijvoorbeeld `fix/mobiel-menu`. |

Werkwijze:

1. Maak een branch vanaf `develop`: `git switch -c feature/<naam> develop`
2. Commit in kleine, logische stappen.
3. Open een pull request naar `develop`.
4. Klaar voor livegang? Pull request van `develop` naar `main` en zet een versietag (`v1.1.0`).

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
