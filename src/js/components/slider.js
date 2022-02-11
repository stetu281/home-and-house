import * as Tools from '../tools/tools.js';

export const slider = (estate) => {
    const imgs = estate.imgs.split(',');
    const imgCont = document.querySelector('.slider__img-container');
    const thumbsCont = document.querySelector('.slider__thumbs');
    const mediaQuery = window.matchMedia('(min-width: 992px)');
    
    for(let [i] of Object.entries(imgs)) {
        let img = document.createElement('img');
        img.src = `${estate.img_url}/${imgs[i]}`;
        img.srcset = `
            ${estate.img_cdn}/tr:w-375/${imgs[i]} 375w,
            ${estate.img_cdn}/tr:w-750/${imgs[i]} 750w,
            ${estate.img_cdn}/tr:w-920/${imgs[i]} 920w,
            ${estate.img_cdn}/tr:w-1500/${imgs[i]} 1500w
        `;
        img.width = '375';
        img.height = '250';
        img.alt = 'Galleriebild der Immobilie';
        img.classList.add('slider__img');
        imgCont.append(img);

        //only create thumbs if screen is larger than 992px
        if(mediaQuery.matches) {
           createThumbs(i);
           chooseActive(0);
           handleThumbs();
        };
    };
    
    document.querySelector('.slider').addEventListener('click', Tools.delegate('button', (e) => {
        if(e.target.classList.contains('next')) {
            if(imgCont.dataset.id < imgs.length - 1) {
                imgCont.dataset.id++;
                imgCont.style.transform = `translateX(-${imgCont.dataset.id * 100}%)`;
                chooseActive(imgCont.dataset.id);
            } else {
                imgCont.dataset.id = 0;
                imgCont.style.transform = 'translateX(0)';
                chooseActive(imgCont.dataset.id);
            }
        } else {
            if(imgCont.dataset.id > 0) {
                imgCont.dataset.id--;
                imgCont.style.transform = `translateX(-${imgCont.dataset.id * 100}%)`;
                chooseActive(imgCont.dataset.id);            
            } else {
                imgCont.dataset.id = imgs.length - 1;
                imgCont.style.transform = `translateX(-${(imgs.length - 1) * 100}%)`;
                chooseActive(imgCont.dataset.id);
            }
        };
    }));

    //create thumbs on screen change
    mediaQuery.addEventListener('change',() => {
        if(mediaQuery.matches) {
            thumbsCont.innerHTML = '';
            for(let i = 0; i < imgs.length; i++) {
                createThumbs(i);
                chooseActive(i);
                handleThumbs();
            }            
        };
    });

    function createThumbs(i) {
        let thumb = document.createElement('img');
        thumb.src = `${estate.img_url}${imgs[i]}`;
        thumb.srcset = `
            ${estate.img_cdn}/tr:w-120/${imgs[i]} 120w,
            ${estate.img_cdn}/tr:w-240/${imgs[i]} 240w
        `;
        thumb.width = '120';
        thumb.height = '80';
        thumb.alt = 'Thumbnail für slider';
        thumb.dataset.id = i;
        thumb.classList.add('slider__thumb');
        thumbsCont.append(thumb); 
    };

    function chooseActive(i) {
        const thumbs = document.querySelectorAll('.slider__thumb');

        if(thumbs.length !== 0) {
            for(let thumb of thumbs) {
                thumb.classList.remove('active');
            }
            thumbs[i].classList.add('active');            
        };
    };

    function handleThumbs(){
        thumbsCont.addEventListener('click', Tools.delegate('.slider__thumb', (e) => {
            imgCont.dataset.id = e.target.dataset.id;
            chooseActive(imgCont.dataset.id)
            imgCont.style.transform = `translateX(-${e.target.dataset.id * 100}%)`;
        }));
    };
};