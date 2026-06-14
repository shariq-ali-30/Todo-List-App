let taskInput = document.getElementById("taskInput")
let addTaskBtn = document.getElementById("addTaskBtn")
let form = document.getElementById("form")
let todoList = document.querySelector(".todo-list")
let message = document.querySelector(".message")
let errorMsg = document.querySelector(".error-message")
let deleteAllBtn = document.getElementById("deleteAllBtn")
let themeToggle = document.getElementById("themeToggle")
let editMode = false
let currentEditElement = null;

if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "light")
}

let theme = localStorage.getItem("theme")

if (theme == "light") {
    themeToggle.children[0].classList.replace("fa-moon", "fa-sun")
    document.getElementsByTagName("body")[0].classList.remove("dark-mode")
} else {
    themeToggle.children[0].classList.replace("fa-sun", "fa-moon")
    document.getElementsByTagName("body")[0].classList.add("dark-mode")
}

function addTask(e) {

    e.preventDefault()

    if (!taskInput.value.trim()) {
        errorMsg.classList.add("active")
        taskInput.focus()

        setTimeout(() => {
            errorMsg.classList.remove("active")
        }, 5000)

        return;
    }

    if (!editMode) {

        let li = document.createElement("li")
        li.innerHTML = `<p>${taskInput.value}</p>
                    <div class="icons">
                        <i class="fa-solid fa-pencil" onclick="editItem(this)"></i>
                        <i class="fa-solid fa-trash-can" onclick="deleteItem(this)"></i>
                    </div>`

        todoList.insertBefore(li, todoList.firstChild)
        taskInput.value = ""
        errorMsg.classList.remove("active")
    }

    if (editMode) {
        currentEditElement.innerText = taskInput.value
        addTaskBtn.innerText = "Add Task"
        taskInput.value = ""
        editMode = false
    }

    if (todoList.children.length > 0) {
        message.style.display = "none"
    } else {
        message.style.display = "block"
    }
}

function deleteAllItems() {

    todoList.innerHTML = ""
    message.style.display = "block"
}

function deleteItem(deleteIcon) {
    deleteIcon.parentNode.parentNode.remove()

    if (todoList.children.length > 0) {
        message.style.display = "none"
    } else {
        message.style.display = "block"
    }
}

function editItem(editIcon) {
    editMode = true
    currentEditElement = editIcon.parentNode.previousElementSibling
    taskInput.value = editIcon.parentNode.previousElementSibling.innerText
    taskInput.focus()
    addTaskBtn.innerText = "Update Task"
}

function changeTheme() {

    let currentTheme = localStorage.getItem("theme")

    if (currentTheme == "light") {
        localStorage.setItem("theme", "dark")
        themeToggle.children[0].classList.replace("fa-sun", "fa-moon")
        document.getElementsByTagName("body")[0].classList.add("dark-mode")
    } else {
        localStorage.setItem("theme", "light")
        themeToggle.children[0].classList.replace("fa-moon", "fa-sun")
        document.getElementsByTagName("body")[0].classList.remove("dark-mode")
    }
}

form.addEventListener("submit", addTask)
deleteAllBtn.addEventListener("click", deleteAllItems)
themeToggle.addEventListener("click", changeTheme)