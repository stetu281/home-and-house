import * as Tools from '../tools/tools.js';
import * as Randoms from '../tools/randomFunctions.js';
import * as Form from '../components/searchForm.js';
import { hero } from '../components/hero.js';
import { chooseLayout } from '../components/chooseLayout.js';
import { listLayoutOrder } from '../components/listLayoutOrder.js';
import { pagination } from '../components/pagination.js';


export const home = async (estates) => {
    let renderArray = [];
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const container = document.querySelector('#listings');
    let i = 0;

    hero();

    //create options for select inputs
    Form.create();

    const load = Tools.urlParams('load');
    if(load === 'all') {
        renderArray = JSON.parse(sessionStorage.getItem('allEstates'));
    } else {
        renderArray = estates;
    }

    //loading estates
    const id = Tools.urlParams('id');
    renderArray = Tools.screenCheck(mediaQuery, renderArray);

    if(sessionStorage['list-layout']) {
        document.querySelector('#grid').classList.remove('choose-layout__button--active');
        document.querySelector('#list').classList.add('choose-layout__button--active');
        renderArray = Tools.splitArr(renderArray.flat(), 10);
        container.className = 'listings-container--list-view';
        document.querySelector('#order-list').className = 'order-list'; 
    } 

    if(id === null) {
        Randoms.renderEstates(container, renderArray[0]);
        Randoms.checkForPagination(renderArray, 0) 
    } else if (id !== null && mediaQuery.matches) {
        let num = Tools.getIndex(renderArray, id);

        for(let j = 0; j <= num; j++) {
            Randoms.appendEstates(container, renderArray[j]);
        }

        i = num;
        document.querySelector(`#est${renderArray[i][0].id}`).scrollIntoView();
    } else {
        let num = Tools.getIndex(renderArray, id);
        Randoms.renderEstates(container, renderArray[num]);
        Randoms.checkForPagination(renderArray, num);
        container.scrollIntoView();
    }

    //change array and rerender based on screensize
    mediaQuery.addEventListener('change', (e) => {
        if(container.classList.contains('listings-container--list-view')) {
            renderArray = Tools.splitArr(renderArray.flat(), 10);
        } else {
            renderArray = Tools.screenCheck(e, renderArray.flat()); 
        };

        Randoms.renderEstates(container, renderArray[0]);
        Randoms.checkForPagination(renderArray, 0);
    });
    
    //layout buttons -> switch between list and tile view
    document.querySelector('.choose-layout').addEventListener('click', Tools.delegate('.choose-layout__button', (e) => {
        renderArray = chooseLayout(e, container, renderArray);
        Randoms.renderEstates(container, renderArray[0]);
        Randoms.checkForPagination(renderArray, 0);
        Tools.setSession(renderArray.flat(), 'filteredArray');
        i = 0;//reset counter
    }));

    //eventlistener for order buttons in list view
    document.querySelector('#order-list').addEventListener('click', Tools.delegate('.order-list__item', (e) => {
        renderArray = listLayoutOrder(e, container, renderArray);
        Randoms.renderEstates(container, renderArray[0]);
        Randoms.checkForPagination(renderArray, 0);
        Tools.setSession(renderArray.flat(), 'filteredArray');
        i = 0; //reset counter
    }));

    //pagination
    document.querySelector('.pagination-link').addEventListener('click', Tools.delegate('div', (e) => {
        let num = pagination(e, container, renderArray);
        Randoms.renderEstates(container, renderArray[num]);
    }));

    //searchform button -> create array based on form input and render estates
    document.querySelector('.search-form__button').addEventListener('click', async () => {
        renderArray = await Form.search(container, renderArray);

        if(renderArray !== null) {
            Randoms.renderEstates(container, renderArray[0])
            Randoms.checkForPagination(renderArray, 0);
            Tools.setSession(renderArray.flat(), 'filteredArray');
        };
        i = 0; //reset counter
    });

    //load more button on mobile size
    document.querySelector('.property-list__more-button').addEventListener('click', (e) => {
        i++;

        if(i < renderArray.length) {
            Randoms.appendEstates(container, renderArray[i]);
        } else {
            e.target.innerHTML = 'That\'s all Folks';
            setTimeout(() => {e.target.innerHTML = 'Mehr laden'}, 4000)     
        };
    });
};