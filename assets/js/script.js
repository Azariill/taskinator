var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");


var createTaskHandler = function(){
    event.preventDefault();
    
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    
    //create list html
    var listItemEl = document.createElement("li");
    // give class name to li element
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='class-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    console.log(listItemEl);
    listItemEl.appendChild(taskInfoEl);

    //add entire list item to list 
    tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);
 