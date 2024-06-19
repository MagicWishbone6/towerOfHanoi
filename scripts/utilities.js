export function createElement(number, type) {
    const element = document.createElement('div')
    element.setAttribute('id', `${type}${number}`)
    element.setAttribute('class', `${type}`)
    if (type === 'label') {
        const h2 = document.createElement('h2')
        const text = document.createTextNode(`${number}`)
        element.appendChild(h2.appendChild(text))
    }
    return element
}

export function reload() {
    location.reload();
}