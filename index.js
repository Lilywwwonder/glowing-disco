    // План
    // 1. Реализовать форму логина в приложении
    //  * Перенести всю разметку в рендер функцию +
    // * сделать динамической форму входа +
    // * отрефакторить приложение на модули 
    // * api +
    // * вытащить логин компонент в отдельный модуль +
    // * вытащить компонент списка задач и форму добавления в отдельный модуль +
    // 2. Реализовать форму регистрации

import { addTodo, deleteTodo, getTodos } from "./api.js";
import { renderLoginComponent } from "./components/login-component.js";


    let tasks = [];


    let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
    token = null;


    
    const fetchTodosAndRender = () => {
      return getTodos({ token })
        .then((responseData) => {
          tasks = responseData.todos;
          renderApp();
        });
    };

    const renderApp = () => {
        const appEl = document.getElementById("app");
        if(!token) {


            renderLoginComponent({ appEl, 
                setToken: (newToken) => {
                token = newToken;
            },
            fetchTodosAndRender,
         });

      return;
        }

      const tasksHtml = tasks
        .map((task) => {
          return `
          <li class="task">
            <p class="task-text">
              ${task.text} (Создал: ${task.user?.name ?? 'неизвестно' })
              <button data-id="${task.id}" class="button delete-button">Удалить</button>
            </p>
          </li>`;
        })
        .join("");

      const appHtml = `
                <ul class="tasks" id="list">
                <!-- Список рендерится из JS -->
                ${tasksHtml}
                </ul>
                <br />
                <div class="form">
                <h3 class="form-title">Форма добавления</h3>
                <div class="form-row">
                    Что нужно сделать:
                    <input
                    type="text"
                    id="text-input"
                    class="input"
                    placeholder="Выпить кофе"
                    />
                </div>
                <br />
                <button class="button" id="add-button">Добавить</button>
                </div>`;

      appEl.innerHTML = appHtml;

      const buttonElement = document.getElementById("add-button");
      const listElement = document.getElementById("list");
      const textInputElement = document.getElementById("text-input");

      const deleteButtons = document.querySelectorAll(".delete-button");

      for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", (event) => {
          event.stopPropagation();

          const id = deleteButton.dataset.id;

          // подписываемся на успешное завершение запроса с помощью then
            deleteTodo({ id, token })
            .then((responseData) => {
              // получили данные и рендерим их в приложении
              tasks = responseData.todos;
              renderApp();
            });
        });
      }

      buttonElement.addEventListener("click", () => {
        if (textInputElement.value === "") {
          return;
        }

        buttonElement.disabled = true;
        buttonElement.textContent = "Задача добавляеятся...";

       
addTodo({ token, text: textInputElement.value })
          .then(() => {
            // TODO: кинуть исключение
            textInputElement.value = "";
          })
          .then(() => {
            return fetchTodosAndRender();
          })
          .then(() => {
            buttonElement.disabled = false;
            buttonElement.textContent = "Добавить";
          })
          .catch((error) => {
            console.error(error);
            alert("Кажется у вас проблемы с интернетом, попробуйте позже");
            buttonElement.disabled = false;
            buttonElement.textContent = "Добавить";
          });
      });
    };
 
    renderApp();