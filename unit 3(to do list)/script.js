//selecting elements
const taskInput=document.querySelector('.text');
const addTaskBtn=document.querySelector('.btn');
const taskList=document.querySelector('ul');
const taskCounter=document.querySelector("#count");

 let tasks=[];
 addTaskBtn.addEventListener("click",()=>{
     const taskText=taskInput.value.trim();
     if (taskText === "") return; 
     const newTask={
        id: Date.now(),
        text:taskText,
        completed:false
     };
        tasks.push(newTask);
        taskInput.value="";
        showTasks();
     });
 
//showTasks
 function showTasks() {
    taskList.innerHTML="";
    if (tasks.length === 0) {
    taskList.innerHTML ="<li>Your to-do list is empty</li>";
    updateCounter();
    return;
    }
tasks.forEach(task => {
    const li=document.createElement("li");
    const checkbox=document.createElement("input");
    checkbox.type="checkbox";
    checkbox.checked="task.completed";
    checkbox.addEventListener("change",()=>{
        task.completed =checkbox.checked;
        saveTasks();
        showTasks();
    });
    const span=document.createElement("span");
    span.textContent=task.text;
    if (task.completed){
        li.classList.add('completed');
    }
    const delbtn=document.createElement("button");
    delbtn.textcontent="*";
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
taskInput.addEventListener('keypress',(event) =>{
    if (event.key === 'enter'){
        addTaskBtn.click();
    }
});
 }
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
document.addEventListener('DOMContentLoaded',loadTasks);


 
