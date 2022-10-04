import ActionsTasks, { tasks } from './funcTasks/actionsTasks.js';
const $addTask = document.querySelector('.addTask');
const $divForm = document.querySelector('.divForm');
const $formTask = document.querySelector('.addTaskForm');

class MainClass {

    eventAddTask(){
        $addTask.addEventListener('click', ()=>{
            $divForm.classList.remove('hideForm')
        })
        $divForm.addEventListener('click', (e)=>{
            if(e.target.classList.contains('divForm')){
                $divForm.classList.add('hideForm');
            }
        })

        $formTask.addEventListener('submit', (e)=>{
            e.preventDefault();
            ActionsTasks.createTask();
            $divForm.classList.add('hideForm')
        })
    }
    
}

onload = ()=>{
    ActionsTasks.render();
}

const newMain = new MainClass();

newMain.eventAddTask();

