function formatDate(date){

    if(!date){
        return "";
    }


    return new Date(date)
        .toLocaleDateString(
            "ru-RU",
            {
                day:"numeric",
                month:"long",
                year:"numeric"
            }
        );

}


module.exports = {
    formatDate
};