import * as Tools from '../tools/tools.js';

export const listLayoutOrder = (e, container, renderArray) => {
    if(renderArray.length !== 0) {
        switch(e.target.dataset.orderitem) {
            case 'title':
                renderArray = Tools.sortList(e, 'title', renderArray.flat());
                break;
            case 'zip': 
                renderArray = Tools.sortList(e, 'zip', renderArray.flat());
                break;
            case 'area':
                renderArray = Tools.sortList(e, 'area', renderArray.flat());
                break;
            case 'price':
                renderArray = Tools.sortList(e, 'price', renderArray.flat());
                break;
        };

        if(container.classList.contains('listings-container--list-view')) {
            renderArray = Tools.splitArr(renderArray, 10);
        } else {
            renderArray = Tools.screenCheck(mediaQuery, renderArray); 
        };

        return renderArray;
    };
};