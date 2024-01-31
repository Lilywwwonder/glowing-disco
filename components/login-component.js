export function renderLoginComponent ({ appEl, setToken, fetchTodosAndRender }) {
    const appHtml = `
    <h1>Список задач</h1>
    <div class="form">
    <h3 class="form-title">Форма входа</h3>
    <div class="form-row">
        Логин
        <input type="text" id="login-input" class="input" />
        <br />
        Пароль
        <input type="text" id="login-input" class="input" />
    </div>
    <br />
    <button class="button" id="login-button">Войти</button>
    </div>`;

    appEl.innerHTML = appHtml;

    document.getElementById("login-button").addEventListener('click', () => {
    setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");
    
    fetchTodosAndRender();
    });
}