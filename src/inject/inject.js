'use strict';

if (location.pathname === `/${document.body.querySelector('script').textContent.match(/"url_name":"([^"]+)"/)[1]}/stock`) {

  const token = document.head.querySelector('meta[name=csrf-token]').content;
  const articles = document.body.querySelectorAll('article.media.ItemLink');

  for (const article of articles) {

    const ul = article.querySelector('ul.ItemLink__status');
    const li = document.createElement('li');
    const button = document.createElement('button');

    let stocked = true;
    button.classList.add('unstocker-button');
    button.textContent = 'アンストック';
    button.onclick = () => {

      button.disabled = true;
      const href = article.querySelector('div.ItemLink__title a.u-link-no-underline').href;
      const action = stocked ? 'unstock' : 'stock';
      const afterLabel = stocked ? 'ストック' : 'アンストック';

      fetch(`${href}/${action}`, {
        method: 'POST',
        credentials: 'include',
        headers: new Headers({
          'X-CSRF-Token': token,
        }),
      }).then(() => {
        stocked = !stocked;
        button.textContent = afterLabel;
      }).catch(() => {
        alert('Request Failed !');
      }).then(() => {
        button.disabled = false;
      });

    };

    li.appendChild(button);
    ul.appendChild(li);
  }

}
