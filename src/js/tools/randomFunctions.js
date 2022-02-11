import { renderSingleListing } from './renderSingleListing.js';

//create options for select tags
export const populateSelectOptions = (estates, container, key ) => {
    let arr = [];
    estates.map(item => arr.push(item[key]));
    let all = arr.filter((item, index) => arr.indexOf(item) === index);

    for(let item of all) {
        let option = document.createElement('option');
        option.value = item;
        option.innerHTML = `${item}`;
        container.appendChild(option);
    };
};

//change labelcolor on toggler
export const togglerLabelColor = () => {
    document.querySelector('#toggler').addEventListener('change', () => {
        document.querySelectorAll('.toggler__option').forEach(item => item.classList.toggle('toggler__option--green'));      
    });
};

//check arraylength if pagination is needed
export const checkForPagination = (arr, num) => {
    const forw = document.querySelector('[data-dir="forw"]');
    const backw = document.querySelector('[data-dir="backw"]');
    const link = document.querySelector('.pagination-link');
    const numBackw = document.querySelector('.pagination-link__from--backw');
    const numForw = document.querySelector('.pagination-link__from--forw');

    forw.classList.add('hide');
    backw.classList.add('hide');

    if(parseInt(arr.length) > 1) {
        if(num === 0) {
            link.dataset.pagenum = 1;
            numForw.innerHTML = 2;
            backw.classList.add('hide');
            forw.classList.remove('hide');
        } else if (num >= parseInt(arr.length - 1)) {
            link.dataset.pagenum = num + 1;
            numForw.innerHTML = num + 1;
            numBackw.innerHTML = num;
            forw.classList.add('hide');
            backw.classList.remove('hide');
        } else {
            link.dataset.pagenum = num + 1;
            numForw.innerHTML = ++num + 1;
            numBackw.innerHTML = num - 1;
            forw.classList.remove('hide');
            backw.classList.remove('hide');
        }

        document.querySelectorAll('.pagination-link__to').forEach(item => {
            item.innerHTML = arr.length;
        });       
    };
};

//Intersection observer for listings
function observer() {
    let observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if(entry.intersectionRatio > 0) {
                    entry.target.classList.add('listing--load');
                }
            })
        },
        { threshold: 0.5}
    );

    document.querySelectorAll('.listing').forEach(listing => {
        observer.observe(listing);
    });   
};

//call renderfunction for each estate of array
export const renderEstates = (container, arr) => {
    container.innerHTML = '';

    for(let item of arr) {
        const li = renderSingleListing(item);
        container.appendChild(li);
    };

    observer();
};

//call renderfunction for each estate of array without emptying the container -> Mobile load more
export const appendEstates = (container, arr) => {
    for(let item of arr) {
        const li = renderSingleListing(item);
        container.appendChild(li);
        observer();
    };
};