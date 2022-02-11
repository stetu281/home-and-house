import * as Query from '../tools/queries.js';
import * as Tools from '../tools/tools.js';

export const articlePage = async () => {
    const propertyId = Tools.urlParams('id');
    const { article } = await Query.article(propertyId);


    document.querySelector('.news-article').innerHTML = `
        <img class="news-article__img" 
            src="https://stefanturner.ch/dipl-imgs/${article.img}"
            srcset="https://ik.imagekit.io/4gik3riqcq8/tr:w-375/${article.img} 375w,
                    https://ik.imagekit.io/4gik3riqcq8/tr:w-750/${article.img} 750w,
                    https://ik.imagekit.io/4gik3riqcq8/tr:w-1500/${article.img} 1500w,
                    https://ik.imagekit.io/4gik3riqcq8/tr:w-2400/${article.img} 2400w"
            sizes="100vw"
            width="750" height="500"
            alt="Nachrichen Bild"
        >
        <div class="news-article__content">
            <h1 class="news-article__h1">${article.title}</h1>
            <h2 class="news-article__h2">${article.category}</h2>
            <p class="news-article__date">${article.publish_date}</p>
            <p class="news-article__article">${article.full_article}</p>
            <a class="news-article__button" href="./aktuelles.html">zurück</a>
        </div> 
    `;
};