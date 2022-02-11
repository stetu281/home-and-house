import * as Tools from '../tools/tools.js';
import * as Randoms from '../tools/randomFunctions.js';
import { filterFunction } from '../tools/filterSortFunction.js';

export const create = () => {
    let all = JSON.parse(sessionStorage.getItem('allEstates'));
    const cantonsContainer = document.querySelector('#select-canton');
    const typeContainer = document.querySelector('#select-propertytype');

    Randoms.populateSelectOptions(all, cantonsContainer, 'canton');
    Randoms.populateSelectOptions(all, typeContainer, 'type');
    Randoms.togglerLabelColor();
};

export const search = async (container, renderArray) => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    document.querySelectorAll('.order-list__item').forEach(item => item.dataset.order = 'asc');
    document.querySelectorAll('.order-list__arrow').forEach(item => item.classList.remove('order-list__arrow--turn'));
    document.querySelector('.listings-container__no-result').classList.add('hide');

    renderArray = await filterFunction();
    
    if(renderArray.length === 0) {
        container.innerHTML = '';
        document.querySelector('.listings-container__no-result').classList.remove('hide');
        return null;
    } else {
        if(container.classList.contains('listings-container--list-view')) {
            renderArray = Tools.splitArr(renderArray.flat(), 10);
        } else {
            renderArray = Tools.screenCheck(mediaQuery, renderArray.flat()); 
        };
        
        return renderArray;
    };
};