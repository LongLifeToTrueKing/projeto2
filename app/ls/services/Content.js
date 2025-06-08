function Content() {}
Content.show = function(id) {
    document.getElementById(id).classList.remove('opacity-0')
    document.getElementById(id).classList.add('opacity-100')
}
Content.hide = function(id) {
    document.getElementById(id).classList.add('opacity-0')
    document.getElementById(id).classList.remove('opacity-100')
}