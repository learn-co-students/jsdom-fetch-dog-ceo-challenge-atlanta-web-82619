console.log('%c HI', 'color: firebrick')

let breeds = []

document.addEventListener("DOMContentLoaded", function(){
    loadImages();
    loadBreeds()
    console.log("DOM loaded")
    const breedDropdown = document.querySelector("#breed-dropdown")
    breedDropdown.addEventListener("change", function(){
        const ul = document.querySelector("#dog-breeds")
        while(ul.firstChild) {
            ul.removeChild(ul.firstChild)
        }
        let letter = breedDropdown.value
        let filteredBreeds = breeds.filter(breed => breed[0] === letter)
        filteredBreeds.forEach(breed => addBreed(breed))
    })
})

function loadImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
    .then(response => response.json())
    .then(result => result.message.forEach(image => addImage(image)))
}

function addImage(imgUrl) {
    const container = document.querySelector("#dog-image-container")
    let newImage = document.createElement("img")
    newImage.src = imgUrl
    container.appendChild(newImage)
}

function loadBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
    .then(response => response.json())
    .then(result => {
        breeds = Object.keys(result.message)
        breeds.forEach(breed => addBreed(breed))
    })
}

function addBreed(breed) {
    const ul = document.querySelector("#dog-breeds")
    let li = document.createElement("li")
    li.innerText = breed
    ul.appendChild(li)
    ul.addEventListener("click", function(event) {
        if(event.target === li) {
            li.style.color = "teal"
        }
    })
}

