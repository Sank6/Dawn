const d = new Date()
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function firstDateOfMonth(month, year) {
    return new Date(year, month, 0).getDay();
}

onPageLoad()
function onPageLoad() {
    loadCalendarPage(d.getMonth(), d.getYear())
}



function loadCalendarPage(month, year) {
    let monthName = monthNames[d.getMonth()]
    let el = document.getElementById("month-name")
    el.innerText = monthName + " " + d.getFullYear()

    let calendar = document.getElementById("calendar-section")

    let daysInThisMonth = daysInMonth(d.getMonth(), d.getFullYear())
    let firstDate = firstDateOfMonth(d.getMonth(), d.getFullYear())
    
    if (firstDate != 0) {
        let lastYear = d.getFullYear() - (d.getMonth() == 0 ? 1 : 0)
        let daysInLastMonth = daysInMonth((12+(d.getMonth()-1)) % 12, lastYear)
        console.log(firstDate)
        for (let i=0; i += 1; i < firstDate) {
            console.log("ok")
            let el = document.createElement("div")
            el.classList.add("day", "disabled")
            if (new Date(lastYear, (12+(d.getMonth()-1)) % 12, i).getTime() < d.getTime()) {
                el.style.backgroundColor = `rgb(255, ${parseInt(Math.random()*255)}, 0)`
            }
            el.innerText = daysInLastMonth - firstDate + i
            calendar.appendChild(el)
        }
    }

    for (let i=0; i += 1; i < daysInThisMonth) {
        console.log("ok2")
        let el = document.createElement("div")
        el.classList.add("day")
        if (new Date(d.getYear(), d.getMonth(), i).getTime() < d.getTime()) {
            el.style.backgroundColor = `rgb(255, ${parseInt(Math.random()*255)}, 0)`
        }
        el.innerText = i
        calendar.appendChild(el)
    }

    let nextYear = d.getFullYear() + (d.getMonth() == 11 ? 1 : 0)
    let daysInNextMonth = daysInMonth((12+(d.getMonth()+1)) % 12, nextYear)
    let daysInNextMonthToAdd = 7*5 - daysInThisMonth - firstDate
    for (let i=0; i += 1; i < daysInNextMonthToAdd) {
        console.log("ok3")
        let el = document.createElement("div")
        el.classList.add("day")
        if (new Date(nextYear, (12+(d.getMonth()+1)) % 12, i).getTime() > d.getTime()) {
            el.classList.add("future")
        } else {
            el.classList.add("disabled")
            el.style.backgroundColor = `rgb(255, ${parseInt(Math.random()*255)}, 0)`
        }
        el.innerText = daysInLastMonth - firstDate + i
        calendar.appendChild(el)
    }
}