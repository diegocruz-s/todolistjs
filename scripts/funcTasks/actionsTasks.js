export let tasks = JSON.parse(localStorage.getItem('allTasks')) || [];

const $blockDone = document.querySelector('.blockDone');
const $blockProgress = document.querySelector('.blockProgress');
const $blockDefault = document.querySelector('.blockDefault');
import EventsDragDrop from '../dragDrop/dragDrop.js'

class ActionsTasks {

    constructor(){
        this.events = EventsDragDrop.eventTasks;
    }

    randomId(){
        return Math.floor(Math.random() * 1000) + Date.now();
    }

    render(){
        $blockDefault.innerHTML = '';
        $blockProgress.innerHTML = '';
        $blockDone.innerHTML = '';

        tasks.map(task => {
            const newTask = `
                <div id="${task.id}" class="task" draggable="true">

                    <div class="textTask">
                        <p class="pTask">${task.text}</p>
                    </div>

                    <div class="delEditTask">
                        <button id="${task.id}" class="editTask">E</button>
                        <button id="${task.id}" class="deleteTask">X</button>
                    </div>
                    
                </div>
            `;

            if (task.blockDefault){
                $blockDefault.innerHTML += newTask;
            }else if (task.blockProgress){
                $blockProgress.innerHTML += newTask;
            }else if (task.blockDone){
                $blockDone.innerHTML += newTask;
            }

        });
        
        this.addEventBtnEdit();
        this.addEventDeleteEdit();
        localStorage.setItem('allTasks', JSON.stringify(tasks));
        this.events();
    }

    createTask(block){
        console.log(block)
        let textTask = document.querySelector('.taskText');
        if(!textTask.value){
            return
        }

        const objTask = {
            id: this.randomId(),
            text: textTask.value,
            blockDefault: true,
            blockProgress: false,
            blockDone: false
        }

        if(block === 'progress'){
            objTask.blockDefault = false;
            objTask.blockDone = false;
            objTask.blockProgress = true;
        }else if (block === 'done'){
            objTask.blockDefault = false;
            objTask.blockDone = true;
            objTask.blockProgress = false;
        }

        textTask.value = '';

        tasks.push(objTask);

        this.render();
    }

    addEventBtnEdit(){
        const $btnsEditTask = document.querySelectorAll('.editTask');

        $btnsEditTask.forEach((btnEdit) => {
            btnEdit.addEventListener('click', ()=>{
                this.editTask(btnEdit.id);
            })
        })
    }

    editTask(id){
        const newValue = prompt('Novo valor');

        if(newValue === null || newValue.trim() === '') return;

        tasks.map((task)=>{
            if(task.id === Number(id)){
                task.text = newValue
            }
        })

        this.render();

    }

    addEventDeleteEdit(){
        const $btnsDeleteTask = document.querySelectorAll('.deleteTask');

        $btnsDeleteTask.forEach((btnDelete) => {
            btnDelete.addEventListener('click', ()=>{
                this.deleteTask(btnDelete.id);
            })
        })
    }

    deleteTask(id){
        let newTasks = tasks.filter((task) => task.id !== Number(id));
        tasks = newTasks;
        console.log('newTasks', newTasks)
    
        this.render()
    }

}   

export default new ActionsTasks();
