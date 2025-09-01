let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

window.onload = () => {
  renderTasks();
};

function addTask(taskText = null) {
  const input = document.getElementById('taskInput');
  const task = taskText || input.value.trim();
  if (task === '') return;

  taskList.push({ text: task, completed: false });
  input.value = '';
  updateStorage();
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  taskList.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function toggleTask(index) {
  taskList[index].completed = !taskList[index].completed;
  updateStorage();
  renderTasks();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  updateStorage();
  renderTasks();
}

function updateStorage() {
  localStorage.setItem('tasks', JSON.stringify(taskList));
}

// 🎙️ Voice Recognition
function startListening() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Your browser doesn't support Speech Recognition");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = function(event) {
    const speechResult = event.results[0][0].transcript;
    addTask(speechResult);
  };

  recognition.onerror = function(event) {
    alert('Error occurred in recognition: ' + event.error);
  };
}
