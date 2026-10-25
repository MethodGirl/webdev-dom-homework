export function renderLoader() {
    let container = document.querySelector('.container')

    let loader = document.createElement('p')

    loader.className = 'loading'
    loader.textContent = 'Пожалуйста подождите, комментарии загружаются...'

    container.prepend(loader)
}
