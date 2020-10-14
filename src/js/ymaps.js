import popup from '../templates/popup.hbs'

function mapInit() {
    let nameInput = document.querySelector('#name')
    let placeInput = document.querySelector('#place')
    let contentInput = document.querySelector('#content')
    let btn = document.querySelector('#btn')

    ymaps.ready(() => {
        let map = new ymaps.Map('map', {
            center: [47.222078, 39.720349],
            zoom: 12,
            controls: ['zoomControl'],
            behaviors: ['drag']
        });

        map.events.add('click', (e) => {
            createdPlacemark(e.get('coords'));
        });


         function createdPlacemark(coords) {
            map.balloon.open(coords, { content: popup() }, {
                minHeight: 165,
                minWidth: 180
            });
            console.log(document.querySelector('#name'))

            let myPlacemark = new ymaps.Placemark(coords, {
                //hintContent: 'Собственный значок метки',
                balloonContent: '32432'
            });
        }
    })
}

export { mapInit }
