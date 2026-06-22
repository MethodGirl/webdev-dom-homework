import { comments } from '../commentsArray/commentsArray.js'
import { renderComments } from '../renderComment/renderComments.js'
import { fixText } from '../textFormater/fixText.js'
import { postCommentAPI, getCommentsAPI } from '../api/commentsAPI.js'

export let formComment = document.querySelector('.add-form-text')
export let formName = document.querySelector('.add-form-name')
export let formTextArea = document.querySelector('.add-form-text')
export let formInput = document.querySelector('.add-form-name')

let formButton = document.querySelector('.add-form-button')

function paintBackground() {
    formTextArea.style.backgroundColor = 'white'
    formInput.style.backgroundColor = 'white'
}

formTextArea.addEventListener('click', () => paintBackground(formTextArea))
formInput.addEventListener('click', () => paintBackground(formInput))

function delay(ms) {
    let promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })

    return promise
}

formButton.addEventListener('click', async () => {
    try {
        let commentValue = formComment.value
        let nameValue = formName.value

        let comment = {}

        comment.name = fixText(nameValue)
        comment.data = new Date()
        comment.text = fixText(commentValue)
        comment.likesCounter = 0

        let commentList = document.querySelector('.comments')
        let form = document.querySelector('.add-form')
        let loadingMessage = document.createElement('p')

        loadingMessage.textContent = 'Комментарий добавляется...'
        loadingMessage.className = 'comment-creating'

        commentList.append(loadingMessage)
        form.style.display = 'none'

        let attempts = 0

        while (attempts < 5) {
            try {
                await postCommentAPI(comment)
                break
            } catch (error) {
                if (error.message !== '500') {
                    throw error
                }

                attempts++

                if (attempts === 5) {
                    throw error
                }

                await delay(1000)
            }
        }

        let response = await getCommentsAPI()

        const commentsArray = response.comments

        let convertedComments = commentsArray.map((comment) => ({
            id: comment.id,
            name: comment.author.name,
            data: new Date(comment.date),
            text: comment.text,
            isLiked: comment.isLiked,
            likesCounter: comment.likes,
        }))

        comments.length = 0
        comments.push(...convertedComments)

        loadingMessage.remove()

        renderComments()

        formComment.value = ''
        formName.value = ''
        form.style.display = 'flex'
    } catch (error) {
        let form = document.querySelector('.add-form')
        let loadingMessage = document.querySelector('.comment-creating')

        if (error.message === '400') {
            loadingMessage.remove()

            alert('Имя и комментарий должны быть не короче 3х символов')
            formTextArea.style.backgroundColor = 'Maroon'
            formInput.style.backgroundColor = 'Maroon'

            form.style.display = 'flex'
        }

        if (error.message === '500') {
            alert('Сервер сломался, попробуйте позже')
            loadingMessage.remove()
            form.style.display = 'flex'
        }

        if (error.name === 'TypeError' || error.message === 'Failed to fetch') {
            alert('Нет интернета или сервер недоступен')
            loadingMessage.remove()
            form.style.display = 'flex'
        }
    }
})
