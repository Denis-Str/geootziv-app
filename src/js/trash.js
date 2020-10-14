import popup from "../templates/popup.hbs";

function f() {
  let dataForm = {};
  let name = document.querySelector('#name');
  let place = document.querySelector('#place');
  let content = document.querySelector('#content');
  dataForm.name = name.value;
  dataForm.palce = place.value;
  dataForm.content = content.value;
  return dataForm;
}

createPoint(e.get('coords'))

// let btn = document.querySelector('#btn');
// btn.addEventListener('click', e => {
//     f();
//     console.log(f())
// });

function createPoint(coords) {
  // let source   = document.getElementById("#popup").html();
  // let template = Handlebars.compile(source)
  // let data = f();
  // console.log(data)
  let myPlacemark = new ymaps.Placemark(coords, {
    hintContent: 'Собственный значок метки',
    balloonContent: popup({'hello': 1})
    //balloonContent: template
  });
  map.geoObjects.add(myPlacemark);
}
