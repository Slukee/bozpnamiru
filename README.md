# BOZP na míru – web Simony Sedláčkové

Statický web (čisté HTML + CSS, bez build kroku) pro **bozpnamiru.cz**.

## Struktura
- `index.html` – úvod, služby, o mně, spolupráce, kontakt s formulářem
- `zasady-ochrany-osobnich-udaju.html` – zásady zpracování osobních údajů (GDPR)
- `dekujeme.html` – stránka po odeslání formuláře (když neběží JavaScript)
- `404.html`, `robots.txt`, `sitemap.xml`, `_headers` (bezpečnostní hlavičky pro Cloudflare Pages i Netlify)
- `assets/` – styl, skript, favicon, písmo Schibsted Grotesk (uložené lokálně, bez Google Fonts)

## Co je potřeba doplnit
Vše zvýrazněné žlutě (`class="placeholder"`):
1. **IČO a místo podnikání** – v patičce všech stránek a v zásadách (povinné dle § 435 obč. zákoníku).
2. **Plátce DPH** – ověřit a upravit větu v patičce.
3. **Počet let praxe, region, doplňující věta** – sekce O mně.
4. **Fotka** – uložit jako `assets/simona.jpg` a v `index.html` nahradit „Místo pro fotku“.
5. **Hosting** v zásadách (Cloudflare / Netlify) a datum platnosti.
6. Po doplnění smazat třídu `placeholder` (nebo celé `<span>`).

## Formulář (Web3Forms)
1. Na https://web3forms.com zadat e-mail **sedlackova.bozp@gmail.com** → přijde přístupový klíč.
2. Klíč je už vložený v `index.html`. Po přechodu na doménu bozpnamiru.cz změnit v `index.html` hodnotu `redirect`.
3. Zprávy z formuláře pak chodí rovnou do jejího Gmailu. Zdarma do 250 zpráv měsíčně.

## Nasazení na Cloudflare Pages
1. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → vybrat tento repozitář.
2. Framework preset: **None**, Build command: *(prázdné)*, Build output directory: `/`.
3. Po nasazení: Custom domains → přidat `bozpnamiru.cz` (a `www`). Doménu je potřeba nejdřív koupit u registrátora (např. Wedos, Forpsi, Active24) a buď přesunout DNS na Cloudflare, nebo nastavit CNAME dle návodu.

Alternativa Netlify: „Add new site → Import from Git“, bez build příkazu, publish directory `.`.

## Lokální náhled
```
python3 -m http.server 8080
```
a otevřít http://localhost:8080
