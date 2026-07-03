import { comments } from '../commentsArray/commentsArray.js'
import { renderComments } from '../render/renderComments.js'
import { token } from '../api/commentsAPI.js'

export function addLikeHandlers() {
    let likeButtons = document.querySelectorAll('.like-button')
    let likesCounter = document.querySelectorAll('.likes-counter')

    likeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation()

            if (token === '') {
                alert('Авторизуйтесь, чтобы ставить лайки')
                return
            }

            let index = button.dataset.index

            button.classList.add('shake')
            button.addEventListener(
                'animationend',
                () => {
                    button.classList.remove('shake')
                },
                { once: true },
            )

            if (comments[index].isLiked === true) {
                button.classList.remove('-active-like')
                comments[index].isLiked = false
                comments[index].likesCounter--
            } else {
                button.classList.add('-active-like')
                comments[index].isLiked = true
                comments[index].likesCounter++
            }

            likesCounter[index].textContent = comments[index].likesCounter
        })
    })
}
