export function renderAutorizationLink() {
    let form = document.querySelector('.add-form')

    let autorizationLink = document.createElement('a')

    autorizationLink.className = 'autorization-link'
    autorizationLink.textContent = 'Чтобы добавить комментарий, авторизуйтесь'

    form.before(autorizationLink)
}
