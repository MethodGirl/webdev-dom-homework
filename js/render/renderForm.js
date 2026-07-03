import { renderLoader } from './renderLoader.js'
import { renderCommentsList } from './renderCommentsList.js'
import { renderAutorizationLink } from './renderAutorizationLink.js'

export function renderForm() {
    const container = document.createElement('div')

    let app = document.querySelector('.app')
    container.className = 'container'

    container.innerHTML = `
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

    renderAutorizationLink()
    renderCommentsList()
    renderLoader()
}
