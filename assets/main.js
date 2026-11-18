// Mobilní menu
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
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
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) {
        form.reset();
        status.classList.add('ok');
        status.textContent = 'Děkuji, zpráva odešla. Ozvu se vám co nejdřív.';
      } else {
        throw new Error(data.message || 'Chyba');
      }
    } catch (err) {
      status.classList.add('err');
      status.innerHTML = 'Zprávu se nepodařilo odeslat. Zkuste to prosím znovu, nebo napište na <a href="mailto:sedlackova.bozp@gmail.com">sedlackova.bozp@gmail.com</a>.';
    } finally {
      btn.disabled = false;
    }
  });
}
