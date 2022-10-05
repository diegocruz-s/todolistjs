import ActionsTasks, { tasks } from './funcTasks/actionsTasks.js';
const $btnsAddTask = document.querySelectorAll('.addTask');
const $divForm = document.querySelector('.divForm');
const $formTask = document.querySelector('.addTaskForm');

class MainClass {

    constructor(){
        this.block = null;
    }

    eventAddTask(){
        $btnsAddTask.forEach((addTask) => {
            addTask.addEventListener('click', (e)=>{
                if(e.target.classList.contains('btnProgress')){
                    this.block = 'progress'
                }else if (e.target.classList.contains('btnDone')){
                    this.block = 'done'
                }else {
                    this.block = 'default'
                }
                $divForm.classList.remove('hideForm')
            })
            $divForm.addEventListener('click', (e)=>{
                if(e.target.classList.contains('divForm')){
                    $divForm.classList.add('hideForm');
                }
            })
        })
        

        $formTask.addEventListener('submit', (e)=>{
            e.preventDefault();
            ActionsTasks.createTask(this.block);
            $divForm.classList.add('hideForm')
        })
    }
    
}

onload = ()=>{
    ActionsTasks.render();
}

const newMain = new MainClass();

newMain.eventAddTask();

