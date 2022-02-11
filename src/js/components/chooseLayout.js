import * as Tools from '../tools/tools.js';

export const chooseLayout = (e, container, renderArray) => {
    const order = document.querySelector('#order-list');
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    document.querySelectorAll('.choose-layout__button').forEach(btn => btn.classList.remove('choose-layout__button--active'));

    if(renderArray.length !== 0) {
        if(e.target.id === 'list') {
            e.target.classList.add('choose-layout__button--active');
            Tools.setSession('list-layout', 'list-layout');
            renderArray = Tools.splitArr(renderArray.flat(), 10);
            container.className = 'listings-container--list-view';
            order.className = 'order-list';           
        } else {
            e.target.classList.add('choose-layout__button--active')
            sessionStorage.removeItem('list-layout');
            renderArray = Tools.screenCheck(mediaQuery, renderArray.flat());
            container.className = 'listings-container';
            order.className = 'order-list--hide';
        };

        return renderArray;          
    };
};