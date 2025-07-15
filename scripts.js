let tasks = [
    {
        "title": "Complete the task",
        "date": "2023-10-01",
        "description": "Finish the assigned task by the end of the day.",
        "finished": false
    },
    {
        "title": "Task 2",
        "date": "2023-10-01",
        "description": "Finish the assigned task by the end of the day.",
        "finished": false
    },
    {
        "title": "Task 3",
        "date": "2023-10-01",
        "description": "Finish the assigned task by the end of the day.",
        "finished": false
    },
];


let tasksContainer = document.querySelector('.tasks-container');
let addBtn = document.querySelector('.addBtn');
let mainContainer = document.querySelector('.container');

// Add Part
let closeBtn = document.querySelector('.close-btn');
let addContainer = document.querySelector('.add-container');
let taskName = document.querySelector('#taskName');
let taskDesc = document.querySelector('#taskDesc');
let taskDate = document.querySelector('#taskDate');
let taskBtn = document.querySelector('.task-btn');

// Delete Part
let deleteContainer = document.querySelector('.delete-container');
let deleteButton = document.querySelector('.delete-btn');
let cancleBtn = document.querySelector('.cancle-btn');
let deleteConfirmation = document.querySelector('.delete-confirmation');

// Edit Part
let editContainer = document.querySelector('.edit-container');
let closeEditBtn = document.querySelector('.close-edit-btn');
let editForm = document.querySelector('#editForm');
let editTaskName = document.querySelector('#editTaskName');
let editTaskDesc = document.querySelector('#editTaskDesc');
let editTaskDate = document.querySelector('#editTaskDate');
let editBtn = document.querySelector('.edit-btn');




// console.log(deleteBtn);

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

let currentTaskIndex = null;

function showTasks() {
    tasksContainer.innerHTML = tasks.map((task, index) => `
        <div class="task flex space-between center gap-m">
            <div class="task-content flex column gap-sm">
                <h2>${task.title}</h2>
                <p>${task.description}</p>
                <div class="date-container flex gap-sm">
                    <span class="material-symbols-outlined">calendar_month</span>
                    <span class="date">${task.date}</span>
                </div>
            </div>

            <div class="task-actions flex gap-m">
                <button class="delete btn" data-index="${index}">
                    <span class="material-symbols-outlined">delete</span>
                </button>

                <button class="update btn" data-index="${index}">
                    <span class="material-symbols-outlined">edit</span>
                </button>

                <button class="done btn" data-index="${index}">
                    <span class="material-symbols-outlined">check</span>
                </button>
            </div>
        </div>
    `).join('');

    const deleteBtns = document.querySelectorAll('.delete');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const button = e.currentTarget;
            currentTaskIndex = button.getAttribute('data-index');
            const task = tasks[currentTaskIndex];

            deleteConfirmation.innerHTML = `Are you sure you want to delete "${task.title}"?`;

            deleteContainer.classList.remove('hidden');
            mainContainer.classList.add('blurred');
            document.body.classList.add('modal-open');
        });
    });

    const updateBtns = document.querySelectorAll('.update');
    updateBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const button = e.currentTarget;
            currentTaskIndex = button.getAttribute('data-index');
            const task = tasks[currentTaskIndex];

            // Pre-fill the edit form
            editTaskName.value = task.title;
            editTaskDesc.value = task.description;
            editTaskDate.value = task.date;

            // Show modal
            editContainer.classList.remove('hidden');
            mainContainer.classList.add('blurred');
            document.body.classList.add('modal-open');
        });
    });

}


function deleteTask(index) {
    tasks.splice(index, 1);
    showTasks();
}

// Confirm delete
deleteButton.addEventListener('click', () => {
    if (currentTaskIndex !== null) {
        deleteTask(currentTaskIndex);
        currentTaskIndex = null;
        deleteContainer.classList.add('hidden');
        mainContainer.classList.remove('blurred');
        document.body.classList.remove('modal-open');
    }
});

// Cancel delete
cancleBtn.addEventListener('click', () => {
    deleteContainer.classList.add('hidden');
    mainContainer.classList.remove('blurred');
    document.body.classList.remove('modal-open');
});


editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (currentTaskIndex !== null) {
        tasks[currentTaskIndex] = {
            ...tasks[currentTaskIndex],
            title: editTaskName.value.trim(),
            description: editTaskDesc.value.trim(),
            date: editTaskDate.value
        };

        showTasks();
        editContainer.classList.add('hidden');
        mainContainer.classList.remove('blurred');
        document.body.classList.remove('modal-open');
        currentTaskIndex = null;
    }
});

closeEditBtn.addEventListener('click', () => {
    editContainer.classList.add('hidden');
    mainContainer.classList.remove('blurred');
    document.body.classList.remove('modal-open');
    currentTaskIndex = null;
});


showTasks();
