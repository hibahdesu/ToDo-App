let tasks = [
    {
        "title": "Complete the task",
        "date": "2023-10-01",
        "description": "Finish the assigned task by the end of the day.",
        "finished": false
    },
    {
        "title": "Complete the task",
        "date": "2023-10-01",
        "description": "Finish the assigned task by the end of the day.",
        "finished": false
    },
    {
        "title": "Complete the task",
        "date": "2023-10-01",
        "description": "Finish the assigned task by the end of the day.",
        "finished": false
    },
];


let tasksContainer = document.querySelector('.tasks-container');
let addBtn = document.querySelector('.addBtn');
let mainContainer = document.querySelector('.container');
let closeBtn = document.querySelector('.close-btn');
let addContainer = document.querySelector('.add-container');
let taskName = document.querySelector('#taskName');
let taskDesc = document.querySelector('#taskDesc');
let taskDate = document.querySelector('#taskDate');
let taskBtn = document.querySelector('.task-btn');


console.log(taskName.value);

addBtn.addEventListener('click', () => {
    addContainer.classList.remove('hidden');
    mainContainer.classList.add('blurred');
    document.body.classList.add('modal-open');
});

closeBtn.addEventListener('click', () => {
    addContainer.classList.add('hidden');
    mainContainer.classList.remove('blurred');
    document.body.classList.remove('modal-open');
});

taskBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let taskTitle = taskName.value.trim();
    let description = taskDesc.value.trim();
    let date = taskDate.value;

    if (taskTitle && description && date) {
        tasks.push({
            title: taskTitle,
            description: description,
            date: date,
            finished: false
        })

        taskName.value = '';
        taskDesc.value = '';
        taskDate.value = '';
        addContainer.classList.add('hidden');
        mainContainer.classList.remove('blurred');
        document.body.classList.remove('modal-open');
        
        showTasks();

    }
})


function showTasks() {
    tasksContainer.innerHTML = '';
    
    tasksContainer.innerHTML = tasks.map(task => `
    <div class="task flex space-between center gap-m">
                <div class="task-content flex column gap-sm">
                    <h2>${task.title}</h2>
                    <p>${task.description}</p>
                    <div class="date-container flex gap-sm">
                        <span class="material-symbols-outlined">
                            calendar_month
                        </span>
                        <span class="date">${task.date}</span>
                    </div>
                </div>

                <div class="task-actions flex gap-m">
                    <button class="delete btn">
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                    </button>

                    <button class="update btn">
                        <span class="material-symbols-outlined">
                            edit
                        </span>
                    </button>

                    <button class="done btn">
                        <span class="material-symbols-outlined">
                            check
                        </span>
                    </button>
                </div>
            </div>
    `).join('');
    
}
// tasksContainer.innerHTML = '';

showTasks();

