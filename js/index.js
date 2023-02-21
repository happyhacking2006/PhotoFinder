// variables
const API_CEY = '563492ad6f917000010000017a140d7900cb4366b0cb1fbb475342f0';
const input = document.querySelector('input');
const formBtn = document.querySelector('.search-btn');

let searchText ="";
let search = false;

// default photos
async function defaultPhotos() {
    const data = await fetch(`https://api.pexels.com/v1/curated`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization: API_CEY,
        }
    })
    const response = await data.json()
    console.log(response);


    displayImage(response)
}

function displayImage(response) {
    response.photos.forEach((image)=>{
        const photoDiv = document.createElement('div')
        photoDiv.innerHTML = `
            <a href=${image.src.large} target="_blank">
            <img class="image" src=${image.src.large} alt=${image.url}>
            </a>
            <figcaption class="caption">📷: ${image.photographer}</figcaption>`;

        document.querySelector(".display_images").appendChild(photoDiv)
    })
}

async function searchPhotos(query) {
    const data = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization: API_CEY,
        }
    })
    const response = await data.json()
    console.log(response);


    displayImage(response)
}

input.addEventListener('input', (e) => {
    e.preventDefault();
    searchText = e.target.value;
})

formBtn.addEventListener('click', () => {
    if(input.value === ""){
        document.querySelector('.alert').innerHTML = "Empty search! Plaese enter value...";
    }else{
        document.querySelector('.alert').innerHTML = "";
        search = true;
        clear();
        searchPhotos(searchText)
    }
})

function clear() {
    document.querySelector('.display_images').innerHTML = "";
}

defaultPhotos();

