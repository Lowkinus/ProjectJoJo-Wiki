window.PJ_STAND_RANKING=["star-platinum","king-crimson"];

(() => {
  function addChineseLanguageLink() {
    const header = document.querySelector('.topbar');
    if (!header || header.querySelector('[data-pj-lang-zh]')) return;

    const currentLang = (document.documentElement.lang || '').toLowerCase();
    if (currentLang.startsWith('zh')) return;

    const link = document.createElement('a');
    link.className = 'lang';
    link.href = '../zh/index.html';
    link.textContent = '中文';
    link.dataset.pjLangZh = '1';
    link.setAttribute('aria-label', '简体中文');

    const existingLang = header.querySelector('.lang');
    const counter = header.querySelector('.view-counter');

    if (existingLang) existingLang.insertAdjacentElement('afterend', link);
    else if (counter) header.insertBefore(link, counter);
    else header.appendChild(link);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addChineseLanguageLink, { once: true });
  } else {
    addChineseLanguageLink();
  }
})();
