console.log('%c HI', 'color: firebrick');
// declare variables in global context so they're available everywhere
let lis;
let listArray;
let breeds;

function fetchPictures() {
  return fetch('https://dog.ceo/api/breeds/image/random/4')
  .then(resp => resp.json())
  .then(json => renderPictures(json.message));
}

function renderPictures(json) {
  const container = document.querySelector('#dog-image-container')
  json.forEach(pic => {
    const image = document.createElement('img');
    image.setAttribute("src", `${pic}`);
    container.appendChild(image);
  })
}

function fetchBreeds() {
  return fetch('https://dog.ceo/api/breeds/list/all')
  .then(resp => resp.json())
  .then(json => renderBreeds(json.message))
}

function renderBreeds(json) {
  const list = document.querySelector('#dog-breeds');
  const colorPicker = document.querySelector('#color-picker');
  Object.keys(json).forEach(breed => {
    const listItem = document.createElement('li');
    listItem.innerText = breed;
    list.appendChild(listItem);
    // click on list item and change color, but toggle class to pick color?
    listItem.addEventListener('click', function() {
      let choice = colorPicker.value;
      listItem.style.color = choice;

    })
  })
  // get array of breeds after they are all added
  lis = document.querySelectorAll('li');
  listArray = Array.from(lis);
  breeds = listArray.map(li => li.textContent);
}


document.addEventListener('DOMContentLoaded', function() {
  fetchPictures();
  fetchBreeds();
  const dropDown = document.querySelector('#breed-dropdown');
  const parent = document.querySelector('#dog-breeds');
  
  dropDown.addEventListener('change', function(e) {
    // filter breeds by what breed starts with & get value from e.target.value
    let breedsToShow = breeds.filter(breed => breed.startsWith(e.target.value));
    // clear list of all breeds
    parent.querySelectorAll('*').forEach(n => n.remove());
    // add all filtered breeds to the list
    breedsToShow.forEach(breed => {
      const breedItem = document.createElement('li');
      breedItem.innerText = breed;
      parent.appendChild(breedItem);
    })
  })
})


