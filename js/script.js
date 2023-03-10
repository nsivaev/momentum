// ==============================================================================
// нет готового плеера, нет quotes при загрузке страницы (при нажатии на кнопку обновить – есть), нет ошибки при вводе неверного города
// ==============================================================================

// ================================= watch and date =========================================
const watch = document.querySelector('.time');
const calendar = document.querySelector('.date');

function showTime() {
    const date = new Date();
    watch.textContent = date.toLocaleTimeString();
    showDate(date);
    showGreeting(date);
    showName();
    setInterval(showTime, 1000);
}

function showDate(date) {
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    calendar.textContent = date.toLocaleDateString('en-US', options);
}


// ====================================== greeting ======================================
const greeting = document.querySelector('.greeting');

function getTimeOfDay(date) {
    const hours = date.getHours();

    if (hours >= 6 && hours < 12) {
        return 'morning';
    } else if (hours >= 12 && hours < 18) {
        return 'afternoon';
    } else if (hours >= 18 && hours < 24) {
        return 'evening';
    } else {
        return 'night';
    }
}

function showGreeting(date) {
    const timeOfDay = getTimeOfDay(date);
    greeting.textContent = `Good ${timeOfDay},`;
}

function showName() {
    let greetingName = document.querySelector('.name');

    if (!localStorage.getItem('name')) {
        greetingName.placeholder = '[Enter name]';
    }

    greetingName.addEventListener('blur', function() {
        greetingName.placeholder = '[Enter name]';
    });

    function setLocalStorage() {
        localStorage.setItem('name', greetingName.value);
        if (city.textContent === '') {
            localStorage.setItem('weatherCity', city.value)

        }
        else { localStorage.removeItem('city'); }

    }
    window.addEventListener('beforeunload', setLocalStorage);

    function getLocalStorage() {
        if(localStorage.getItem('name')) {
            greetingName.value = localStorage.getItem('name');
        }
        if (localStorage.getItem('city')) {
            city.value = localStorage.getItem('weatherCity');
        }
    }
    window.addEventListener('load', getLocalStorage);

}

showTime();


// ====================================== onload ======================================
window.onload = function () {
        city.value = 'Minsk';
        setCity();
        getWeather();
        getQuotes(randomNumForQuotes);
        addPlayList();

        const playListTracks = document.querySelectorAll('.play-list');
        playListTracks.forEach((track, index, tracks) => {
            track.addEventListener('click', () => {
                removePlayListTrack(playListTracks);
                tracks[index].classList.toggle('pause')
                if (playNum === index) {
                    tracks[index].classList.toggle('pause')
                    playAudio()
                }
                else {
                    playNum = index;
                    isPlay = false;
                    playAudio()
                }
            })
        })

        const removePlayListTrack = (playListTracks) => {
            playListTracks.forEach(track => {
                track.classList.remove('pause');
            })
        }
    }


// ====================================== slider ======================================
const body = document.querySelector('body');

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomNum = getRandomNum(1, 20);

function getSlidePrev() {
    if (randomNum > 1) {
        randomNum--;
    } else {
        randomNum = 20;
    }
    setBg();
}

let slidePrev = document.querySelector('.slide-prev');
slidePrev.addEventListener('click', getSlidePrev);

function getSlideNext() {
    if (randomNum < 20) {
        randomNum++;
    } else {
        randomNum = 1;
    }
    setBg();
}

let slideNext = document.querySelector('.slide-next');
slideNext.addEventListener('click', getSlideNext);

function setBg() {
    const date = new Date();
    const timeOfDay = getTimeOfDay(date);
    const bgNum = String(`${randomNum}`).padStart(2, '0');
    const imageLink = `https://raw.githubusercontent.com/pavel8lisenkov/momentum-images/assets/images/${timeOfDay}/${bgNum}.jpg`;
    const img = document.createElement('img');
    img.src = imageLink;
    img.addEventListener('load',   function() {
        body.style.backgroundImage = `url('${imageLink}')`;
    });
}

setBg();


// ====================================== weather ======================================
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=628b3d945f6f599d6afd0a2320689c1f&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherDescription.textContent = data.weather[0].description;
}

function setCity(event) {
    if (event.code === 'Enter') {
        if (city.value === '') {
            error()
        } else {
            getWeather();
        }
    }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

//error
const weatherError = document.querySelector('.weather-error');

function error() {
    const errText = 'Error! City not found!';

    weatherIcon.className = 'weather-icon owf';

    weatherError.textContent = `${errText}`;
    temperature.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
    weatherDescription.textContent = '';
}


// ======================================DOMContentLoaded======================================
document.addEventListener('DOMContentLoaded', getWeather);
//city.addEventListener('change', () => {getWeather(city.value)})
city.addEventListener('keypress', setCity);

function setLocalWeatherStorage() {
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalWeatherStorage);

function getLocalWeatherStorage() {
    if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
    getWeather();
}
window.addEventListener('load', getLocalWeatherStorage);


// ====================================== quote of the day ======================================
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote')

let randomNumForQuotes = getRandomNum();

async function getQuotes(randomNumForQuotes) {
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    quote.textContent = data[randomNumForQuotes][`text`]
    author.textContent = data[randomNumForQuotes][`author`]
    changeQuote.classList.add('add__quote-scale')
}

changeQuote.addEventListener('click', () => {
    randomNumForQuotes = getRandomNum(0, 10);
    getQuotes(randomNumForQuotes);
});

// ====================================== player ======================================
const audio = document.querySelector('audio');
const playBtn = document.querySelector('.play');
const pauseBtn = document.querySelector('.pause');
const playListContainer = document.querySelector('.play-list');

function playAudio() {
    audio.currentTime = 0;
    audio.play();
}

function pauseAudio() {
    audio.pause();
}

// Add click event listener on play button
playBtn.addEventListener('click', function(){
    // Hide play button
    playBtn.style.display = "none";
// Show pause button
    pauseBtn.style.display = "block";
});

// Add click event listener on pause button
pauseBtn.addEventListener('click', function(){
    // Hide pause button
    pauseBtn.style.display = "none";
// Show play button
    playBtn.style.display = "block";
});

playBtn.addEventListener('click', playAudio);
pauseBtn.addEventListener('click', pauseAudio);

function playNext() {
    audio.pause(); // останавливаем предыдущее аудио
    const audioElements = document.querySelectorAll('audio');
    let currentIndex = 0;

    for (let i = 0; i < audioElements.length; i++) {
        if (audioElements[i].paused === false) {
            currentIndex = i;
            break;
        }
    }

    if (currentIndex === audioElements.length - 1) {
        audioElements[0].play();
    } else {
        audioElements[currentIndex + 1].play();
    }
}
document.querySelector('.play-next').addEventListener('click', playNext);