// Mobilní menu
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Zavřít' : 'Menu';
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Menu';
  }));
}

// Odeslání formuláře bez opuštění stránky (bez JS funguje klasické odeslání s přesměrováním)
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
if (form && status) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    status.className = 'form-status';
    status.textContent = 'Odesílám…';
    try {
      // Při odeslání přes JS nechceme přesměrování (to je jen pro prohlížeče bez JS),
      // jinak by fetch skončil chybou při přesměrování na jinou doménu.
      const data = Object.fromEntries(new FormData(form));
      delete data.redirect;
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });
      const out = await res.json().catch(() => ({}));
      if (res.ok && out.success) {
        form.reset();
        status.classList.add('ok');
        status.textContent = 'Děkuji, zpráva odešla. Ozvu se vám co nejdřív.';
      } else {
        throw new Error(out.message || ('HTTP ' + res.status));
      }
    } catch (err) {
      console.error('Odeslání formuláře selhalo:', err);
      status.classList.add('err');
      status.innerHTML = 'Zprávu se nepodařilo odeslat (' + String(err.message || err).replace(/[<>&]/g, '') + '). Zkuste to prosím znovu, nebo napište na <a href="mailto:sedlackova.bozp@gmail.com">sedlackova.bozp@gmail.com</a>.';
    } finally {
      btn.disabled = false;
    }
  });
}
