import { getCommentsAPI } from './api/commentsAPI.js'
import { comments } from './commentsArray/commentsArray.js'
import { renderComments } from './render/renderComments.js'
import { renderForm } from './render/renderForm.js'
import { renderLogin } from './render/renderLogin.js'
import { token } from './api/commentsAPI.js'
import { renderLoader } from './render/renderLoader.js'

renderForm()

let loadingMessage = document.querySelector('.loading')

const initPage = async () => {
    let commentList = document.querySelector('.comments')

    if (!commentList) {
        console.error('Контейнер .comments не найден')
        return
    }

    try {
        const data = await getCommentsAPI()

        const rawComments = data?.comments ?? (Array.isArray(data) ? data : [])

        const convertedComments = rawComments.map((comment) => ({
            id: comment.id || 0,
            name: comment.author?.name || 'Аноним',
            data: comment.date ? new Date(comment.date) : new Date(),
            text: comment.text || '',
            likesCounter: comment.likes || 0,
        }))

        comments.length = 0
        comments.push(...convertedComments)

        renderComments()
        loadingMessage.style.display = 'none'
    } catch (error) {
        console.error('Ошибка:', error)
        comments.length = 0
        renderComments()
    }
}

initPage()

renderComments()

export let nameInput = document.querySelector('.add-form-name')
export let commentInput = document.querySelector('.add-form-text')
export let addCommentButton = document.querySelector('.add-form-button')

if (token === '') {
    nameInput.disabled = true
    commentInput.disabled = true
    addCommentButton.disabled = true
}

export let autorizationLink = document.querySelector('.autorization-link')
let container = document.querySelector('.container')

autorizationLink?.addEventListener('click', () => renderLogin())
