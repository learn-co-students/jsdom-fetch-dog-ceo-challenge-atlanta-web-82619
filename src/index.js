function addDogImgs() {
    const imgURL = "https://dog.ceo/api/breeds/image/random/4";
    const container = document.querySelector('#dog-image-container');

    fetch(imgURL)
        .then(r => r.json())
        .then(j => {
            j.message.forEach(el => {
                let img = document.createElement('img');
                img.src = el;
                img.alt = 'dogpic';

                container.appendChild(img);
            });
    });
}
addDogImgs();
const container = document.querySelector('#dog-breeds');

function printdogs(j) {
    Object.keys(j.message).forEach((key) => {
        let li = document.createElement('li');
        li.innerText = `${key}`;
        container.appendChild(li);
    })
}

let breedList = {}

function addDogBreeds() {
    const breedURL = 'https://dog.ceo/api/breeds/list/all';

    fetch(breedURL)
        .then(r => r.json())
        .then(j => {
            printdogs(j);
            breedList = j.message;
        });
}
addDogBreeds();

function changeLiColors() {
    const breeds = document.querySelector('#dog-breeds');

    breeds.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            e.target.style.color = 'gold';
        }
    })
}
changeLiColors();

const option = document.querySelector('#breed-dropdown');
option.addEventListener('change', (e) => {
    filterBreeds(e.target.value);
})

function filterBreeds(value) {
    const breeds = document.querySelector('#dog-breeds').querySelectorAll('li');
    breeds.forEach((node) => {
        if (node.innerText.substring(0,1).toLowerCase() === option.value) {
            node.style.display = '';
        }
        else {
            node.style.display = 'none';
        }
    })
}
