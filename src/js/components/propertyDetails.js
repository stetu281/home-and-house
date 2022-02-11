import * as Tools from '../tools/tools.js';

export const renderPropertyDetails = (estate) => {
    document.querySelector('.property-details__h1').innerHTML = `
        <span class="property-details__regular">${estate.status}</span> ${estate.title}    
    `;

    document.querySelector('.property-details__stats').innerHTML = `
        <h2 class="property-details__h2">Verfügbarkeit</h2>
        <p class="property-details__value">${estate.availability}</p>
        <h2 class="property-details__h2">Location</h2>
        <p class="property-details__value">${estate.zip} ${estate.city}, ${estate.canton}</p>
        <h2 class="property-details__h2">Preis</h2>
        <p class="property-details__value">CHF ${Tools.addApostrophe(estate.price)}</p>
        <h2 class="property-details__h2">Nutzfläche</h2>
        <p class="property-details__value">Fläche ${estate.area}m<sup>2</sup></p>
    `;

    document.querySelector('.property-details__value--description').innerHTML = estate.description;

    document.querySelector('.overlay-form__object').innerHTML = estate.title;
};