export const hero = () => {
    const heroImgs = document.querySelectorAll('.hero__img--hide');

    for(let img of heroImgs) {
        setTimeout(() => img.classList.remove('hero__img--hide'), 3000);
    };
};