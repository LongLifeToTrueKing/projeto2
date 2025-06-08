function Aba(contentClass = '.main-content', abaClass = '.aba') {
    this.contentClass = contentClass
    this.abaClass = abaClass
}
Aba.prototype.show = function(idContent, idAba) {
    document
        .querySelectorAll(this.contentClass)
        .forEach(content => {
            if (content.id === idContent)
                content.classList.remove('hidden')
            else
                content.classList.add('hidden')
        })
    if (!idAba) return
    const abas = document.querySelectorAll(this.abaClass)
    abas.forEach(aba => {
        if (aba.id === idAba) {
            aba.classList.add('text-white', 'focus:text-blue-800', 'bg-blue-600', 'hover:text-white', 'hover:bg-blue-500')
            aba.classList.remove('bg-gray-300', 'hover:bg-blue-600', 'hover:opacity-70', 'text-gray-700')
        } else {
            aba.classList.add('bg-gray-300', 'hover:bg-blue-600', 'hover:opacity-70', 'hover:text-white', 'text-gray-700')
            aba.classList.remove('text-blue-800', 'bg-blue-600', 'hover:bg-blue-500', 'text-white')
        }
    })
}

Aba.prototype.isActive = function(idContent) {
    return !Array.from(document.querySelectorAll(this.contentClass))
        .find((element) => element.id == idContent).className.includes('hidden')
}