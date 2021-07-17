const pointsCounter = document.getElementById("current-points")

function toggleActivity(self, points){
    if (self.checked) {
        pointsCounter.innerText = parseInt(pointsCounter.innerText) + points
    } else {
        pointsCounter.innerText = parseInt(pointsCounter.innerText) - points
    }
}

function edit(id) {
    let label = findLableForControl(document.getElementById(id));
    let span = label.childNodes[3];
    if (span.contentEditable == "true") {
        span.contentEditable = "false";
        span.onclick = () => {return true;}
        span.classList.remove("editable")
    } else {
        span.contentEditable = "true";
        span.focus()
        let text = span.innerText;
        span.innerText = "";
        span.innerText = text;
        span.onclick = () => {return false;}
        span.classList.add("editable")
    }
}

function findLableForControl(el) {
    labels = document.getElementsByTagName('label');
    for(let i = 0; i < labels.length; i++ ) {
        if (labels[i].htmlFor == el.id) return labels[i];
    }
}