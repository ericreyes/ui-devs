// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// ******* Vars
let tasks = [],
    id = 0;


// *******************************************
const dateElement = document.querySelector('.date');

// Show today's date ***********************
const options = {
    year: "numeric",
    weekday: "long",
    month: "long",
    day: "numeric"
};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);
// *********************************************

// Load all event listeners 
loadEventListeners();

// Load all event listeners 
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks events
    filter.addEventListener('keyup', filterTasks);
    // Check task
    
}

// Get tasks from Local Storage
function getTasks() {
    //let tasks; 
    if (!localStorage.getItem('tasks')){
        tasks =[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        id = tasks.length;
    }

    tasks.forEach(function(task) {
        addTaskToUi(task.text, task.id, task.isDone);

    })
}

// Classes names
const checkClass = "fa-check-circle";
const uncheckClass = "fa-circle-thin";
const lineThroughClass = "lineThrough";

// Add Task
function addTask(e) {
    //const DONE = done ? checkClass : uncheckClass;
    //const LINE = done ? lineThroughClass : "";
    if(taskInput.value === '') {
        alert('Add a task mf!!!');
    } else {
    
        // Create li element
        const li = document.createElement('li');
        
        

        // Create checkbox element
        const checkbox = document.createElement('a');
        
        // Add class to checkbox
        checkbox.className = 'check-item';
        // Add checkbox icon html
       checkbox.innerHTML = `<i class="fa fa-circle-thin co" job="complete"></i>`;
       checkbox.setAttribute("taskId", id);
       checkbox.addEventListener('click', checkTask);
        // Append checkbox to li
        li.appendChild(checkbox);


        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';

        
        

        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
        const newTask = {text: taskInput.value, id: id, isDone: false};
        tasks.push(newTask);// ************************************
        //Elevate id
        id++;

        // Store in Local Storage (LS)
        storeTaskInLocalStorage(newTask);

        // Clear input
        taskInput.value = '';

        //console.log(li);
    }
    
    e.preventDefault();
}

function addTaskToUi(text, id, isDone) {
 
        // Create li element
        const li = document.createElement('li');
        


        // Create checkbox element
        const checkbox = document.createElement('a');
        // Add class to checkbox
        checkbox.className = 'check-item';
        // Add checkbox icon html
        //let isDone;
        const DONE = isDone ? checkClass : uncheckClass;
        //const LINE = isDone ? lineThroughClass : "";
        checkbox.innerHTML = `<i class="fa ${DONE} co" job="complete"></i>`;
        checkbox.setAttribute("taskId", id);
        checkbox.addEventListener('click', checkTask);
        // Append checkbox to li
        li.appendChild(checkbox);


        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(text));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';

        
        

        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
}

// // Complete to do
// function completeToDo(element) {
//     element.classList.toggle(checkClass);
//     element.classList.toggle(uncheckClass);
//     element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

//     LIST[element.id].done = LIST[element.id].done ? false : true;
// }

// Store task
function storeTaskInLocalStorage(task) {
    let tasks; 
    if (!localStorage.getItem('tasks')){
        tasks =[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
        e.target.parentElement.parentElement.remove();
        // Remove from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
    
}

// Check task
function checkTask(e) {
    let tasks;
    if(e.target.parentElement.classList.contains('check-item')) {
        //if(confirm('Are you sure?')) {

            e.target.classList.toggle(checkClass);
            e.target.classList.toggle(uncheckClass);
            //e.parentNode.querySelector(".text").classList.toggle(lineThroughClass);
            console.log(tasks);
            console.log(e);
            console.log("hola");
            tasks[e.taskId].isDone = !tasks[e.taskId].isDone; // Check what you need to change for it to work
            
            //LIST[e.id].isDone = LIST[e.id].isDone ? false : true; // Check what you need to change for it to work
        //e.target.parentElement.parentElement.remove();
        // Remove from Local Storage
        //removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        //}
    }
    
}


// Remove from Local Storage ********************************** WTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
function removeTaskFromLocalStorage(taskItem) {
    let tasks; 
    if (localStorage.getItem('tasks') === null){
        tasks =[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Clear tasks
function clearTasks() {
    //console.log(e.target);
    // taskList.innerHTML = ''; // One way to do it
    
    // Faster
    while (taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from Local Storage
    clearTasksFromLocalStorage();
}

// Clear tasks from Local Storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}
