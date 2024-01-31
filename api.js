const host = "https://webdev-hw-api.vercel.app/api/v2/todos";

export function getTodos({ token }) {
    return fetch(host, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          if (response.status === 401) {
            // token = prompt("Введите верный пароль");
            // fetchTodosAndRender();
            throw new Error("Нет авторизации");
          }

          return response.json();
        })
}

export function deleteTodo({ token, id }) {
    return fetch(`${host}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          return response.json();
        })
}

export function addTodo({ text, token }) {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
          text,
        }),
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          return response.json();
        })
}