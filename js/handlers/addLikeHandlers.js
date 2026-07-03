import { comments } from '../commentsArray/commentsArray.js'
import { renderComments } from '../render/renderComments.js'
import { token } from '../api/commentsAPI.js'

export function addLikeHandlers() {
    let likeButtons = document.querySelectorAll('.like-button')
    let likesCounter = document.querySelectorAll('.likes-counter')

    likeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation()
            debugger
            if (token === '') {
                alert('Авторизуйтесь, чтобы ставить лайки')
                return
            }

            button.classList.add('shake')
            let index = button.dataset.index

            if (comments[index].isLiked === true) {
                comments[index].isLiked = false
                comments[index].likesCounter--
            } else {
                comments[index].isLiked = true
                comments[index].likesCounter++
            }

            renderComments()
            // button.classList.remove('shake')
        })
    })
}
