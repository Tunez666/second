const statuses = {
    todo: {
        label: "Не начато",
        icon: "○"
    },

    in_progress: {
        label: "В процессе",
        icon: "◐"
    },

    done: {
        label: "Завершено",
        icon: "✓"
    }
};


function formatTaskStatus(status){

    return statuses[status] || {
        label: "Неизвестно",
        icon: "?"
    };

}


module.exports = {
    formatTaskStatus
};