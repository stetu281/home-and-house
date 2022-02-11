import { latestEstates } from '../tools/queries.js';
import * as Randoms from '../tools/randomFunctions.js';

export const latestListings = async () => {

    let { estates } = await latestEstates();
    const container = document.querySelector('.latest-listings__listings');
    Randoms.renderEstates(container, estates);
};