import { renderRegistration } from './renderRegistration.js'
import { renderForm } from './renderForm.js'
import { renderComments } from './renderComments.js'
import {
    login,
    registration,
    updateToken,
    postCommentAPI,
} from '../api/commentsAPI.js'
import {
    autorizationLink,
    nameInput,
    commentInput,
    addCommentButton,
} from '../index.js'

let userName = ''

export const updateUser = (newUserName) => {
    userName = newUserName
}

function showAuthorizedCommentForm() {
    autorizationLink.style.display = 'none'
    nameInput.disabled = false
    nameInput.readOnly = true
    commentInput.disabled = false
    addCommentButton.disabled = false
}

export function renderLogin() {
    let app = document.querySelector('.app')
    let container = document.querySelector('.container')

    container.style.display = 'none'

    app.innerHTML = `
    <div class="login">
    <h2 class="login__title">Логин</h2>
    <form class="login__form">
      <div class="login__fields">
        <input class="login__input" type="text" placeholder="Имя пользователя" name="login">
        <input class="login__input" type="password" placeholder="Пароль" name="password">
      </div>
      <div class="login__actions">
        <button class="login__button login__button--submit" type="submit">Войти</button>
        <button class="login__button login__button--register" type="button">Зарегистрироваться</button>
      </div>
    </form>
    </div>
    `

    let registrationButton = document.querySelector('.login__button--register')

    registrationButton?.addEventListener('click', () => renderRegistration())

    let loginBlock = document.querySelector('.login')

    loginBlock.addEventListener('submit', async (event) => {
        event.preventDefault()

        const loginValue = event.target.elements['login'].value
        const passwordValue = event.target.elements['password'].value

        try {
            const response = await login({
                login: loginValue,
                password: passwordValue,
            })
            console.log(response)
            if (response.user.token) {
                updateToken(response.user.token)
                updateUser(response.user.name)

                app.style.display = 'none'
                container.style.display = 'flex'
                nameInput.value = response.user.name
                showAuthorizedCommentForm()
            } else {
                console.error('Не удалось войти')
            }
        } catch (error) {
            console.error('Произошла ошибка', error)
        }
    })
}
