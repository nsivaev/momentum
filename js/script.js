//time
const timeDoc = document.querySelector('.time');

function showTime() {
    const date = new Date();
    timeDoc.textContent = date.toLocaleTimeString();
    setTimeout(showTime, 1000);
}
showTime();

//date
const dateDoc = document.querySelector('.date');

function showDate() {
    const date = new Date();
    //todo future || const options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'};
    dateDoc.textContent = date.toLocaleDateString(); //('de-De', options)
    setTimeout(showDate, 1000);
}
showDate();

//time of day
const greeting = document.querySelector('.greeting');

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();

    if (hours === 6 || 7 || 8 || 9 || 10 || 11) {
        greeting.textContent = 'Good morning';
    } if (hours === 12 || 13 || 14 || 15 || 16 || 17) {
        greeting.textContent = 'Good afternoon';
    } if (hours === 18 || 19 || 20 || 21 || 22 || 23) {
        greeting.textContent = 'Good evening';
    } else {
        greeting.textContent = 'Good night';
    }
}
getTimeOfDay()

//name + local storage
const name = document.querySelector('.name');

function setLocalStorage() {
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)

//background
const body = document.querySelector('body');

body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/10.jpg')";

//get random num

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function setBg() {
    const timeOfDay = timeDoc;
    const bgNum = getRandomInt(21).toString().padStart(2, '0');
}