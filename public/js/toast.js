const toast = {

    show(type, message, duration = 4000) {

        const container = document.getElementById("toast-container");

        const element = document.createElement("div");

        element.className = `toast toast--${type}`;

        element.innerHTML = `
            <div class="toast__content">

                <div class="toast__message">
                    ${message}
                </div>

                <button class="toast__close">
                    ×
                </button>

            </div>
        `;

        container.appendChild(element);

        requestAnimationFrame(() => {
            element.classList.add("toast--show");
        });

        const remove = () => {

            element.classList.remove("toast--show");

            setTimeout(() => {

                element.remove();

            },300);

        };

        element
            .querySelector(".toast__close")
            .addEventListener("click", remove);

        setTimeout(remove,duration);

    },

    success(message){
        this.show("success",message);
    },

    error(message){
        this.show("error",message);
    },

    warn(message){
        this.show("warn",message);
    },

    info(message){
        this.show("info",message);
    }

};

window.toast = toast;