import * as Query from '../tools/queries.js';

export const allArticlesPage = async () => {
    const { articles } = await Query.articleTeaser();
    const container = document.querySelector('.news__container');

    for(let article of articles) {
        let teaser = document.createElement('div');
        teaser.classList.add('article-teaser');
        teaser.innerHTML = `
            <img class="article-teaser__img"
                src="https://stefanturner.ch/dipl-imgs/${article.img}"
                srcset="https://ik.imagekit.io/4gik3riqcq8/tr:w-375/${article.img} 375w,
                        https://ik.imagekit.io/4gik3riqcq8/tr:w-585/${article.img} 585w,
                        https://ik.imagekit.io/4gik3riqcq8/tr:w-850/${article.img} 850w,
                        https://ik.imagekit.io/4gik3riqcq8/tr:w-1170/${article.img} 1170w,"
                sizes="100vw"
                width="585"
                height="390"
                alt="Bild zur Nachricht"
                loading="${article.id === '1' || article.id === '2' ? 'eager' : 'lazy'}"
            >
            <div class="article-teaser__text-container">
                <h2 class="article-teaser__h2">${article.category}</h2>
                <p class="article-teaser__date">${article.publish_date}</p>
                <p class="article-teaser__text">${article.excerpt}</p>
                <a class="article-teaser__button" href="./news.html?id=${article.id}">weiter</a>
            </div>
        `;

        container.appendChild(teaser);
    };

    setTimeout(() => container.classList.add('news__container--load'), 400);
};