import popup from '../templates/popup.hbs';

function mapInit() {
  let placemarkData = [];

  ymaps.ready(() => {
        let map = new ymaps.Map('map', {
            center: [47.222078, 39.720349],
            zoom: 12,
            controls: ['zoomControl'],
            behaviors: ['drag']
        });

        map.events.add('click', (e) => createdBalloon(e.get('coords')));

         function createdBalloon(coords) {
           map.balloon.open(coords, { content: popup() });
           document.addEventListener('click', (e) => {

             if (e.target.id === 'btn') {
               let name = document.querySelector('#name').value
               let place = document.querySelector('#place').value
               let content = document.querySelector('#content').value

               placemarkData.push({ coords, info: { name, place, content }})
               createdPlacemark(coords, placemarkData)
               map.balloon.close();
             }
           });
         }

        function createdPlacemark(coords, placemarkData) {
          //console.log(placemarkData)
          // let data = [
          //   {
          //     coords: [1,2],
          //     info: {name: "1", place: "2", content: "3"}
          //   },
          //   {
          //     coords: [1,2],
          //     info: {name: "5", place: "6", content: "7"}
          //   }
          // ]
          let myPlacemark = new ymaps.Placemark(coords, {
            balloonContentBody: popup({placemarkData})
          });
          map.geoObjects.add(myPlacemark);
        }
    })
}

export { mapInit }
