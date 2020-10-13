function mapInit() { 
    ymaps.ready(() => {
        let marksArr = [];

        let map = new ymaps.Map('map', {
            center: [47.222078, 39.720349],
            zoom: 11,
            controls: ['zoomControl'],
            behaviors: ['drag']
        });
        map.events.add('click', function (e) {
            // Получение координат щелчка
            let coords = e.get('coords');
            createPoint(coords);
        });
        marksArr.forEach(coords => {
            createPoint(coords)
        });

        function createPoint(coords) {
            let myPlacemark = new ymaps.Placemark(coords, {
                hintContent: 'Собственный значок метки',
                balloonContent: 'Это красивая метка'
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                //iconImageHref: './img/icons/map-marker.svg',
                // Размеры метки.
                iconImageSize: [46, 57],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-5, -38]
            });
            map.geoObjects.add(myPlacemark);
        }

        // let clusterer = new ymaps.Clusterer({
        //
        // });
        //
        // map.geoObject.add(clusterer);
    })
}

export { 
    mapInit
}
