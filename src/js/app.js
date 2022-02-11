import css from '../scss/main.scss';
import * as Query from './tools/queries.js';
import * as Tools from './tools/tools.js';
import { header } from './components/header.js';
import { home } from './pages/homePage.js';
import { propertyDetails, propertyMap } from './pages/objectPage.js';
import { contactMap } from './pages/contactPage.js';
import {allArticlesPage} from './pages/allArticlesPage.js';
import {articlePage} from './pages/articlePage.js';
import { renderMessages } from './pages/messages.js';

const pageDataset = document.body.dataset.page;
const pageId = document.body.id;

if(pageDataset !== 'messages') {
    header(pageId);    
};

async function getEstates() {
    let array = [];

    if(sessionStorage['filteredArray']) {
        array = JSON.parse(sessionStorage.getItem('filteredArray'));
        home(array);
    } else {
        array = await Query.allEstates();
        Tools.setSession(array.estates, 'allEstates');
        home(array.estates);
    }
}

//get modules depending on body dataset
switch (pageDataset) {
    case 'home':
        getEstates();
        break;
    case 'property':
        propertyDetails();
        window.initMap = propertyMap;
        break;
    case 'contact':
        window.initMap = contactMap;
        break;
    case 'news':
        allArticlesPage();
        break;
    case 'article':
        articlePage();
        break;
    case 'messages':
        renderMessages();
        break;
};