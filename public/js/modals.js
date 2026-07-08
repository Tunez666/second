// Все кнопки открытия
const openButtons = document.querySelectorAll("[data-modal]");

// Все кнопки закрытия
const closeButtons = document.querySelectorAll("[data-close-modal]");

// =====================
// Открытие
// =====================

openButtons.forEach(button => {

    button.addEventListener("click", () => {

        const modalId = button.dataset.modal;

            console.log(modalId);

        const modal = document.getElementById(modalId);

        modal.classList.add("active");

    });

});

// =====================
// Закрытие
// =====================

closeButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.closest(".modal-overlay")
              .classList.remove("active");

    });

});

const overlays = document.querySelectorAll(".modal-overlay");

overlays.forEach(overlay => {

    overlay.addEventListener("click", (e) => {

        if (e.target === overlay) {

            overlay.classList.remove("active");

        }

    });

});

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        document
            .querySelectorAll(".modal-overlay.active")
            .forEach(modal => {

                modal.classList.remove("active");

            });

    }

});