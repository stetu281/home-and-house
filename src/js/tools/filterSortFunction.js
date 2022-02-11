import * as Tools from './tools.js';

export const filterFunction = async () => {
    let estates = JSON.parse(sessionStorage.getItem('allEstates'));  
    const cantonValue = document.querySelector('#select-canton').value;
    const typeValue = document.querySelector('#select-propertytype').value;
    const sortValue = document.querySelector('#select-sort').value;
    const togglerValue = document.querySelector('#toggler').checked;
    const priceButton = document.querySelector('[data-orderitem="price"]');
    const areaButton = document.querySelector('[data-orderitem="area"]');

    if(togglerValue) {
        estates = Tools.filter(estates, 'status', 'Zu verkaufen');
    } else {
        estates = Tools.filter(estates, 'status', 'Zu vermieten');  
    };

    if(typeValue !== 'all_properties') {
        estates = estates.filter(item => item.type === typeValue);
    } else {
        estates = estates;
    };


    if(cantonValue !== 'all_cantons') {
        estates = Tools.filter(estates, 'canton', cantonValue);
    } else {
        estates = estates;
    };

    if(sortValue !== 'default') {
        switch(sortValue) {
            case 'price_asc':
                estates.sort((a, b) => a.price - b.price);
                priceButton.dataset.order = 'asc';
                priceButton.children[1].classList.remove('order-list__arrow--turn');
                break;
            case 'price_desc':
                estates.sort((a, b) => b.price - a.price);
                priceButton.dataset.order = 'desc';
                priceButton.children[1].classList.add('order-list__arrow--turn');
                break;
            case 'date_asc':
                estates.sort((a, b) => parseInt(a.availability_date.split('-').join('')) - parseInt(b.availability_date.split('-').join('')));
                break;
            case 'date_desc':
                estates.sort((a, b) => parseInt(b.availability_date.split('-').join('')) - parseInt(a.availability_date.split('-').join('')));
                break;
            case 'area_asc':
                estates.sort((a, b) => a.area - b.area);
                areaButton.dataset.order = 'asc';
                areaButton.children[1].classList.remove('order-list__arrow--turn');
                break;
            case 'area_desc':
                estates.sort((a, b) => b.area - a.area);
                areaButton.dataset.order = 'desc';
                areaButton.children[1].classList.add('order-list__arrow--turn');
                break;
        };
    };
    
    return estates;
};