console.log('%c HI', 'color: firebrick')
function fetchDogImages(){
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const dogContainer = document.querySelector('#dog-image-container')
    
    fetch(imgUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        dogArray = json.message
        dogArray.forEach(function(element){
            let img = document.createElement('img')
            img.src = element
            dogContainer.appendChild(img);
        })
    })
}



const breedContainer = document.querySelector('#dog-breeds')
function fetchDogBreeds(){
    // debugger;
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        dogBreeds = json.message;
        
        Object.entries(dogBreeds).forEach(function(element){
            element[1].length === 0 ? true : false
           
            if (element[1].length === 0){
                let li = document.createElement('li')
                li.innerText = element[0]
                li.id = 'breed'
                breeds.push(li)
                breedContainer.appendChild(li)
            } else {
                element[1].forEach(function(e){
                    let li = document.createElement('li')
                    li.innerText = `${e}  ${element[0]}`
                    li.id = 'breed'
                    breeds.push(li)
                    breedContainer.appendChild(li)
                })
            }
        })
    })
}


breedContainer.addEventListener('click',function(e){
    console.log(e.target)
    
    if (e.target.id === 'breed'){
        e.target.style.color = 'goldenrod'
    }
})

const breedDropdown = document.querySelector('#breed-dropdown')
let breeds = [];

breedDropdown.addEventListener('change', function(e){
    let showBreeds = breeds.filter(breed => breed.textContent.startsWith(e.target.value))
        breedContainer.querySelectorAll('li').forEach(function(e){e.remove()})
        showBreeds.forEach(function(element){
            breedContainer.appendChild(element)
        })
    })


document.addEventListener('DOMContentLoaded', function(){

    fetchDogImages();
    fetchDogBreeds(); 
   

    })

