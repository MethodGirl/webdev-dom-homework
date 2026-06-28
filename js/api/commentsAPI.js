import { comments } from '../commentsArray/commentsArray.js'
import { renderComments } from '../renderComment/renderComments.js'
import {
    formTextArea,
    formInput,
    formComment,
    formName,
} from '../handlers/formHandlers.js'

export function getCommentsAPI() {
    return fetch('https://wedev-api.sky.pro/api/v1/MethodGirl/comments', {
        method: 'GET',
    }).then((response) => response.json())
}

const host = 'https://wedev-api.sky.pro/api/v1/MethodGirl'

export function postCommentAPI(newComment) {
    const commentForAPI = {
        name: newComment.name,
        date: new Date().toISOString(),
        text: newComment.text,
        isLiked: false,
        likes: 0,
    }

    return fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify({
            text: newComment.text,
            name: newComment.name,
            forceError: true,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('400')
        }

        if (response.status === 500) {
            throw new Error('500')
        }

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`)
        }

        response.json()
    })
}
