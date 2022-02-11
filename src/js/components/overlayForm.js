import * as Mutation from '../tools/queries.js';

export const overlayForm = (propertyId) => {   
    const formOverlayBtn = document.querySelector('.property-details__cta-button');
    const formOverlayClose = document.querySelector('.overlay-form__close');
    const formOverlay = document.querySelector('.overlay-form');
    const error = document.querySelector('.overlay-form__error');
    const modal = document.querySelector('.modal');
    let inputs = document.querySelectorAll('[data-input]');

    if(formOverlayBtn) {
        formOverlayBtn.addEventListener('click', () => {
            formOverlay.classList.toggle('overlay-form--open');
        });    
    };

    if(formOverlayClose) {
        formOverlayClose.addEventListener('click', () => {
            formOverlay.classList.toggle('overlay-form--open');
        });
    };

    //get inputdata from form and create object
    document.querySelector('.overlay-form__send').addEventListener('click', async () => {  
        let createMessage = { estate_id: propertyId };

        for(let input of inputs) {
            if(input.value === '' && input.name !== 'message') {
                input.style.border = '2px solid rgb(240, 73, 73)';
                error.innerHTML = 'Bitte alle Pflichtfelder ausfüllen';    
                return;
            } else if(input.name === 'zip' && /^\d{4}$/.test(input.value) === false) {
                input.style.border = '2px solid rgb(240, 73, 73)';
                error.innerHTML = 'Bitte eine gültige Postleitzahl eingeben';
                return;
            } else if(input.name === 'email' && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(input.value).toLowerCase()) === false) {
                input.style.border = '2px solid rgb(240, 73, 73)';
                error.innerHTML = 'Bitte eine gültige Email Adresse verwenden';
                return
            } else if(input.name === 'checkbox') {
                createMessage[input.dataset.input] = input.checked;
            } else {
                input.style.border = 'none';
                error.innerHTML = '';
                createMessage[input.dataset.input] = input.value;
            }
        };

        const response = await Mutation.sendFormData(createMessage);
        if(response) {
            for(let input of inputs) {
                input.value = '';
                input.checked = false;
                modal.classList.add('modal--open');
            }
        };
    });

    document.querySelector('.modal__button').addEventListener('click', () => {
        modal.classList.remove('modal--open');
        formOverlay.classList.toggle('overlay-form--open');
    });
};