const d = new Date()
let calendarMonth = d.getMonth()
let calendarYear = d.getFullYear()
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

function daysInMonth(month, year) {
    return new Date(year, month+1, 0).getDate();
}

function firstDateOfMonth(month, year) {
    return new Date(year, month, 0).getDay();
}

onPageLoad()
function onPageLoad() {
    loadCalendarPage(calendarMonth, calendarYear)
}



function scrollForwardMonth() {
    calendarMonth = (12+(calendarMonth+1)) % 12
    calendarYear = calendarYear + (calendarMonth == 0 ? 1 : 0)
    loadCalendarPage(calendarMonth, calendarYear)
}

function scrollBackMonth() {
    calendarMonth = (12+(calendarMonth-1)) % 12
    calendarYear = calendarYear - (calendarMonth == 11 ? 1 : 0)
    loadCalendarPage(calendarMonth, calendarYear)
}


function loadCalendarPage(month, year) {
    let monthName = monthNames[calendarMonth]
    let el = document.getElementById("month-name")
    el.innerText = monthName + " " + calendarYear

    let calendar = document.getElementById("calendar-section")

    children = Array.prototype.slice.call(calendar.children).splice(7, 1000)
    children.forEach(child => child.remove())

    let daysInThisMonth = daysInMonth(calendarMonth, calendarYear)
    let firstDate = firstDateOfMonth(calendarMonth, calendarYear)
    
    if (firstDate != 0) {
        let lastYear = calendarYear - (calendarMonth == 0 ? 1 : 0)
        let daysInLastMonth = daysInMonth((12+(calendarMonth-1)) % 12, lastYear)
        for (let i=0; i < firstDate; i++) {
            let el = document.createElement("div")
            el.id = new Date(lastYear, (12+(calendarMonth-1)) % 12, daysInLastMonth - firstDate + i+1).getTime()
            el.classList.add("day", "disabled")
            if (new Date(lastYear, (12+(calendarMonth-1)) % 12, daysInLastMonth - firstDate + i+1).getTime() < d.getTime()) {
                el.style.backgroundColor = `rgba(255, ${parseInt(Math.random()*255)}, 0, 0.3)`
            } else {
                el.classList.add("future")
            }
            el.innerText = daysInLastMonth - firstDate + i + 1
            calendar.appendChild(el)
        }
    }

    for (let i=1; i < daysInThisMonth+1; i++) {
        let el = document.createElement("div")
        el.classList.add("day")
        el.id = new Date(calendarYear, calendarMonth, i).getTime()
        if (new Date(calendarYear, calendarMonth, i).getTime() < d.getTime()) {
            el.style.backgroundColor = `rgb(255, ${parseInt(Math.random()*255)}, 0)`
        }
        el.innerText = i
        calendar.appendChild(el)
    }

    let nextYear = calendarYear + (calendarMonth == 11 ? 1 : 0)
    let daysInNextMonth = daysInMonth((12+(calendarMonth+1)) % 12, nextYear)
    let daysInNextMonthToAdd = 7*6 - daysInThisMonth - firstDate
    for (let i=0; i < daysInNextMonthToAdd; i++) {
        let el = document.createElement("div")
        el.id = new Date(nextYear, (12+(calendarMonth+1)) % 12, i+1).getTime()
        el.classList.add("day")
        if (new Date(nextYear, (12+(calendarMonth+1)) % 12, i+1).getTime() > d.getTime()) {
            el.classList.add("future")
        } else {
            el.classList.add("disabled")
            el.style.backgroundColor = `rgba(255, ${parseInt(Math.random()*255)}, 0, 0.3)`
        }
        el.innerText = i + 1
        calendar.appendChild(el)
    }

    children = Array.prototype.slice.call(calendar.children).splice(7, 1000)
    children.forEach(child => {
        let bg = window.getComputedStyle(child, null).getPropertyValue("background-color")
        if (isColourLight(bg)) {
            child.style.color = "black"
        }
    })


    loadClickHandlers()
}

function loadClickHandlers() {
    let days = document.getElementsByClassName("day");
    for(let day of days) {
        day.onclick = function () {
            let date = new Date(parseInt(day.id));
            if (date.getTime() > d.getTime()) {
                return;
            } else if (day.classList.contains("disabled")) {
                return;
            } else {
                document.getElementById("selected-date").innerText = date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
                let tasks = document.getElementsByClassName("task");
                for (let task of tasks) {
                    task.checked = Math.random() < 0.75;
                    if (task.checked) {
                        let t = task.nextElementSibling.firstElementChild.firstElementChild.innerText
                        t = trimChar(t, "+")
                        task.nextElementSibling.firstElementChild.firstElementChild.innerText = "+"+ t
                    } else {
                        let t = task.nextElementSibling.firstElementChild.firstElementChild.innerText
                        t = trimChar(t, "+")
                        task.nextElementSibling.firstElementChild.firstElementChild.innerText = t
                    }
                }
            }
        }
    }
}


function trimChar(string, charToRemove) {
    while(string.charAt(0)==charToRemove) {
        string = string.substring(1);
    }

    while(string.charAt(string.length-1)==charToRemove) {
        string = string.substring(0,string.length-1);
    }

    return string;
}



function isColourLight(color) {

    // Variables for red, green, blue values
    var r, g, b, hsp;
    
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        
        r = color[1];
        g = color[2];
        b = color[3];
    } 
    else {
        
        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace( 
        color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }
    
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) {
        return true;//light
    } 
    else {
        return false;//dark
    }
}