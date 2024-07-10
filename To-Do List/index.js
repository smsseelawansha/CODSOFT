document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const timeInput = document.getElementById('time-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    loadTasks();

    addTaskButton.addEventListener('click', () => {
        addTask(taskInput.value, timeInput.value);
        taskInput.value = '';
        timeInput.value = '';
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const taskItem = e.target.closest('li');
            if (e.target.textContent === 'Delete') {
                deleteTask(taskItem);
            } else if (e.target.textContent === 'Edit') {
                editTask(taskItem);
            }
        } else if (e.target.type === 'checkbox') {
            toggleCompleteTask(e.target);
        }
    });

    function addTask(taskText, taskTime) {
        if (taskText.trim() === '' || taskTime.trim() === '') return;

        const taskItem = createTaskElement(taskText, taskTime, false);

        taskList.appendChild(taskItem);
        saveTasks();
    }

    function createTaskElement(taskText, taskTime, completed) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task';

        const formattedTime = new Date(taskTime).toLocaleString();

        taskItem.innerHTML = `
            <input type="checkbox" ${completed ? 'checked' : ''}>
            <span style="text-decoration: ${completed ? 'line-through' : 'none'}">${taskText}</span>
            <time>${formattedTime}</time>
            <div class="actions">
                <button>Edit</button>
                <button>Delete</button>
            </div>
        `;

        return taskItem;
    }

    function deleteTask(taskItem) {
        taskList.removeChild(taskItem);
        saveTasks();
    }

    function editTask(taskItem) {
        const taskText = taskItem.querySelector('span').textContent;
        const taskTime = new Date(taskItem.querySelector('time').textContent).toISOString().slice(0, 16);
        const newTaskText = prompt('Edit task:', taskText);
        const newTaskTime = prompt('Edit time (YYYY-MM-DDTHH:MM):', taskTime);
        if (newTaskText !== null && newTaskText.trim() !== '' && newTaskTime !== null && !isNaN(new Date(newTaskTime))) {
            taskItem.querySelector('span').textContent = newTaskText;
            taskItem.querySelector('time').textContent = new Date(newTaskTime).toLocaleString();
            saveTasks();
        }
    }

    function toggleCompleteTask(checkbox) {
        const taskItem = checkbox.closest('li');
        if (checkbox.checked) {
            taskItem.querySelector('span').style.textDecoration = 'line-through';
        } else {
            taskItem.querySelector('span').style.textDecoration = 'none';
        }
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('.task').forEach(task => {
            tasks.push({
                text: task.querySelector('span').textContent,
                time: task.querySelector('time').textContent,
                completed: task.querySelector('input[type="checkbox"]').checked
            });
        });
        tasks.sort((a, b) => new Date(a.time) - new Date(b.time));
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks(tasks);
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.sort((a, b) => new Date(a.time) - new Date(b.time));
        renderTasks(tasks);
    }

    function renderTasks(tasks) {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = createTaskElement(task.text, task.time, task.completed);
            taskList.appendChild(taskItem);
        });
    }
});
