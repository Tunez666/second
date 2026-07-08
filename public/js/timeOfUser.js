const hour = new Date().getHours();
let timeOfDay;

if (hour >= 6 && hour < 12) {
    timeOfDay = "Отличное утро";
} else if (hour >= 12 && hour < 18) {
    timeOfDay = "Отличный день";
} else if (hour >= 18 && hour < 24) {
    timeOfDay = "Отличный вечер";
} else {
    timeOfDay = "Отличная ночь";
}

document.getElementById("time-display").textContent = timeOfDay;
