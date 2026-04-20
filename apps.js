let tasks = [] // empty array to store tasks

document.getElementById('addTaskBtn').addEventListener('click', function() {
//Get the value from Input field
let taskInput = document.getElementById('taskInput').value
//Check if input is empty 
if(taskInput){ 
//Add new task to task array
tasks.push(taskInput)
// clear the input field 
document.getElementById('taskInput').value = ''
//update the task list Display
displayTasks()
}
}

function displayTasks() {
//select the task list element
let taskList = document.getElementById('taskList')
//clear the current list
taskList.innerHTML = ''
//loop through tasks and create list items for each task 
tasks.forEach((task, index)=>{

tasks.forEach((task, index)=>{
    //create <li> element for each task
    let li = document.createElement('li')
    //add styling
    li.classList.add(
        'list-group-item',
        'd-flex',
        'justify-content-between',
        'align-items-center'        
    )
//set the innerHTML of the task list with a task and remove btn 
li.innerHTML =`${task} <button class="btn btn-success btn-sm" onclick="removeTask(${index})"> ✓ </button>`   
//Append the new task list to the HTML
taskList.appendChild(li)

})
}
