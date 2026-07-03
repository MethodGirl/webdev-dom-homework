import { comments } from '../commentsArray/commentsArray.js'
import { renderComments } from '../render/renderComments.js'
import {
    formTextArea,
    formInput,
    formComment,
    formName,
} from '../handlers/formHandlers.js'

const host = 'https://wedev-api.sky.pro/api/v2/MethodGirl'

// let token = 'asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k'

export let token = ''

export const updateToken = (newToken) => {
    token = newToken
}
export function getCommentsAPI() {
    return fetch(host + '/comments', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
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

    return fetch(host + '/comments', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text: newComment.text,
            name: newComment.name,
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

export function login({ login, password }) {
    return fetch('https://wedev-api.sky.pro/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ login, password }),
    })
        .then((response) => {
            return response.json().then((data) => {
                if (!response.ok) {
                    console.error('Ответ сервера:', data)
                    throw new Error(
                        data.message ||
                            data.error ||
                            `Ошибка ${response.status}`,
                    )
                }
                return data
            })
        })
        .catch((error) => {
            if (
                error.message.includes('400') ||
                error.message.includes('Неверный')
            ) {
                alert('Неверный пароль или логин, попробуйте снова')
            }
        })
}

export function registration({ login, name, password }) {
    return fetch('https://wedev-api.sky.pro/api/user', {
        method: 'POST',
        body: JSON.stringify({ login, name, password }),
    })
        .then((response) => {
            return response.json().then((data) => {
                if (!response.ok) {
                    console.error('Ответ сервера:', data)
                    throw new Error(
                        data.message ||
                            data.error ||
                            `Ошибка ${response.status}`,
                    )
                }
                return data
            })
        })
        .catch((error) => {
            console.error('Ошибка запроса:', error)
            throw error
        })
}
