// Defining UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Variable for the tasks 
let id = 0; 

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

addEventListeners();

function addEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    //clearBtn.addEventListener('click', clearTasks);
    //filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
    let tasksArray;
    if(!localStorage.getItem('tasks')){
        tasksArray = [];
    } else {
        tasksArray = JSON.parse(localStorage.getItem('tasks'));
        id = tasksArray.length;
    }
    tasksArray.forEach(function(task) {
        const li = document.createElement('li');
        //Checkbox
        const checkbox = document.createElement('a');
        checkbox.className = 'check-item';
        checkbox.innerHTML = `<i class="fa fa-circle-thin co" job="complete"></i>`;
        checkbox.setAttribute("taskId", id);
        checkbox.addEventListener('click', checkTask);
        // Append checkbox to li
        li.appendChild(checkbox);
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task.text));
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
    })
}

function addTask() {
    if(!taskInput.value) {
        alert('Add a task mf!!!');
    } else {
        const li = document.createElement('li');
        //Checkbox
        const checkbox = document.createElement('a');
        checkbox.className = 'check-item';
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
        id++;

        // Store in Local Storage (LS)
        storeTaskInLocalStorage(newTask);

        //Clear Input
        taskInput.value = '';

    }
    //e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(newTask) {
    let tasksArray; 
    if (!localStorage.getItem('tasks')){
        tasksArray =[];
    } else {
        tasksArray = JSON.parse(localStorage.getItem('tasks'));
    }

    tasksArray.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

// Remove Task
function removeTask (e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        console.log('just a test for remove task');
        console.log('bunch of code for removing task');
    }
    e.preventDefault();
}

// Check Task
function checkTask (e) {
    if (e.target.parentElement.classList.contains('check-item')) {
        console.log('just a test for check task');
        console.log('bunch of code for checking task');
    }
    e.preventDefault();
}

