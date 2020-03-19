const imageAPI = "https://dog.ceo/api/breeds/image/random/4";
const breedAPI = "https://dog.ceo/api/breeds/list/all"

function fetchDogImages() {
  return fetch(imageAPI).then(resp => resp.json());
}

function fetchDogBreeds() {
  return fetch(breedAPI).then(resp => resp.json());
}

function renderImages() {
  fetchDogImages().then(dogs => {
    dogs.message.forEach(dog => {
      const container = document.querySelector("#dog-image-container");
      const img = document.createElement("img");
      img.setAttribute("src", dog);
      container.appendChild(img);
    });
  });
}

function renderBreeds() {
  fetchDogBreeds().then(breeds => {
    for (breed in breeds.message) {
      if (breeds.message.hasOwnProperty(breed)) {
        const ul = document.querySelector("#dog-breeds");
        const li = document.createElement("li");
        li.setAttribute("class", "doggy");
        li.textContent = breed;
        ul.appendChild(li);
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  renderImages();
  renderBreeds();
  // const dropdown = document.querySelector("#breed-dropdown");
  const parent = document.querySelector("#dog-breeds");
});

document.addEventListener("click", function(e) {
  if (e.target.className === "doggy") {
    e.target.style.color = "skyblue";
  }
});

// couldn't get the code below to work

document.addEventListener("change", function(e) {
  if (e.target.id === "breed-dropdown") {
    const display = breeds.filter(breed => breed.startsWith(e.target.value));
    parent.querySelectorAll("*").forEach(n => n.remove());
    display.forEach(breed => {
      const breedItem = document.createElement("li");
      breedItem.textContent = breed;
      parent.appendChild(breedItem);
    });
  }
});
