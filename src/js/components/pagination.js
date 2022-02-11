export const pagination = (e) => {
    const links = document.querySelector('.pagination-link');
    const numBackw = document.querySelector('.pagination-link__from--backw');
    const numForw = document.querySelector('.pagination-link__from--forw');
    const forw = document.querySelector('[data-dir="forw"]');
    const backw = document.querySelector('[data-dir="backw"]');
    let num;

    if(e.target.dataset.dir === 'forw') {
        backw.classList.remove('hide');
        links.dataset.pagenum++
        let currpage = parseInt(links.dataset.pagenum);

        if(currpage === parseInt(document.querySelector('.pagination-link__to').innerHTML)) {
            e.target.classList.add('hide');
        };

        numForw.innerHTML = currpage + 1;
        numBackw.innerHTML = currpage - 1;
        num = currpage - 1;
    } else {
        forw.classList.remove('hide');
        links.dataset.pagenum--;
        let currpage = parseInt(links.dataset.pagenum);

        if(currpage === 1) {
            e.target.classList.add('hide');
        };

        numForw.innerHTML = currpage + 1;
        numBackw.innerHTML = currpage - 1;
        num = currpage - 1;
    };

    return num;
};