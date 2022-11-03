const form = document.querySelector('#todoForm');
const input = document.querySelector('input[type="text"]')
const todoList = document.querySelector('#list')

const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
for (let i = 0; i < savedTodos.length; i++) {
    let newTodo = document.createElement('li');
    newTodo.innerText = savedTodos[i].task;
    newTodo.isCompleted = savedTodos[i].isCompleted ? true : false;
    if (newTodo.isCompleted) {
        newTodo.style.textDecoration = "line-through";
        newTodo.style.color = 'red';
    }
    todoList.appendChild(newTodo);
}


form.addEventListener('submit', function (e) {
    e.preventDefault();
    let newTodo = document.createElement('li');
    let taskValue = input.value
    newTodo.innerText = taskValue;
    newTodo.isCompleted = false;
    todoList.appendChild(newTodo);
    form.reset();

    savedTodos.push({ task: taskValue, isCompleted: false });
    localStorage.setItem("todos", JSON.stringify(savedTodos));
});


todoList.addEventListener('click', function (e) {
    let clickedItem = e.target;

    if (!clickedItem.isCompleted) {
        clickedItem.style.textDecoration = "line-through";
        clickedItem.style.color = 'red';
        clickedItem.isCompleted = true;
    } else {
        clickedItem.style.textDecoration = "none";
        clickedItem.style.color = '#61DAFB';
        clickedItem.isCompleted = false;
    }
    for (let i = 0; i < savedTodos.length; i++) {
        if (savedTodos[i].task === clickedItem.innerText) {
            savedTodos[i].isCompleted = !savedTodos[i].isCompleted;
            localStorage.setItem("todos", JSON.stringify(savedTodos));
        }
    }
});

todoList.addEventListener('dblclick', function (e) {
    e.target.remove();
    localStorage.removeItem('todos');
})