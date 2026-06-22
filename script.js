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
if (!localStorage.getItem("allTasks")) {
    localStorage.setItem("allTasks", JSON.stringify([]))
}

let theme = localStorage.getItem("theme")
let allTasks = JSON.parse(localStorage.getItem("allTasks"))

if (theme == "light") {
    themeToggle.children[0].classList.replace("fa-moon", "fa-sun")
    document.getElementsByTagName("body")[0].classList.remove("dark-mode")
} else {
    themeToggle.children[0].classList.replace("fa-sun", "fa-moon")
    document.getElementsByTagName("body")[0].classList.add("dark-mode")
}

function showTasks() {
    let tasks = JSON.parse(localStorage.getItem("allTasks")) || []
    todoList.innerHTML = ""

    for (let i = 0; i < tasks.length; i++) {
        let li = document.createElement("li")
        li.innerHTML = `<p>${tasks[i]}</p>
                    <div class="icons">
                        <i class="fa-solid fa-pencil" onclick="editItem(this)"></i>
                        <i class="fa-solid fa-trash-can" onclick="deleteItem(this)"></i>
                    </div>`
        todoList.appendChild(li)

        if (todoList.children.length > 0) {
            message.style.display = "none"
        } else {
            message.style.display = "block"
        }

    }

}
showTasks()

function addTask(e) {

    e.preventDefault()

    if (!taskInput.value.trim()) {
        errorMsg.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> Please enter a task.`
        errorMsg.classList.add("active")
        taskInput.focus()

        setTimeout(() => {
            errorMsg.classList.remove("active")
        }, 5000)

        return;
    }

    if (!editMode) {

        for (let i = 0; i < allTasks.length; i++) {
            if (allTasks[i] == taskInput.value.trim()) {
                errorMsg.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> Task already exist.`
                errorMsg.classList.add("active")
                taskInput.focus()

                setTimeout(() => {
                    errorMsg.classList.remove("active")
                }, 5000)

                return;
                break
            }
        }

        let li = document.createElement("li")
        li.innerHTML = `<p>${taskInput.value}</p>
                    <div class="icons">
                        <i class="fa-solid fa-pencil" onclick="editItem(this)"></i>
                        <i class="fa-solid fa-trash-can" onclick="deleteItem(this)"></i>
                    </div>`

        todoList.insertBefore(li, todoList.firstChild)
        allTasks.unshift(taskInput.value)
        localStorage.setItem("allTasks", JSON.stringify(allTasks))
        taskInput.value = ""
        errorMsg.classList.remove("active")
    }

    if (editMode) {
        for (let i = 0; i < allTasks.length; i++) {
            if (currentEditElement.innerText == allTasks[i]) {
                allTasks.splice(i, 1, taskInput.value)
                break
            }
        }
        localStorage.setItem("allTasks", JSON.stringify(allTasks))
        currentEditElement.innerText = taskInput.value
        addTaskBtn.innerText = "Add Task"
        taskInput.value = ""
        taskInput.blur()
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
    allTasks.splice(0, allTasks.length)
    localStorage.setItem("allTasks", JSON.stringify(allTasks))
    message.style.display = "block"
}

function deleteItem(deleteIcon) {
    let currentDeleteElement = deleteIcon.parentNode.previousElementSibling

    for (let i = 0; i < allTasks.length; i++) {
        if (currentDeleteElement.innerText == allTasks[i]) {
            allTasks.splice(i, 1)
            break
        }
    }
    localStorage.setItem("allTasks", JSON.stringify(allTasks))
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