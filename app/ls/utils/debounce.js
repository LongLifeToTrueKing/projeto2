const debounce = function(func, delay) {
    let inDebounce
    return function() {
        const context = this
        const args = arguments
        clearTimeout(inDebounce)
        inDebounce = setTimeout(function() {
            func.apply(context, args)
        }, delay)
    }
}
window.utils = Object.assign(window.utils || {}, {
    debounce
})