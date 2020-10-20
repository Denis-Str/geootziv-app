import popup from '../templates/popup.hbs';

function mapInit() {
  let placemarks = [];

  ymaps.ready(() => {
    let myMap = new ymaps.Map('map', {
      center: [47.222078, 39.720349],
      zoom: 12,
      controls: ['zoomControl'],
      behaviors: ['drag']
    });

    const clusterer = new ymaps.Clusterer({
      "preset": "islands#invertedVioletClusterIcons",
      "groupByCoordinates": true,
      "clusterDisableClickZoom": true,
      "hasBalloon": false
    });
    myMap.geoObjects.add(clusterer);

    clusterer.events.add('click', e => {
      let coords = e.get('target').geometry.getCoordinates();
      if (e.get('target').options.getName() === 'cluster') createdBalloon(coords);
    })

    myMap.events.add('click', (e) => createdBalloon(e.get('coords')));

    document.addEventListener('click', (e) => {
      let name = document.querySelector('#name');
      let place = document.querySelector('#place');
      let content = document.querySelector('#content');

      if (e.target.dataset.btn === 'add') {
        let coordsStr = document.querySelector('[data-info]').dataset.info;
        let coords = JSON.parse(coordsStr);

        if (formValidate({name, place, content})) {
          placemarks.push({
            coords: coordsStr,
            name: name.value,
            place: place.value,
            content: content.value
          });
          createdPlacemark({coords, info: {
            name: name.value,
              place: place.value,
              content: content.value}
          });
          myMap.balloon.close();
        } else {
          alert('заполните форму');
        }
      }
    });

    function createdBalloon(coords) {
      myMap.balloon.open(coords, popup({
        coords: JSON.stringify(coords),
        placemarks: getInfoByCoords(coords)
      }));
    }

    function createdPlacemark({coords}) {
      let myPlacemark = new ymaps.Placemark(coords, {
        balloonContentBody: popup({
          coords: JSON.stringify(coords),
          placemarks: getInfoByCoords(coords)
        })
      });
      clusterer.add(myPlacemark);
    }

    function getInfoByCoords(coords) {
      return placemarks.filter((pin) => pin.coords === JSON.stringify(coords))
    }
  })

  const formValidate = (obj) => {
    let valid = true;
    for (let elem in obj) {
      if (obj[elem].value === "") return valid = false;
    }
    return valid;
  };
}

export {mapInit}
