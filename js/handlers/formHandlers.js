import { comments } from '../commentsArray/commentsArray.js'
import { renderComments } from '../renderComment/renderComments.js'
import { fixText } from '../textFormater/fixText.js'
import { postCommentAPI, getCommentsAPI } from '../api/commentsAPI.js'

export let formComment = document.querySelector('.add-form-text')

let formButton = document.querySelector('.add-form-button')
let formName = document.querySelector('.add-form-name')

formButton.addEventListener('click', async () => {
    let commentValue = formComment.value
    let nameValue = formName.value

    if (nameValue === '' || commentValue === '') {
        alert('Введите полностью данные прежде чем отправлять комментарий :)')
        return
    }

    if (nameValue.length < 3) {
        alert('Имя должно содержать хотя бы 3 символа')
        return
    }

    let comment = {}

    comment.name = fixText(nameValue)
    comment.data = new Date()
    comment.text = fixText(commentValue)
    comment.likesCounter = 0

    comments.push(comment)

    let commentList = document.querySelector('.comments')
    let form = document.querySelector('.add-form')
    let loadingMessage = document.createElement('p')

    loadingMessage.textContent = 'Комментарий добавляется...'
    loadingMessage.className = 'comment-creating'

    commentList.append(loadingMessage)
    form.style.display = 'none'

    await postCommentAPI(comment)

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

    await getCommentsAPI()
    renderComments()

    formComment.value = ''
    formName.value = ''
    form.style.display = 'flex'
})
