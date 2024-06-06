// add a new task
function addTask() {
    const input = document.getElementById('taskInput');
    const task = input.value.trim();
    if (task !== '') {
        const list = document.getElementById('taskList');
        const listItem = document.createElement('li');
        listItem.classList.add('flex', 'items-center', 'p-2', 'rounded-md', 'shadow-sm');
        listItem.innerHTML = `
            <span class="checkmark grey-200" onclick="toggleDone(this)">
                <i class="far fa-circle"></i>
            </span>
            <span class="ml-2 flex-1">${task}</span>
            <span class="cursor-pointer text-black-300 ml-2" onclick="removeTask(this)">
                <i class="far fa-trash-alt"></i>
            </span>
        `;
        list.appendChild(listItem);
        input.value = '';
        saveTasks(); // Save tasks
        hideAlert(); // Hide alert 
    } else {
        showAlert(); // Show alertwheninput is empty
    }
}

// sshow alert
function showAlert() {
    const alert = document.getElementById('alert');
    alert.classList.remove('hidden');
    alert.classList.add('block');
    setTimeout(hideAlert, 3000); // hide alert after 3 seconds code......
}

//  hide alert!!!!!!!!
function hideAlert() {
    const alert = document.getElementById('alert');
    alert.classList.remove('block');
    alert.classList.add('hidden');
}

//  toggle task done !!!!!! OMG
function toggleDone(element) {
    const listItem = element.parentNode;
    const taskSpan = listItem.querySelector('.ml-2');
    const icon = element.querySelector('i');
    taskSpan.classList.toggle('done');
    if (icon.classList.contains('fa-circle')) {
        icon.classList.remove('fa-circle');
        icon.classList.add('fa-check-circle', 'text-green-500');
    } else {
        icon.classList.remove('fa-check-circle', 'text-green-500');
        icon.classList.add('fa-circle');
    }
    saveTasks(); // Save tasks local storage !!!!HEHEHEHE
}

//  remove a task!!!! Dorkar nai toke
function removeTask(element) {
    const listItem = element.parentNode;
    listItem.remove();
    saveTasks(); //
}

// clear all tasks!! Hor hin thika
function clearAllTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    saveTasks(); 
}

// save tasks to local storage! joma thako
function saveTasks() {
    const tasks = [];
    const listItems = document.querySelectorAll('#taskList li');
    listItems.forEach(item => {
        const taskSpan = item.querySelector('.ml-2');
        const icon = item.querySelector('.checkmark i');
        const done = taskSpan.classList.contains('done');
        const iconClass = icon.classList.contains('fa-check-circle') ? 'fa-check-circle text-green-500' : 'fa-circle';
        tasks.push({
            text: taskSpan.innerText.trim(),
            done: done,
            iconClass: iconClass
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//  load tasks from local storage!! Kamal
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const list = document.getElementById('taskList');
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.classList.add('flex', 'items-center', 'bg-gray-100', 'p-2', 'rounded-md', 'shadow-sm');
        listItem.innerHTML = `
            <span class="checkmark" onclick="toggleDone(this)">
                <i class="far ${task.iconClass}"></i>
            </span>
            <span class="ml-2 flex-1 ${task.done ? 'done' : ''}">${task.text}</span>
            <span class="cursor-pointer text-black-500 ml-2" onclick="removeTask(this)">
                <i class="far fa-trash-alt"></i>
            </span>
        `;
        list.appendChild(listItem);
    });
}

// Load tasks when the page loads! PRO
window.onload = function() {
    loadTasks();
};
