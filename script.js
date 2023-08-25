const taskInput = document.getElementById('taskInput');
const taskTimeInput = document.getElementById('taskTime');
const timeFormatSelect = document.getElementById('timeFormat');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

addButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const taskTime = taskTimeInput.value;
  const timeFormat = timeFormatSelect.value;

  if (taskText !== '') {
    const taskItem = createTaskItem(taskText, taskTime, timeFormat);
    taskList.appendChild(taskItem);
    taskInput.value = '';
    taskTimeInput.value = '';
  }
});

taskList.addEventListener('click', (event) => {
  const taskItem = event.target.closest('.task');

  if (event.target.classList.contains('delete-button')) {
    taskList.removeChild(taskItem);
  } else if (event.target.classList.contains('edit-button')) {
    editTask(taskItem);
  }
});

function createTaskItem(taskText, taskTime, timeFormat) {
  const taskItem = document.createElement('li');
  taskItem.className = 'task';

  const taskTextElement = document.createElement('span');
  taskTextElement.className = 'task-text';
  taskTextElement.textContent = taskText;

  const taskTimeElement = document.createElement('span');
  taskTimeElement.className = 'task-time';
  taskTimeElement.textContent = taskTime + ' ' + timeFormat;

  const editButton = document.createElement('button');
  editButton.className = 'edit-button';
  editButton.textContent = 'Editar';

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.textContent = 'Eliminar';

  taskItem.appendChild(taskTextElement);
  taskItem.appendChild(taskTimeElement);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);

  return taskItem;
}

function editTask(taskItem) {
  const taskTextElement = taskItem.querySelector('.task-text');
  const taskTimeElement = taskItem.querySelector('.task-time');
  const editButton = taskItem.querySelector('.edit-button');
  const deleteButton = taskItem.querySelector('.delete-button');

  const taskText = taskTextElement.textContent;
  const taskTime = taskTimeElement.textContent.split(' ')[0];
  const timeFormat = taskTimeElement.textContent.split(' ')[1];

  taskTextElement.innerHTML = `<input type="text" value="${taskText}">`;
  taskTimeElement.innerHTML = `<input type="time" value="${taskTime}">`;
  timeFormatSelect.value = timeFormat;

  editButton.textContent = 'Guardar';
  deleteButton.disabled = true;

  editButton.addEventListener('click', () => {
    const newText = taskTextElement.querySelector('input').value;
    const newTime = taskTimeElement.querySelector('input').value;
    const newTimeFormat = timeFormatSelect.value;

    taskTextElement.textContent = newText;
    taskTimeElement.textContent = newTime + ' ' + newTimeFormat;

    editButton.textContent = 'Editar';
    deleteButton.disabled = false;
  });
}