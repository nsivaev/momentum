//================================= watch and date =========================================
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
    greeting.textContent = `Good ${timeOfDay}`;
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
    }
    window.addEventListener('beforeunload', setLocalStorage);

    function getLocalStorage() {
        if(localStorage.getItem('name')) {
            greetingName.value = localStorage.getItem('name');
        }
    }
    window.addEventListener('load', getLocalStorage);

}

showTime();


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

