const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const addTaskList = document.querySelector('.collection');
const clearAllTask = document.querySelector('.clear-tasks');
const filterTask = document.querySelector('#filter');


addeventlistner()
function addeventlistner(){
    document.addEventListener('DOMContentLoaded',getTaskFromLs);
    form.addEventListener('submit',addtask);
    addTaskList.addEventListener('click',removeTask);
    clearAllTask.addEventListener('click',clearTask);
    filterTask.addEventListener('keyup',searchTask);
}

function addtask(e){
    if(taskInput.value === ''){
        alert('Please add Task');
    }
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const remBtn = document.createElement('a');
    remBtn.className = 'delete-item secondary-content';
    remBtn.innerHTML = '<i class="fa fa-trash"></i>';
    li.appendChild(remBtn);

    addTaskList.appendChild(li);

    addTaskToLs(taskInput.value);

    taskInput.value = '';


    e.preventDefault();
}

function removeTask(e){
    
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();
        removeTaskfromLS(e.target.parentElement.parentElement.textContent);
    }
}

function clearTask(e){
    addTaskList.innerHTML = '';
    localStorage.removeItem('tasks');
}

function searchTask(e){
    // console.log(e);
    const filtertext = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            // console.log(task);
            const itemValue = task.firstChild.textContent;
            if( itemValue.toLowerCase().indexOf(filtertext) != -1){
                task.style.display = 'block';
            }else{
                task.style.display = 'none';
            }

        });
    
}

function addTaskToLs(task){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks =  JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function getTaskFromLs(){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks =  JSON.parse(localStorage.getItem("tasks"));
        // console.log(tasks);
        tasks.forEach(function(task){
            // console.log(task);
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.appendChild(document.createTextNode(task));
            const remBtn = document.createElement('a');
            remBtn.className = 'delete-item secondary-content';
            remBtn.innerHTML = '<i class="fa fa-trash"></i>';
            li.appendChild(remBtn);
            addTaskList.appendChild(li);

        });
    }

}

function removeTaskfromLS(textVal,index){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks =  JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task){
        // console.log(task);
        if(task === textVal){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));

}