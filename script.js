document.addEventListener('DOMContentLoaded', () => {
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let tasks = [];

taskForm.addEventListener('submit', (e) => {
e.preventDefault();
const taskText = taskInput.value.trim();

if (taskText) {
const task = {
id: Date.now(),
text: taskText,
completed: false
};
tasks.push(task);
taskInput.value = '';
renderTasks();
}
});
function renderTasks(filter = 'all') {
taskList.innerHTML = '';

const filteredTasks = tasks.filter(task => {
if (filter === 'completed') return task.completed;
if (filter === 'incomplete') return !task.completed;
return true;
});

filteredTasks.forEach(task => {
const li = document.createElement('li');
li.className = task.completed ? 'completed' : '';
li.dataset.id = task.id;
li.innerHTML = `
<span>${task.text}</span>
<div>
    <button class="completeBtn">${task.completed ? 'Undo' : 'Complete'}</button>
    <button class="deleteBtn">Delete</button>
</div>
`;
li.querySelector('.completeBtn').addEventListener('click', () => toggleTask(task.id));

li.querySelector('.deleteBtn').addEventListener('click', () => deleteTask(task.id));

taskList.appendChild(li);
});
}


function toggleTask(id) {
tasks = tasks.map(task => 
task.id === id ? { ...task, completed: !task.completed } : task
);
renderTasks();
}
function deleteTask(id) {
tasks = tasks.filter(task => task.id !== id);
renderTasks();
}
document.getElementById('allTasks').addEventListener('click', () => renderTasks('all'));
document.getElementById('completedTasks').addEventListener('click', () => renderTasks('completed'));
document.getElementById('incompleteTasks').addEventListener('click', () => renderTasks('incomplete'));

renderTasks(); 
});
