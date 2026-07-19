const filterButtons =
document.querySelectorAll(".filter-btn");


const tasks =
document.querySelectorAll(".task-card");



filterButtons.forEach(button=>{


button.addEventListener(
"click",
()=>{


const filter =
button.dataset.filter;



filterButtons.forEach(btn=>{

btn.classList.remove("active");

});


button.classList.add("active");



tasks.forEach(task=>{


const status =
task.dataset.status;



if(filter==="all" || status===filter){

    task.style.display="block";

}
else{

    task.style.display="none";

}


});


});


});