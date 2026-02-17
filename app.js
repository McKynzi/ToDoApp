const todoForm = document.querySelector('form');
const todoInput = document.getElementById('taskInput');
const todoListUL = document.getElementById('taskList');

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const todoText = todoInput.value.trim();
    if(todoText.length >0){
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = '';    
    }
}
function updateTodoList() {
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    })
}
function createTodoItem(todo, todoIndex) {
    const todoID = "todo-" +todoIndex;
    const todoLI = document.createElement('li');
    const todoText = todo.text;
    todoLI.className = 'todo';
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoID}">
        <label class="custom-checkbox" for="${todoID}">
            <svg fill="transparent" xmls="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M20.285 6.709a1 1 0 00-1.414-1.418l-9.192 9.193-4.192-4.193a1 1 0 00-1.414 1.418l5 5a1 1 0 001.414 0l10-10z"/>
            </svg>
        </label>
        <label for="${todoID}" class="todo-text">
            ${todoText}
        </label>

        <button class="delete-btn">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M3 6h18v2H3V6zm2 3h14v12a2 2 0 01-2 2H7a2 2 0 01-2-2V9zm3 3v6h2v-6H8zm4 0v6h2v-6h-2z"/>
            </svg>
        </button>
    `
    const deletebtn = todoLI.querySelector('.delete-btn');
    deletebtn.addEventListener('click', ()=>{
        deleteTodo(todoIndex);
    })
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", () => {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    })
    checkbox.checked = todo.completed;
    return todoLI;
}
function deleteTodo(todoIndex)  {
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodos();
    updateTodoList();
}
function saveTodos() {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}
function getTodos() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}