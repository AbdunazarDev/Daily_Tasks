const addTasks = document.querySelector(".add-tasks");
const formInput = document.querySelector(".form-input");
const newTasks = document.querySelector(".new-tasks");

let tasks
!localStorage.tasks
  ? (tasks = [])
  : (tasks = JSON.parse(localStorage.getItem("tasks")));

let todoItem

function Task(description) {
  this.description = description, 
	this.completed = false
}

//
const createTemplate = (task, index) => {
  return `
	<div class="card inline todo-item ${task.completed ? 'checked' : ''}">
		<span>${task.description}</span>
		<div class="todo-action">
			<label class="checkmark">
				<input type="checkbox" ${task.completed ? 'checked':''} onclick="completeTask(${index})"/>
				<span class="check"></span>
			</label>
			<button class="btn danger delete" onclick="deleteTask(${index})">Delete</button>
		</div>
	</div>
	`
}

//
const fullHTML = () => {
  newTasks.innerHTML = ''
  tasks.forEach((task, index) => {
		newTasks.innerHTML += createTemplate(task, index)
	})
	todoItem = document.querySelectorAll('.todoItem')
}
fullHTML()

//
function updateStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

//
const completeTask = (index) => {
	tasks[index].completed = !tasks[index].completed
	if (tasks[index].completed) {
		todoItem[index].classList.add('checked')
	} else {
		todoItem[index].classList.remove('checked')
	}
	updateStorage();
	fullHTML()
}

//
addTasks.addEventListener("click", () => {
  tasks.push(new Task(formInput.value)); // new yangi obyekt yaratadi
  updateStorage();
	fullHTML()
	formInput.value = ''
})

// task larni o'chirish
const deleteTask = (index) => {
	
	setTimeout(() => {
		tasks.splice(index, 1) // index raqami bo'yicha 1ta o'chiradi
		updateStorage()
		fullHTML()
	}, 1000)
	
}