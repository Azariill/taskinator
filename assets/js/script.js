

var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#task-completed");


var taskFormHandler = function(){
    event.preventDefault();
    
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var isEdit = formEl.hasAttribute("data-task-id");
    if(!taskNameInput || !taskTypeInput){
        alert("You need to fill out the task form!");
        return false;
    }
    else{
        if(isEdit){
            var taskId = formEl.getAttribute("data-task-id");
            completeEditTask(taskNameInput, taskTypeInput, taskId);
        }
        else{
            //package up data as an object
            var taskDataObj = {
                name: taskNameInput,
                type: taskTypeInput
                }
            formEl.reset();
        // call create function with the new object
        createTaskEl(taskDataObj);}
};
    
};

var createTaskEl = function(taskDataObj){
    //create <li> for html
    var listItemEl = document.createElement("li");
    // add <li class ="task-item">
    listItemEl.className = "task-item";

    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //Creat a <div> element
    var taskInfoEl = document.createElement("div");
    //make the <div class = "task-info">
    taskInfoEl.className = "task-info";
    //add HTML content to div  <div class = "task-info"><h3 class = 'class-name'> Input type </3><span class='task-type'> type selected
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    // <li class ="task-item">//add HTML content to div  <div class = "task-info"><h3 class = 'class-name'> Input type </3><span class='task-type'> type selected</span></div></li>
    listItemEl.appendChild(taskInfoEl);
    
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    //add entire list item to list 
    tasksToDoEl.appendChild(listItemEl);
    
    taskIdCounter++;

}

var createTaskActions = function(taskId){
    // Creates a new div element
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for(var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        statusSelectEl.appendChild(statusOptionEl);



    }

    

    return actionContainerEl;

}

var taskButtonHandler = function(event){
    var targetEl = event.target;


    if(targetEl.matches(".edit-btn")){
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    else if(event.target.matches(".delete-btn")){
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    };

};

var deleteTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']")
    taskSelected.remove();
}

var editTask = function(taskId){
  // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
   

// get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId)
    
}

var completeEditTask = function(taskName, taskType, taskId){
    //find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // sets new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";




};

var taskStatusChangeHandler = function(event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");
  
    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();
  
    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
      } 
      else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
      } 
      else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
      }
  };

pageContentEl.addEventListener("change", taskStatusChangeHandler);
pageContentEl.addEventListener("click", taskButtonHandler);

formEl.addEventListener("submit", taskFormHandler);
 