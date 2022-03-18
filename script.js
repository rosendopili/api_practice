import {key} from './hidden.js'; 

const cityname = document.querySelector('.cityname');
const temp = document.querySelector('.temp');
const description = document.querySelector('.description');
const low = document.querySelector('.low');
const high = document.querySelector('.high');
const zipcode = document.querySelector('.zipcode'); 
const submit = document.querySelector('.submit')
const hat = document.querySelector('.hat'); 
const shirt = document.querySelector('.shirt');
const pants= document.querySelector('.pants');
const shoes = document.querySelector('.shoes'); 
const contentContainer = document.querySelector('.content_container'); 
const date = new Date()
const time = date.getHours()

const submitZip = () => {
    let zip = zipcode.value

    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${key}`)
        .then((response) => {
            return response.json(); 
        })
        .then((response) => {
            contentContainer.classList.remove('display_none'); 
            getWeather(response); 
            zipcode.value = ''; 
            getSuggestions(response); 
        })
        .catch((error) => {
            console.log(error); 
        })
}; 

const getWeather = (response) => {
    loadWeatherIcon(response); 

    cityname.textContent = response.name;
    temp.textContent = `${Math.floor(response.main.temp)}˚`;
    low.textContent = `${Math.floor(response.main.temp_min)}˚`;
    high.textContent = `${Math.floor(response.main.temp_max)}˚`;

        let lowLabel = document.createElement('p');
            lowLabel.textContent = 'Low'; 
            lowLabel.classList.add('label')
            low.appendChild(lowLabel); 

        let highLabel = document.createElement('p');
            highLabel.textContent = 'High'; 
            highLabel.classList.add('label')
            high.appendChild(highLabel); 
}

const getSuggestions = (response) => {

    pants.setAttribute('src', 'assets/clothing/joggers.png');
       
    if (response.main.temp_max > 50) {
        hat.setAttribute('src', 'assets/clothing/fitted.png');
        shirt.setAttribute('src', 'assets/clothing/tshirt.png');
        shoes.setAttribute('src', 'assets/clothing/sneakers.png');
    } else {
        hat.setAttribute('src', 'assets/clothing/hardhat.png')
        shirt.setAttribute('src', 'assets/clothing/hoodie.png');
        shoes.setAttribute('src', 'assets/clothing/timberland.png');
    }
}

const loadWeatherIcon = (response) => {   

    let folder = (time >= 19 || time < 6) ? 'night_time':'day_time';

    switch(response.weather[0].main){
        case 'Clouds':
            description.setAttribute('src', `assets/${folder}/few_clouds.png`);
            break; 
        case 'Clear':
            description.setAttribute('src', `assets/${folder}/clear_sky.png`);
            break; 
        case 'Rain':
            description.setAttribute('src', 'assets/day_time/heavy_rain.png');
            break; 
        case 'Drizzle':
            description.setAttribute('src', 'assets/day_time/rain.png');
            break;     
        case 'Thunderstorm':
            description.setAttribute('src', 'assets/day_time/thunderstorm.png');
            break;
        default: description.setAttribute('src', 'assets/day_time/mist.png');

    }
}

submit.addEventListener('click', (e) => {
    e.preventDefault()
    submitZip(e); 
});
