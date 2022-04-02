var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");


var taskFormHandler = function(){
    event.preventDefault();
    
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    var taskNameInput = document.querySelector("input[name='task-name']").value;

    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput

    };
    // call create function with the new object
    createTaskEl(taskDataObj);
    
    
};

var createTaskEl = function(taskDataObj){
    //create <li> for html
    var listItemEl = document.createElement("li");
    // add <li class ="task-item">
    listItemEl.className = "task-item";

    //Creat a <div> element
    var taskInfoEl = document.createElement("div");
    //make the <div class = "task-info">
    taskInfoEl.className = "task-info";
    //add HTML content to div  <div class = "task-info"><h3 class = 'class-name'> Input type </3><span class='task-type'> type selected
    taskInfoEl.innerHTML = "<h3 class='class-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    // <li class ="task-item">//add HTML content to div  <div class = "task-info"><h3 class = 'class-name'> Input type </3><span class='task-type'> type selected</span></div></li>
    listItemEl.appendChild(taskInfoEl);

    //add entire list item to list 
    tasksToDoEl.appendChild(listItemEl);

}
formEl.addEventListener("submit", taskFormHandler);
 