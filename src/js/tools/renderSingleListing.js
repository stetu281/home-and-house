import * as Tools from './tools.js';

export const renderSingleListing = (estate) => {
    let mainImg = estate.imgs.split(',');
    const li = document.createElement('li');
    li.classList.add('listing');
    li.id = `est${estate.id}`;
    li.innerHTML = `
        <a class="listing__link" href="./objekt.html?id=${estate.id}">
            <div class="listing__img-container">
                <img class="listing__img"
                    src="${estate.img_url}/${mainImg[0]}"
                    srcset="${estate.img_cdn}/tr:w-450/${mainImg[0]} 450w,
                            ${estate.img_cdn}/tr:w-900/${mainImg[0]} 900w,
                            ${estate.img_cdn}/tr:w-1800/${mainImg[0]} 1800w"
                    sizes="(min-width: 992px) 30vw,
                           (min-width: 768px) 45vw, 90vw"
                    width="450px"
                    height="299px"
                    loading="lazy"
                    alt="Bild des Wohnobjekts"
                >
            </div>
            <p class="listing__status">${estate.status} ${estate.availability}</p>
            <p class="listing__location">${estate.zip} ${estate.city}, ${estate.country}</p>
            <h3 class="listing__title">${estate.title}</h3>
            <p class="listing__area">
                <span class="listing__area-text">Fläche</span> 
                <span class="listing__area-val ">${estate.area}</span>m<sup>2</sup>
            </p>
            <p class="listing__price">
                <span class="listing__price-text">Preis: </span> 
                <span class="listing__price-val">CHF ${Tools.addApostrophe(estate.price)}</span>
            </p>                            
        </a>
    `;
    
    return li;
};