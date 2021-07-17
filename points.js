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
    label.contentEditable == "true" ? label.contentEditable == "false" : label.contentEditable = "true";
}

function findLableForControl(el) {
    labels = document.getElementsByTagName('label');
    for(let i = 0; i < labels.length; i++ ) {
        if (labels[i].htmlFor == el.id) return labels[i];
    }
}