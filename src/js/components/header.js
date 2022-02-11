export const header = (pageId) => {
    //toggle mobile navigation
    document.querySelector('.header__button').addEventListener('click', (e) => {
        document.querySelector('.nav').classList.toggle('nav--open');
        e.target.classList.toggle('header__button--change');
    });

    //add active class
    const links = document.querySelectorAll('.nav__link');
    for(let link of links) {
        if(link.innerHTML.toLowerCase() === pageId) {
            link.classList.add('nav__link--active');
        };
    };

    //intersection observer to shrink header logo --> when trigger leaves window add class to logo
    const logo = document.querySelector('.header__logo');
    const trigger = document.querySelector('.trigger');

    const handler = (entries) => {
        if(!entries[0].isIntersecting) {
            logo.classList.add('header__logo--small');
        } else {
            logo.classList.remove('header__logo--small');
        };
    };

    const observer = new IntersectionObserver(handler);
    observer.observe(trigger);
};