export function createElement(key, type) {
    const element = document.createElement('div')
    element.setAttribute('id', `${type}${key}`)
    element.setAttribute('class', `${type}`)
    if (type === 'label') {
        const h2 = document.createElement('h2')
        const text = document.createTextNode(`${key}`)
        element.appendChild(h2.appendChild(text))
    }
    return element
}

export function reload() {
    location.reload();
}