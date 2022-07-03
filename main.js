let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

//Empty Array To Store Tasks
let arrayOfTasks = [];

// check if there is tasks in local storage
if (localStorage.getItem("tasks")) {
	arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage Function
restoreData();

// Add Task
submit.onclick = function () {
	if (input.value !== "") {
		addTask(input.value); // Add Task To Array Of Tasks
		input.value = ""; // Empty Input Field
	}
}

//Click On Task Element
tasksDiv.addEventListener("click", (e) => {

	// Delete Button
	if (e.target.classList.contains("del")) {
		// Remove Task From Local Storage
		deleteTask(e.target.parentElement.getAttribute("data-id"));
		//Remove Element From Page
		e.target.parentElement.remove();
	}

	// Toggle Completed Tasks
	if (e.target.classList.contains("task")) {
		toggleStatus(e.target.getAttribute("data-id"));
		//Toggle Done Class
		e.target.classList.toggle("done");
	}
})

function addTask(taskText) {
	
	// Task Data
	const task = {
		id: Date.now(),
		title: taskText,
		completed: false,
	};
	
	// Push Task To Array Of Tasks
	arrayOfTasks.push(task);
	//Add Tasks To Page
	addElements(arrayOfTasks);
	//Add Tasks To Local Storage
	storeData(arrayOfTasks);
}

function addElements(arrayOfTasks) {
	// Empty Tasks Dic
	tasksDiv.innerHTML = "";
	//Looping On Array Of Tasks
	arrayOfTasks.forEach((task) => {
		//Creating The Main Div
		let div = document.createElement("div");
		div.className = "task";
		//check if the task is done
		if (task.completed === true) {
			div.className = "task done";
		}
		div.setAttribute("data-id", task.id);
		div.appendChild(document.createTextNode(task.title));
		//Creating The Delete Button
		let span = document.createElement("span");
		span.className = "del";
		span.appendChild(document.createTextNode("Delete"));
		div.appendChild(span); // Append Button To The Main Div
		//Add Task Div To Tasks Container
		tasksDiv.appendChild(div);
	});
}

// Handling Storing Data From Local Storage
function storeData(arrayOfTasks) {
	window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
// Handling Restoring Data From Local Storage
function restoreData() {
	let data = window.localStorage.getItem("tasks");
	if (data) {
		let tasks = JSON.parse(data);
		addElements(tasks);
	}
}
// Handling Delete Task
function deleteTask(taskId) {
	arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
	storeData(arrayOfTasks);
}

// Updating The Toggle Status Task
function toggleStatus(taskId) {
	for (let i = 0; i < arrayOfTasks.length; i++) {
		if (arrayOfTasks[i].id == taskId) {
			arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
		}
	}
	storeData(arrayOfTasks);
}