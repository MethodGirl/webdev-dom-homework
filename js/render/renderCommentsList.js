export function renderCommentsList() {
    let container = document.querySelector('.container')

    let commentsContainer = document.createElement('ul')

    commentsContainer.className = 'comments'

    container.prepend(commentsContainer)
}
