function FormulaList() {

}
FormulaList.createContainer = function(id) {
    const container = document.createElement('div')
    container.classList.add('flex', 'flex-col')
    const containerId = `${ id }-container-formulas`
    container.id = containerId
    return {
        containerId,
        container
    }
}
FormulaList.render = function({
    id,
    formulas,
    abaToActive = ''
}) {
    const element = document.getElementById(id)
    while (element.firstChild)
        element.removeChild(element.firstChild)
    const {
        container,
        containerId
    } = FormulaList.createContainer(id)
    element.appendChild(container)

    const onRemoveFormula = (formulas, removedFormula) =>
        FormulaList.render({
            id,
            formulas,
            abaToActive: removedFormula.type
        })

    const options = {
        id: containerId,
        formulas,
        onRemoveFormula
    }
    new window.components.ListagemFormula(options).render(abaToActive)
}
window.components = Object.assign(window.components || {}, {
    FormulaList
})