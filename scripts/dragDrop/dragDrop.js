import { tasks } from '../funcTasks/actionsTasks.js';

class EventsDragDrop {

    eventTasks(){
        const cards = document.querySelectorAll('.task');
        const noteBlocks = document.querySelectorAll('.contentTask');

        cards.forEach((card) => {
            card.addEventListener('dragstart', dragstart);
            card.addEventListener('dragend', dragend);
        })

        noteBlocks.forEach((noteBlock) => {
            noteBlock.addEventListener('dragover', dragover);
        })

    }

}

let elementDrag;
function dragstart(){
    elementDrag = this;
    this.classList.add('opacityCard');
}
function dragend(){
    elementDrag = null;
    this.classList.remove('opacityCard');
}

function dragover(){
    this.appendChild(elementDrag);

    if(this.classList.contains('blockProgress')){
        tasks.map(task => {
            if(task.id === Number(elementDrag.id)){
                task.blockDefault = false;
                task.blockProgress = true;
                task.blockDone = false;
            }
        })
        localStorage.setItem('allTasks', JSON.stringify(tasks))
    }else if(this.classList.contains('blockDone')){
        tasks.map(task => {
            if(task.id === Number(elementDrag.id)){
                task.blockDefault = false;
                task.blockProgress = false;
                task.blockDone = true;
            }
        })
        localStorage.setItem('allTasks', JSON.stringify(tasks))
    }else if(this.classList.contains('blockDefault')){
        tasks.map(task => {
            if(task.id === Number(elementDrag.id)){
                task.blockDefault = true;
                task.blockProgress = false;
                task.blockDone = false;
            }
        })
        localStorage.setItem('allTasks', JSON.stringify(tasks))
    }
}

export default new EventsDragDrop();
