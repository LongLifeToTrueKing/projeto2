function ListagemFormula({
    id,
    formulas,
    onRemoveFormula
}) {
    this.id = id
    this.formulas = formulas
    this.formulasFiltered = formulas
    this.onRemoveFormula = onRemoveFormula
    this.abaAccordionController = new Aba('.wrapper-listagem', '.aba-accordion')
    window.controllers.ListagemFormula = this
}
ListagemFormula.prototype.updateFormulas = function(fromAba = '') {
    const inputFormula = document.getElementById('search-for')
    const query = (inputFormula.value || '').trim().toLowerCase()
    this.formulasFiltered = this.formulas.filter(({
        name
    }) => (name || '').toLowerCase().includes(query))
    this.renderList()

    Array.from($('button[id^="aba-"]')).forEach(element => {
        const typeAba = element.getAttribute('type-formula')
        if (!this.formulasFiltered.some(({
                type
            }) => type === typeAba)) {
            element.disabled = true
            element.style.pointerEvents = 'none'
            element.style.opacity = '0.4'
        }
    })

    const abaToActive = !this.formulasFiltered.filter(({
        type
    }) => type === fromAba).length ? '' : fromAba
    this.handleAbas(abaToActive)
}
ListagemFormula.prototype.afterRender = function(abaToActive) {
    const inputFormula = document.getElementById('search-for')
    const iSearchFormula = document.getElementById('i-search-for')

    inputFormula.onkeyup = window.utils.debounce((event) => {
        event.preventDefault()
        this.updateFormulas()
    }, 300)

    iSearchFormula.onclick = this.updateFormulas.bind(this)

    this.handleAbas(abaToActive)
}
ListagemFormula.prototype.handleAbas = function(abaToActive) {
    document.querySelectorAll('button[type-formula]').forEach(element => {
        const type = element.getAttribute('type-formula')
        element.onclick = () => this.abaAccordionController.show(`${ type }-wrapper-listagem`, `aba-${ type }`)
    })

    const firstAbaActive = abaToActive || Array.from($('button[id^="aba-"]')).find(element => !element.disabled) ? .id.split('-').pop() || ''
    if (!firstAbaActive)
        return $('#not-found').removeClass('d-none')
    this.abaAccordionController.show(`${ firstAbaActive }-wrapper-listagem`, `aba-${ firstAbaActive }`)
}
ListagemFormula.prototype.edit = function(id) {
    const index = this.formulas.findIndex(form => form.id === id)
    const formula = this.formulas[index]
    if (!formula) return

    const onUpdateFormula = (newFormula) => {
        this.formulas.splice(index, 1, newFormula)
        this.updateFormulas(newFormula.type)
    }

    const formulaModal = new window.components.FormulaModal(onUpdateFormula)

    formulaModal.edit(formula)
}
ListagemFormula.prototype.remove = function(id) {
    const index = this.formulas.findIndex(form => form.id === id)
    const formula = this.formulas[index]
    if (!formula) return

    const onSuccess = () => {
        this.formulas.splice(index, 1)
        this.onRemoveFormula(this.formulas, formula)
        setTimeout(() => {
            this.updateFormulas(formula.type)
        }, 1);
    }

    window.services.FormulaService.remove(formula, onSuccess)
}
ListagemFormula.prototype.createList = function() {
    const list = document.createElement('div')
    const idList = `${ this.id }-list`
    list.setAttribute('id', idList)
    const container = document.getElementById(this.id)
    container.appendChild(list)
}
ListagemFormula.prototype.renderList = function() {
    const getAliasType = (type) => {
        switch (type) {
            case 'Quantidade Conta':
                return 'Quantidade por Conta'
            case 'Personalizado':
                return 'Personalizada'
            case 'Histórico Conta':
                return 'Historico por Conta'
            case 'Histórico Valor':
                return 'Historico por Valor'
            case 'Ocorrência Mensal':
                return 'Ocorrencia mensal'
            default:
                return type
        }
    }

    const startingDiv = `
      <div class="flex flex-row justify-space-between mt-3">
         <div class="grid grid-flow-col gap-x-2 rounded overflow-auto">
            ${
               ['Quantidade Conta', 'Histórico Valor', 'Saldo invertido', 'Histórico Conta', 'Personalizado', 'Ocorrência Mensal']
                  .map(type => {
                     const typeAlias = getAliasType(type)
                     const operation = window.components.FormulaModal.getOperByType(typeAlias)
                     const hasType = this.formulas.find(({ type: typeFormula }) => typeAlias === typeFormula)
                     return ` <
        div class = "relative" >
        <
        button $ {
            hasType ? '' : 'disabled style="pointer-events: none; opacity: 0.4"'
        }
    type = "button"
    id = "aba-${ typeAlias }"
    class = "relative align-middle aba-accordion text-gray-800 flex bg-gray-300 hover:bg-gray-400 font-semibold py-2 px-4 border-b-4 ${operation === 'Consulta' ? 'border-blue-400' : 'border-yellow-500'} rounded"
    type - formula = "${ typeAlias }" >
        <
        span class = "ml-2" > $ {
            type
        } < /span> <
        /button> <
        /div>
    `
                  }
               ).join('')
            }
         </div>
      </div>
      <div id="Ocorrencia_accordion-formulas-list" class="card flex flex-col w-full p-0">
         <div id="Ocorrencia_collapse-formulas-list" aria-labelledby="heading-formulas-list" data-parent="#accordion-formulas-list">
            <div class="card-body flex flex-col">
               <div class="p-2 w-full">
                  <div id="not-found" class="d-none m-3">
                     <h1 class="text-center font-bold text-lg" style="color:#2C85AB">
                        Nenhuma fórmula encontrada
                     </h1>
                  </div>`

    const endingDiv = `
          </div>
        </div>
      </div>
    </div>
  `

    const formulasGroupedByType = this.formulasFiltered
        .reduce(function(totalAudit, formula, index) {
            if (!totalAudit[formula.type])
                totalAudit[formula.type] = ''

            totalAudit[formula.type] += `
        <div class="bg-white p-1 my-1 shadow-xl">
          <div class="rounded p-4 cursor-pointer hover:bg-gray-200" onmouseover="Content.show('Ocorrencia_btnEditOcorrencia-${index}'); Content.show('Ocorrencia_btnRemoveOcorrencia-${index}');" onmouseleave="Content.hide('Ocorrencia_btnEditOcorrencia-${index}'); Content.hide('Ocorrencia_btnRemoveOcorrencia-${index}')" onclick="window.controllers.ListagemFormula?.edit('${ formula.id }')">
            <div class="flex flex-row justify-between">
              <div class="flex flex-col w-full">
                <span class="font-medium text-lg text-left">
                  ${ formula.name }
                  <span class="font-normal text-md text-gray-400">
                    ➥ ${ window.components.FormulaField.getFilterNameFromOcorrencia(formula) }
                  </span>
                </span>
              </div>
              <div class="flex flex-row space-x-4 max-w-16 justify-end px-4">
                <svg
                  id="Ocorrencia_btnEditOcorrencia-${index}"
                  onclick="event.stopPropagation(); window.controllers.ListagemFormula.edit('${ formula.id }')"
                  class="my-auto w-6 h-6 cursor-pointer opacity-0 transition-opacity duration-500 text-gray-500 hover:text-yellow-500"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
                <svg
                  id="Ocorrencia_btnRemoveOcorrencia-${index}"
                  onclick="event.stopPropagation(); window.controllers.ListagemFormula.remove('${ formula.id }')"
                  class="my-auto w-6 h-6 cursor-pointer opacity-0 transition-opacity duration-500 text-gray-500 hover:text-red-500"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      `
            return totalAudit
        }, {})
    Object.keys(formulasGroupedByType).forEach(key => {
        formulasGroupedByType[key] = `
         <div class="hidden wrapper-listagem" id="${key}-wrapper-listagem">
            ${formulasGroupedByType[key]}
         </div>
      `
    })
    const list = document.getElementById(`${ this.id }-list`)
    list.innerHTML =
        startingDiv +
        Object.values(formulasGroupedByType).join('') +
        endingDiv
}
ListagemFormula.prototype.render = function(abaToActive) {
    this.createList()
    this.renderList()
    setTimeout(() => this.afterRender(abaToActive), 1)
}
window.components = Object.assign(window.components || {}, {
    ListagemFormula
})