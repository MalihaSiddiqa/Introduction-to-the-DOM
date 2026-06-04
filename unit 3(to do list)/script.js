//selecting elements
const taskInput=document.querySelector('.text');
const addTaskBtn=document.querySelector('.btn');
const taskList=document.querySelector('ul');
const taskCounter=document.querySelector("#count");

const filterAllBtn=document.querySelector("[data-filter="all"]");
const filterActiveBtn=document.querySelector("[data-filter="active"]");
const filterCompletedBtn=document.querySelector("[data-filter="completed"]");


 let tasks=[];
let currentFilter="all";
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTasks();
    showTasks();
}
function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    showTasks();
}
 addTaskBtn.addEventListener("click",()=>{
     const taskText=taskInput.value.trim();
     if (taskText === "") return; 
     const newTask={
        id: Date.now(),
        text:taskText,
        completed:false
     };
        tasks.push(newTask);
        saveTasks();
        taskInput.value="";
        showTasks();
     });
 
//showTasks
 function showTasks() {
    taskList.innerHTML="";
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    if (filteredTasks.length === 0) {
        taskList.innerHTML = "<li>Your to-do list is empty</li>";
        updateCounter();
        return;
    }
    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
     checkbox.addEventListener("change",()=>{
      toogleTask(task.id);
     });
 
    const span=document.createElement("span");
    span.textContent=task.text;
    if (task.completed){
        li.classList.add('completed');
    }
    const delbtn=document.createElement("button");
    delbtn.textContent="*";
    delbtn.classList.add('delbtn');
    delbtn.addEventListener("click",()=>{
      tasks=tasks.filter(item => item.id !== task.id);
      saveTasks();
      showTasks();
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delbtn);
    taskList.appendChild(li);
});
 
updateCounter();
 }
taskInput.addEventListener('keypress',(event) =>{
    if (event.key === 'enter'){
        addTaskBtn.click();
    }
});
 
function updateCounter(){
const activeTasks=tasks.filter(task => !task.completed).length;
taskCounter.textContent=`${activeTasks} tasks left`;
}
function saveTasks(){
    localStorage.setItem('myTodoList',JSON.stringify(tasks));
}
function loadTasks(){
    const backup = localStorage.getItem('myTodoList');
    if(backup){
        tasks=JSON.parse(backup);
    }

    showTasks();
}
if (filterAllBtn){
 filterAllBtn.addEvenetListener("click",()=>{
  currentFilter="active";
  showTasks();
 });
}

if (filterActiveBtn){
 filterActiveBtn.addEvenetListener("click",()=>{
  currentFilter="active";
  showTasks();
 });
}

if (filterCompletedBtn){
 filterCommpletedBtn.addEvenetListener("click",()=>{
  currentFilter="active";
  showTasks();
 });
}
document.addEventListener('DOMContentLoaded',loadTasks);


 
