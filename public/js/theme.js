const savedTheme = localStorage.getItem("theme") || "light";

document.documentElement.dataset.theme = savedTheme;

const button = document.getElementById("theme-toggle");

function updateThemeIcon(){

    button.textContent =
        document.documentElement.dataset.theme === "dark"
            ? "☀️"
            : "🌙";

}

updateThemeIcon();

button.addEventListener("click",()=>{

    const next =
        document.documentElement.dataset.theme === "light"
            ? "dark"
            : "light";

    document.documentElement.dataset.theme = next;

    localStorage.setItem("theme",next);

    updateThemeIcon();

});