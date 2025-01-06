const carousel = document.getElementById('carousel');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const closeModalButton = document.getElementById('close-modal');

const todoId = document.getElementById('todo-id');
const todoTitle = document.getElementById('todo-title');
const todoCompleted = document.getElementById('todo-completed');

let todos = [];
let currentPage = 0;
const itemsPerPage = 15;

const fetchTodos = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    todos = await response.json();
    console.log(todos);
    renderCarousel();
};

const renderCarousel = () => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const currentTodos = todos.slice(start, end);

    carousel.innerHTML = ''; //This clears the previous page's content from the carousel before rendering new items.

    currentTodos.forEach((todo) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${todo.title}</h3>
            <p>Completed: ${todo.completed ? 'Yes' : 'No'}</p>
        `;
        card.addEventListener('click', () => showDetails(todo));
        carousel.appendChild(card);
    });

    updateNavButtons();
};


const updateNavButtons = () => {
    prevButton.disabled = currentPage === 0;
   nextButton.disabled = (currentPage + 1) * itemsPerPage >= todos.length;


   //Example Scenario:

//Total Items (todos.length): 45

//Items Per Page (itemsPerPage): 10

//Current Page (currentPage): 3 (which is the 4th page, since indexing starts at 0)

//Calculations:

//Next Page: currentPage + 1 = 3 + 1 = 4

//Index of First Item on Next Page: (currentPage + 1) * itemsPerPage = 4 * 10 = 40

//Condition Check: 40 >= 45 evaluates to false
//

};

const showDetails = (todo) => {
    todoId.textContent = todo.id;
    todoTitle.textContent = todo.title;
    todoCompleted.textContent = todo.completed ? 'Yes' : 'No';

    modal.style.display = 'block';
    overlay.style.display = 'block';
};


const closeDetails = () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
};

prevButton.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        renderCarousel();
    }
});

nextButton.addEventListener('click', () => {
    if ((currentPage + 1) * itemsPerPage < todos.length) {
        currentPage++;
        renderCarousel();
    }
});


closeModalButton.addEventListener('click', closeDetails);

overlay.addEventListener('click', closeDetails);

fetchTodos();
