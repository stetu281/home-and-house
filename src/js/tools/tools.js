export const delegate = (target, callback) => {
    return function (e) {
        if (e.target.matches(target)) {
            callback(e);
        }
    };
};

export const filter = (arr, key, val) => {
    return arr.filter(item => item[key] === val);
};

export const splitArr = (arr, size) => {

    let tempArr = [];
    for(let i = 0; i < arr.length; i += size) {
        let part = arr.slice(i, i + size);
        tempArr.push(part);
    };
    
    return tempArr;
};

export const urlParams = (key) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(key);
};

export const getIndex = (arr, id) => {
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr[i].length; j++) {
            if(arr[i][j].id === id) {
                return i;
            }
        }
    }   
};

export const addApostrophe = (number) => {
    let arr = number.toString().split('').reverse();
    let newArr = arr.map((num, index) => {
        return index != 0 && index % 3 === 0 ? num + "'" : num;
    });
    newArr.reverse();
    let str = newArr.join('');
    return str;
};

export const setSession = (arr, name) => {
    sessionStorage.setItem(name, JSON.stringify(arr));
};

//create and return array based on screensize
export const screenCheck = (target, arr) => {
    let tempArr;

    if (target.matches) {
        tempArr = splitArr(arr, 3);
    } else {
        tempArr = splitArr(arr, 6);
    };

    return tempArr;
};

//function to sort array
export const sortList = (e, sortBy, estates) => {
    let sorted = [];

    if(e.target.dataset.order === 'asc') {
        e.target.dataset.order = 'desc';
        sorted = estates.sort((a, b) => b[sortBy].toString().localeCompare(a[sortBy], 'de', {numeric: true}));
        e.target.children[1].classList.toggle('order-list__arrow--turn');
    } else {
        e.target.dataset.order = 'asc';
        sorted = estates.sort((a, b) => a[sortBy].toString().localeCompare(b[sortBy], 'de', {numeric: true}));
        e.target.children[1].classList.toggle('order-list__arrow--turn');
    };

    return sorted;
};