//* fuction to fetch dog images api, returns promise
function fetchDogImages(){
    return fetch("https://dog.ceo/api/breeds/image/random/4")
    .then((response) => {return response.json()})
}

//* function to render each picture from dog images api to the DOM
function renderDogImages(){
    fetchDogImages()
    .then((json) => {
        const dogPics = json.message
        const dogImageContainer = document.querySelector('#dog-image-container')
        for (let dog in dogPics){
            let img = document.createElement('img')
            img.src = dogPics[dog]
            dogImageContainer.appendChild(img)
        }
    })
}

//* function to fetch dog breeds api and parse, returns promise
function fetchDogBreeds(){
    return fetch('https://dog.ceo/api/breeds/list/all')
    .then((response) =>  {return response.json()})
}

//* empty array to hold all breeds being displayed in list
const breeds = [];
//* grabbing the breedContainer
const breedContainer = document.querySelector('#dog-breeds')
//* function for setting breed to li elements innerText and adding to list
function displayBreed(innerText){
    let li = document.createElement('li')
    li.id = 'breed'
    li.innerText = innerText
    breeds.push(li)
    breedContainer.appendChild(li)
}

//* function for slapping breeds on the dom
function renderDogBreeds(){
    fetchDogBreeds()
    .then((json) => {
        const dogBreeds = json.message;
        const breedKeyValues = Object.entries(dogBreeds)
        for (let i in breedKeyValues){
            if (breedKeyValues[i][1].length === 0){
                displayBreed(breedKeyValues[i][0])
            } else {
                breedKeyValues[i][1].forEach(function(breed){
                    displayBreed(`${breed} ${breedKeyValues[i][0]}`)
                })
            }
        }
    })
}

//* event listner that changes list elements color when clicked
breedContainer.addEventListener('click', function(e){
    if (e.target.id === 'breed'){
        e.target.style.color = 'firebrick'
    }
})

//* grabbing the dropdown
const dropdown = document.querySelector('#breed-dropdown')

//* adding event listener to drop down 
dropdown.addEventListener('change', function(e){
    let showBreeds = breeds.filter( breed => breed.textContent.startsWith(e.target.value))
    breedContainer.querySelectorAll('li').forEach(function(element){element.remove()})
    showBreeds.forEach(function(b){
        breedContainer.appendChild(b)
    })
})

//* event listner that fires once the DOM is loaded
document.addEventListener('DOMContentLoaded', function(){
    renderDogImages();
    renderDogBreeds();

})