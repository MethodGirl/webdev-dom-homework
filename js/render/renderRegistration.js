import { renderLogin } from './renderLogin.js'

export function renderRegistration() {
    let app = document.querySelector('.app')

    app.innerHTML = `
     <div class="registration">
     <h2 class="registration__title">Регистрация</h2>
     <form class="registration__form">
        <div class="registration__fields">
            <input class="registration__input" type="text" placeholder="Имя пользователя" name = "login">
            <input class="registration__input" type="email" placeholder="Почта" name = "name">
            <input class="registration__input" type="password" placeholder="Пароль" name ="password">
        </div>
        <div class="registration__actions">
            <button class="registration__button registration__button--register" type="submit">Зарегистрироваться</button>
            <button class="registration__button registration__button--submit" type="button">Войти</button>
        </div>
    </form>
    </div>
    `

    let submitButton = document.querySelector('.registration__button--submit')

    submitButton?.addEventListener('click', () => renderLogin())
}
