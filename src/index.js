console.log('%c Welcome to Dog Fetcher!', 'color: goldenrod')
let breedArray = []
let completeBreedArray = []

function fetchPhotos() {
    return fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(function(response) {
        return response.json()
    })
    .then(function(json) {
        return displayPhotos(json.message)
    })
}

function displayPhotos(input) {
    const imageContainer = document.querySelector('#dog-image-container')
    for (i = 0; i < input.length; i++) {
        const img = document.createElement('img')
        img.src = input[i]
        img.style = "height: 250px; margin: 5px;"
        imageContainer.appendChild(img)
    }
}

function fetchBreeds() {
    return fetch("https://dog.ceo/api/breeds/list/all")
    .then(function(response) {
        return response.json()
    })
    .then(function(json) {
        breedArray = json.message
        return correctlySortBreeds(json.message)
    })
}

function correctlySortBreeds(input) {
    for (let [key, value] of Object.entries(input)) {
        if (value !== []) {
            for (i = 0; i < value.length; i++) {
                completeBreedArray.push(`${key}, ${value[i]}`)
            }
        }
        completeBreedArray.push(key)
    }
    displayBreeds(completeBreedArray)
}

function displayBreeds(input) {
    const breedContainer = document.querySelector('#dog-breeds')
    input.forEach(function(e){
        const breed = document.createElement('li')
        breed.innerHTML = e
        breedContainer.appendChild(breed)
        
        breed.addEventListener("click", function(){
            breed.style = "color: purple;"
        }) 
    })
}

function sortBreeds(value) {
    const breedContainer = document.querySelector('#dog-breeds')
    breedContainer.querySelectorAll('*').forEach(breed => breed.remove())
    if (value !== "Choose a Letter") {
        let breedFilter = completeBreedArray.filter(breed => breed.charAt(0) === value)
        displayBreeds(breedFilter)
    }
    if (value === "Choose a Letter") {
        fetchBreeds()
    }
}

fetchPhotos()
fetchBreeds()


