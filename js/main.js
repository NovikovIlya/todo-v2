                                                        // Форма (поле ввода, кнопка "Добавить")
const form =  document.querySelector('#form');

                                                        // Поле ввода текста
const taskInput = document.querySelector('#taskInput');

                                                        // Список дел
const tasksList = document.querySelector('#tasksList');

                                                        // текст "Список дел пуст"
const emptyList = document.querySelector('#emptyList');


let tasks = []; 

// Проверяем наличие данных в локалосторедж
if (localStorage.getItem('tasks')){
    // Если есть - Достаем из локалсторедж данные и переносим в массив
    tasks = JSON.parse(localStorage.getItem('tasks'));

    // Достаем данные из массива (перебором элементов) и отображаем в разметке
    tasks.forEach(function(task){
        renderTask(task);
 })
}




checkEmptyList();



function addTask(event){
                                                        // Отменяет перезагрузку страницы
    event.preventDefault();

                                                        // Достаем текст из поля ввода
    const taskText = taskInput.value

    // Описываем задачу в виде объекта
    const newTask = {
        // текущее время в милисекундах
        id: Date.now(),
        text: taskText,
        done: false
    };

    // Добавляем задачу в массив с задачами
    tasks.push(newTask)
    

    renderTask(newTask);


    // Очищаем поле ввода и возвращаем на него фокус
    taskInput.value = "";
    taskInput.focus()




   checkEmptyList();
    
   saveToLocalStorage();
}


function deleteTask(event){
     // Смотрим на какую кнопку тыкаем и проверяем кнопка ли это "удалить"
    if (event.target.dataset.action !== 'delete'){
        return
    }

                                                // Находим конкретного родителя конкретной кнопки "Удалить", ее блок
    const parentNode = event.target.closest('.list-group-item');

    const idNazhatoiKnopki = parentNode.id;

    // Находим нужный индекс  в массиве, elementvmassive - task
    const indexUdalit = tasks.findIndex((elementvmassive)=>{
        return (elementvmassive.id == idNazhatoiKnopki);
    })

    // Удаляем элемент с нужным индексом
    tasks.splice(indexUdalit, 1)
                                                // Удаляем блок из разметки
    parentNode.remove();




    checkEmptyList();
    saveToLocalStorage();
    
}


function doneTask(event){
    if (event.target.dataset.action !=='done'){
        return}


                                                // Находим конкретного родителя конкретной кнопки "Удалить", ее блок
    const parentNode = event.target.closest('.list-group-item');


    const idNazhatoiKnopki = Number(parentNode.id);

    // (Массив)Находим элемент в массиве по айди
    const element =  tasks.find(function(elementvmassive){
        if (elementvmassive.id === idNazhatoiKnopki){
            return true;
        }
    })

    //(Массив)меняем статус элемента в массиве
    element.done = !element.done


                                                // Находим через квериселектор у листгрупайтем спан(сам текст)
    const taskTitleSpan = parentNode.querySelector('.task-title');

                                                // Добавляем зачеркивание к спану
                                                // Включаем класс к спану "task-title--done"
    taskTitleSpan.classList.toggle('task-title--done');
    
    saveToLocalStorage();
}

//Проверяем наличие в массиве данные и от этого отображаем "Список дел пуст"
function checkEmptyList(){
    //Отображаем "Список дел пуст" если в массиве нет данных
    if (tasks.length === 0){
        const emptyListHTML = `
        <li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
        </li>`;
        //В блок "Список дел" вставляем html описанный выше
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    }

    //Если в списке дел есть данные
    if (tasks.length > 0){
        //Находим "Список дел пуст"(вставленный выше)
        const emptyListEl = document.querySelector('#emptyList');

        // Найден ли "Список дел пуст" ? - Да(удаляем) : Нет (возвращаем null)
        emptyListEl ? emptyListEl.remove() : null;
    }
}

// Функция по занесению массива в локалсторедж. Сохраняем список задач в хранилие браузере localStorage
function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function renderTask(task){
    // Формируем css класс 
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

            // Формируем разметку для новой задачи
    const taskHTML = `
                <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                    <span class="${cssClass}">${task.text}</span>
                    <div class="task-item__buttons">
                        <button type="button" data-action="done" class="btn-action">
                        <img src="./img/tick.svg" alt="Done" width="18" height="18">
                        </button>
                        <button type="button" data-action="delete" class="btn-action">
                        <img src="./img/cross.svg" alt="Done" width="18" height="18">
                        </button>
                    </div>
                </li>`

    // Добалвяем задачу на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}

 
// вешаем отслеживать событий -> при отправке формы включаем функцию addTask
form.addEventListener('submit', addTask)

// Вешаем удаление задачи
tasksList.addEventListener('click', deleteTask);

// Вешаем выполнение задачи
tasksList.addEventListener('click', doneTask);



