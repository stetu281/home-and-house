import pin from '../../img/icons/map-pin.png';

export const maps = (coor, cont, zoom) => {
    const map = new google.maps.Map(cont, {
        center: coor,
        zoom: zoom,
        mapId: '65f688c2c1f108d9',
        disableDefaultUI: true
    });

    const marker = new google.maps.Marker({
        position: coor,
        map: map,
        icon: pin
    });
};