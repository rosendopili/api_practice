import {key} from './hidden.js'; 

const cityname = document.querySelector('.cityname');
const temp = document.querySelector('.temp');
const description = document.querySelector('.description');
const low = document.querySelector('.low');
const high = document.querySelector('.high');
const weatherContainer = document.querySelector('.weather_container');
const zipcode = document.querySelector('.zipcode'); 
const submit = document.querySelector('.submit')
const hat = document.querySelector('.hat'); 
const shirt = document.querySelector('.shirt');
const pants= document.querySelector('.pants');
const shoes = document.querySelector('.shoes'); 
const suggestionContainer = document.querySelector('.suggestion_container'); 

const submitZip = () => {
    let zip = zipcode.value

    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${key}`)
        .then((response) => {
            return response.json(); 
        })
        .then((response) => {
            console.log(response)
            weatherContainer.classList.remove('display_none'); 
            getWeather(response); 
            zipcode.value = ""; 
            suggestionContainer.classList.remove('display_none'); 
            getSuggestions(response); 
        })
        .catch((error) => {
            console.log(error); 
        })
}; 

const getWeather = (response) => {

    cityname.textContent = response.name;
    description.textContent = response.weather[0].description;
    temp.textContent = `${Math.floor(response.main.temp)}˚`;
    low.textContent = `low ${Math.floor(response.main.temp_min)}˚`;
    high.textContent = `high ${Math.floor(response.main.temp_max)}˚`;
}

const getSuggestions = (response) => {

    pants.setAttribute('src', 'assets/joggers.png'); 
    if (response.main.temp_max > 50) {
        hat.setAttribute('src', 'assets/fitted.png');
        shirt.setAttribute('src', 'assets/tshirt.png');
        shoes.setAttribute('src', 'assets/sneakers.png');
    } else {
        hat.setAttribute('src', 'assets/hardhat.png')
        shirt.setAttribute('src', 'assets/hoodie.png');
        shoes.setAttribute('src', 'assets/timberland.png');
    }
}


submit.addEventListener('click', (e) => {
    e.preventDefault()
    submitZip(e); 
});