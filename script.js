let taskInput = document.getElementById("taskInput")
let form = document.getElementById("form")
let todoList = document.querySelector(".todo-list")
let message = document.querySelector(".message")
let errorMsg = document.querySelector(".error-messaage")
let deleteAllBtn = document.getElementById("deleteAllBtn")

function addTask(e) {

    e.preventDefault()

    if (!taskInput.value.trim()) {
        errorMsg.classList.add("active")

        setTimeout(() => {
            errorMsg.classList.remove("active")
        }, 5000)

        return;
    }

    let li = document.createElement("li")
    li.innerHTML = `<p>${taskInput.value}</p>
                    <div class="icons">
                        <i class="fa-solid fa-pencil" onclick="editItem(this)"></i>
                        <i class="fa-solid fa-trash-can" onclick="deleteItem(this)"></i>
                    </div>`

    todoList.appendChild(li)
    taskInput.value = ""
    errorMsg.classList.remove("active")

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
    taskInput.value = editIcon.parentNode.previousElementSibling.innerText
    taskInput.focus()
    editIcon.parentNode.parentNode.remove()

    if (todoList.children.length > 0) {
        message.style.display = "none"
    } else {
        message.style.display = "block"
    }
}

form.addEventListener("submit", addTask)
deleteAllBtn.addEventListener("click", deleteAllItems)