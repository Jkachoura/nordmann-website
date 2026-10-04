# Publiceren en domein koppelen

De site draait gratis op **GitHub Pages**. Het domein `nordmannautomotive.nl` blijft bij Strato;
je verwijst het alleen door naar GitHub.

## 1. Repository op GitHub zetten

1. Maak op GitHub een nieuwe, lege repository aan: `nordmann-website` (zonder README).
2. Pak de zip uit, open een terminal in de map en voer uit:

```bash
git remote add origin https://github.com/<jouw-gebruikersnaam>/nordmann-website.git
git push -u origin main
git push origin develop
git push origin --tags
```

## 2. GitHub Pages aanzetten

1. Ga in de repository naar **Settings → Pages**.
2. Kies bij **Source**: **GitHub Actions**.
3. De workflow in `.github/workflows/deploy.yml` publiceert de site bij elke push naar `main`.
4. Vul bij **Custom domain** `www.nordmannautomotive.nl` in en zet **Enforce HTTPS** aan
   zodra GitHub het certificaat heeft aangemaakt (kan tot een uur duren).

## 3. DNS instellen bij Strato

Ga in het Strato-klantenpaneel naar de DNS-instellingen van `nordmannautomotive.nl`.

**A-records** voor het hoofddomein (`nordmannautomotive.nl`):

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME** voor het subdomein `www`:

```
www  →  <jouw-gebruikersnaam>.github.io
```

> Laat de **MX-records** ongemoeid. Die regelen de e-mail van `info@nordmannautomotive.nl`.

DNS-wijzigingen zijn meestal binnen een paar uur actief, soms tot 24 uur.

## 4. Controleren

- `https://www.nordmannautomotive.nl` toont de site met slotje.
- `https://nordmannautomotive.nl` stuurt automatisch door naar `www`.
- Test het reserveringsformulier op je telefoon: WhatsApp moet openen met het bericht ingevuld.

## Alternatief: Netlify of Vercel

Sleep de map naar [app.netlify.com/drop](https://app.netlify.com/drop) of koppel de GitHub-repository.
Er is geen build-commando nodig; de publicatiemap is de hoofdmap (`.`).
