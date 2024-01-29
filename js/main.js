//part1..................
function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert(" your browser is not support geolocation .");
    }
  }
  
  // Show latitude and longitude
  function showPosition(position) {
    const location = document.getElementById("location");
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    location.innerHTML = `Latitude: ${latitude}, Longitude: ${longitude}`;
  }
  //part2.............
  
  let tasks = {
    todo: [],
    progress: [],
    done: []
  };
  
  function displayTasks() {
    const todoList = document.getElementById('todoList');
    const progressList = document.getElementById('progressList');
    const doneList = document.getElementById('doneList');
  
    todoList.innerHTML = '<h2>Todo</h2>' + tasks.todo.map(task => createTaskElement(task)).join('');
    progressList.innerHTML = '<h2>Progress</h2>' + tasks.progress.map(task => createTaskElement(task)).join('');
    doneList.innerHTML = '<h2>Done</h2>' + tasks.done.map(task => createTaskElement(task)).join('');
  
    // addEventListeners();
  }
  
  function createTaskElement(task) {
    return `<div class="task" draggable="true" ondragstart="drag(event)">${task}</div>`;
  }
  
  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (task !== '') {
      tasks.todo.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      taskInput.value = '';
      displayTasks();
    }
  }
  
  // function addEventListeners() {
  //   const tasksElements = document.querySelectorAll('.task');
  //   tasksElements.forEach(task => {
  //     task.addEventListener('dragstart', drag);
  //   });
  // }
  
  function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.innerText);
  }
  
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  
function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData('text');
  const status = ev.target.id.replace('List', '');

  // Remove the task from its previous status list if it exists there
  Object.keys(tasks).forEach(key => {
    const index = tasks[key].indexOf(data);
    if (index !== -1) {
      tasks[key].splice(index, 1);
    }
  });

  tasks[status].push(data);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
}
  function clearList() {
    tasks = { todo: [], progress: [], done: [] };
    localStorage.removeItem('tasks');
    displayTasks();
  }
  
  // Retrieve tasks from local storage on page load
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    displayTasks();
  }
  
  

