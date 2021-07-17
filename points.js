const pointsCounter = document.getElementById("current-points")

function toggleActivity(self, points){
    if (self.checked) {
        pointsCounter.innerText = parseInt(pointsCounter.innerText) + points
    } else {
        pointsCounter.innerText = parseInt(pointsCounter.innerText) - points
    }
}