import { renderLogin } from './renderLogin.js'

export function renderForm() {
    const container = document.createElement('div')

    let app = document.querySelector('.app')
    container.className = 'container'

    container.innerHTML = `
    <p class="loading">
                Пожалуйста подождите, комментарии загружаются...
            </p>
            <ul class="comments"></ul>
            <a class="autorization-link">Чтобы добавить комментарий, авторизуйтесь</a>
            <div class="add-form">
                <input
                    type="text"
                    class="add-form-name"
                    placeholder="Введите ваше имя"
                    required
                />
                <textarea
                    type="textarea"
                    class="add-form-text"
                    placeholder="Введите ваш коментарий"
                    rows="4"
                    required
                ></textarea>
                <div class="add-form-row">
                    <button class="add-form-button">Написать</button>
                </div>
            </div>`

    app.before(container)
}
