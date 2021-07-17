const pointsCounter = document.getElementById("current-points")
let currentActivities = 0

function toggleActivity(self, points) {
    if (self.checked) {
        pointsCounter.innerText = parseInt(pointsCounter.innerText) + points
    } else {
        pointsCounter.innerText = parseInt(pointsCounter.innerText) - points
    }
}

function edit(id, elem) {
    let label = findLableForControl(document.getElementById(id));
    let span = label.childNodes[3];
    if (span.contentEditable == "true") {
        if (span.innerText == "") {
            span.parentElement.parentElement.remove()
        }
        span.contentEditable = "false";
        span.onclick = () => { return true; }
        span.classList.remove("editable")
        elem.src = "/assets/edit.png"
    } else {
        span.contentEditable = "true";
        span.focus()
        setEndOfContenteditable(span)
        span.onclick = () => { return false; }
        span.classList.add("editable")
        span.onkeydown = (e) => {
            if (e.keyCode == 13) {
                if (span.innerText == "") {
                    span.parentElement.parentElement.remove()
                }
                span.contentEditable = "false";
                span.onclick = () => { return true; }
                span.classList.remove("editable")
                elem.src = "/assets/edit.png"
            }
        }
        elem.src = "/assets/tick.png"
    }
}

function findLableForControl(el) {
    labels = document.getElementsByTagName('label');
    for (let i = 0; i < labels.length; i++) {
        if (labels[i].htmlFor == el.id) return labels[i];
    }
}

function setEndOfContenteditable(contentEditableElement) {
    var range, selection;
    if (document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if (document.selection)//IE 8 and lower
    {
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
}

function addActivity(self) {
    let points = self.parentElement.firstElementChild.firstElementChild.value
    let message = self.parentElement.children[1].firstElementChild.value

    if (points == "" || points < 1 || message == "") {
        alert("Invalid input!")
        return;
    }

    renderActivity(points, message)
}

function renderActivity(points, message) {
    currentActivities += 1

    let el = document.createElement("div")
    el.classList.add("container")
    el.innerHTML = `
        <input type="checkbox" name="sample-${currentActivities}" id="sample-${currentActivities}" value="sample-${currentActivities}" class="task" onclick="toggleActivity(this, ${points})">
        <label for="sample-${currentActivities}">
            <div class="checkbox">
                <span class="points">+${points}</span>
            </div>
            <span>${message}</span>
        </label>
        <img class="edit" src="/assets/edit.png" onclick="edit('sample-${currentActivities}', this)">
    `
    document.getElementById("checklist").appendChild(el)
}