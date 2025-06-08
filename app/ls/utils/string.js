capitalize = (value) =>
    `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`

stringFormatter = (value) =>
    typeof(value) === 'string' ?
    (value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim() :
    value

getMonths = () => ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']


window.utils = Object.assign(window.utils || {}, {
    capitalize,
    stringFormatter,
    getMonths
})