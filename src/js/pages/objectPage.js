import * as Query from '../tools/queries.js';
import * as Tools from '../tools/tools.js';
import { maps } from '../components/googleMaps.js';
import { renderPropertyDetails } from '../components/propertyDetails.js';
import { slider } from '../components/slider.js';
import { latestListings } from '../components/latestListings.js';
import { overlayForm } from '../components/overlayForm.js';

const propertyId = Tools.urlParams('id');

export const propertyDetails = async () => {
    let { estate } = await Query.getDetails(propertyId);

    renderPropertyDetails(estate); 
    slider(estate);
    latestListings();
    overlayForm(propertyId);

    document.querySelector('.property-details__backlink').href = `./index.html?id=${propertyId}`;
};

export const propertyMap = async () => {
    let { estate } = await Query.getCoor(propertyId);
    let coor = { lat: estate.lat, lng: estate.lng };
    let cont = document.querySelector('.property-details__map');

    maps(coor, cont, 17);
};