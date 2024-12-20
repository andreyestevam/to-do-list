const todoForm = document.querySelector('form');
const todoInput = document.getElementById('task-input');
const todoListUL = document.getElementById('tasks-list');

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
})

// This function adds the task to the software.
function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = "";
    }
}

// This function updates the whole list of tasks.
function updateTodoList(){
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoItem)=>{
        todoItem = createTodoItem(todo, todoItem);
        todoListUL.append(todoItem);
    })
}

// This function creates one of the boxes with the task so the user can view the task.
function createTodoItem(todo, todoItem){
    const taskId = "task-"+todoItem;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo";
    todoLI.innerHTML = `
                <input type="checkbox" id="${taskId}">
                <label for="${taskId}" class="custom-checkbox">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                    </svg>
                </label>
                <label for="${taskId}" class="todo-text">
                    ${todoText}
                </label>
                <button class="delete-button">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
    `
    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", ()=>{
        deleteTodoItem(todoItem);
    })
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allTodos[todoItem].completed = checkbox.checked;
        saveTodos();
    })
    checkbox.checked = todo.completed;
    return todoLI;
}
function deleteTodoItem(todoItem){
    allTodos = allTodos.filter((_, i)=> i !== todoItem);
    saveTodos();
    updateTodoList();
}

function saveTodos(){
    localStorage.setItem("todos", JSON.stringify(allTodos));
}

function getTodos(){
    const todos = localStorage.getItem("todos") || [];
    return JSON.parse(todos);
}