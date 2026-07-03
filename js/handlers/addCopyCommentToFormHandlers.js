import { humanizeText } from '../textFormater/humanizeText.js'
import { comments } from '../commentsArray/commentsArray.js'

export function addCopyCommentToFormHandlers() {
    let commentForm = document.querySelector('.add-form-text')

    let commentsEl = document.querySelectorAll('.comment')

    for (let commentEl of commentsEl) {
        function copyCommentToForm() {
            console.log(commentEl)
            let index = commentEl.dataset.id

            commentForm.value =
                'Ответ на комментарий: ' +
                humanizeText(comments[index].text) +
                ' Автор: ' +
                humanizeText(comments[index].name)
        }

        commentEl?.addEventListener('click', copyCommentToForm)
    }
}
