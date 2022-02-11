import { maps } from '../components/googleMaps.js';

export const contactMap = () => {
    let coor = { lat: 47.17872, lng: 9.45193 };
    let cont = document.querySelector('.contact__map');

    maps(coor, cont, 17);
};