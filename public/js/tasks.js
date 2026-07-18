let currentTaskId = null;


// ==========================
// Открытие задачи
// ==========================

document
    .querySelectorAll(".task-card")
    .forEach(card => {


        card.addEventListener("click", async () => {


            currentTaskId = card.dataset.taskId;


            const response = await fetch(
                `/tasks/${currentTaskId}`
            );


            const task = await response.json();


            console.log("Получена задача:", task);


            fillTaskModal(task);


            openTaskModal();


        });


    });



// ==========================
// Заполнение модалки
// ==========================

function fillTaskModal(task) {


    document.getElementById(
        "view-task-title"
    ).value = task.title;


    document.getElementById(
        "view-task-description"
    ).value =
        task.description || "";


    document.getElementById(
        "view-task-status"
    ).value =
        task.status;


    document.getElementById(
        "view-task-date"
    ).value =
        task.start_date || "";


    document.getElementById(
        "due-date"
    ).value =
        task.due_date || "";


    document.querySelector(
        'input[name="all_day"]'
    ).checked =
        Boolean(task.all_day);



}



// ==========================
// Открытие модального окна
// ==========================

function openTaskModal() {


    const modal =
        document.getElementById(
            "taskViewModal"
        );


    modal.classList.add(
        "active"
    );


}




// ==========================
// Сохранение задачи
// ==========================


const form = document.getElementById(
    "task-view-form"
);



if (form) {


    form.addEventListener(
        "submit",
        async (event) => {


            event.preventDefault();


            const formData =
                new FormData(form);



            const data =
                Object.fromEntries(
                    formData
                );



            const response =
                await fetch(
                    `/tasks/${currentTaskId}`,
                    {

                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(data)

                    }
                );



            const result =
                await response.json();

            if (result.success) {

                window.location.reload();

            }




        }
    );


}