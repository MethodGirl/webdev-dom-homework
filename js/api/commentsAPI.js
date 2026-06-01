import { comments } from '../commentsArray/commentsArray.js'
import { renderComments } from '../renderComment/renderComments.js'

export function getCommentsAPI() {
    return fetch('https://wedev-api.sky.pro/api/v1/MethodGirl/comments', {
        method: 'GET',
    }).then((response) => response.json())
}

export function postCommentAPI(newComment) {
    const commentForAPI = {
        name: newComment.name,
        date: new Date().toISOString(),
        text: newComment.text,
        isLiked: false,
        likes: 0,
    }

    return fetch('https://wedev-api.sky.pro/api/v1/MethodGirl/comments', {
        method: 'POST',
        body: JSON.stringify(commentForAPI),
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error('Ошибка при отправке:', error)
        })
}
