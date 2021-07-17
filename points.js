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
    if (label.contentEditable == "true") {
        label.contentEditable = "false";
        label.classList.remove("editable")
    } else {
        label.contentEditable = "true";
        label.focus()
        label.classList.add("editable")
    }
}

function findLableForControl(el) {
    labels = document.getElementsByTagName('label');
    for(let i = 0; i < labels.length; i++ ) {
        if (labels[i].htmlFor == el.id) return labels[i];
    }
}