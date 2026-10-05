(() => {
  let count = 0;
  const toast = document.querySelector('.toast');
  const showToast = (text) => { if (!toast) return; toast.textContent = text; toast.classList.add('show'); clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2400); };
  document.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click', () => { count++; document.querySelectorAll('.cart-count').forEach(el => el.textContent = count); showToast(`${button.dataset.add} added to bag`); }));
  document.querySelectorAll('[data-cart]').forEach(button => button.addEventListener('click', () => showToast(count ? `${count} item${count === 1 ? '' : 's'} in your bag · Checkout is a mockup` : 'Your bag is empty')));
  document.querySelectorAll('[data-search]').forEach(button => button.addEventListener('click', () => { document.querySelector('.search-overlay')?.classList.add('open'); document.querySelector('.search-panel input')?.focus(); }));
  document.querySelectorAll('[data-close-search]').forEach(button => button.addEventListener('click', () => document.querySelector('.search-overlay')?.classList.remove('open')));
  document.querySelector('.search-overlay')?.addEventListener('click', e => { if (e.target.classList.contains('search-overlay')) e.currentTarget.classList.remove('open'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelector('.search-overlay')?.classList.remove('open'); });
  document.querySelectorAll('[data-menu]').forEach(button => button.addEventListener('click', () => document.querySelector('.mobile-links')?.classList.toggle('open')));
  document.querySelectorAll('[data-newsletter]').forEach(form => form.addEventListener('submit', e => { e.preventDefault(); showToast('Thanks for joining the Just Nuts list!'); form.reset(); }));
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { const value = button.dataset.filter; document.querySelectorAll('[data-filter]').forEach(el => el.classList.toggle('active', el === button)); document.querySelectorAll('[data-category]').forEach(el => el.hidden = value !== 'all' && el.dataset.category !== value); }));
})();