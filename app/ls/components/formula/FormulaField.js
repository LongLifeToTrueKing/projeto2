function FormulaField() {}
FormulaField.options = [{
        type: 'Historico por Conta',
        fields: ["historico", "conta"]
    },
    {
        type: 'Historico por Valor',
        fields: ["historico", "valor"]
    },
    {
        type: 'Quantidade por Conta',
        fields: ["quantidade", "conta"]
    },
    {
        type: 'Saldo invertido',
        fields: ["saldo"]
    },
    {
        type: 'Ocorrencia mensal',
        fields: ["historico", "valor", "conta"]
    },
    {
        type: 'Personalizada',
        fields: ["historico", "quantidade", "valor", "conta"]
    },
]
FormulaField.getFieldsFromType = function(type) {
    const option = FormulaField.options.find(formula => formula.type === type) || FormulaField.options[0]
    return option.fields
}
FormulaField.getTypeOptions = function(formula) {
    const isSelected = (type, formula, index) => (
        (!formula.type && index === 0) || formula.type === type
    )
    return FormulaField.options
        .map(({
                type
            }, index) =>
            `<option
        value="${type}"
        ${ isSelected(type, formula, index) ? 'selected' : '' }
      >
        ${ type }
      </option>`
        )
        .join('')
}
FormulaField.getFilterFieldName = function(field) {
    switch (field) {
        case 'hist':
        case 'Hist':
        case 'historico':
            return 'histórico'
        case 'CtDeb':
            return 'conta débito'
        case 'CtCre':
            return 'conta crédito'
        case 'Quantidade':
            return 'quantidade mensal'
        case 'saldoInvariavel':
            return 'saldo invariável'
        default:
            return `${(field || '')}`.toLowerCase()
    }
}
FormulaField.getFilterCompareName = function(compare) {
    switch (compare) {
        case 'equals':
            return 'igual a'
        case 'different':
            return 'diferente de'
        case 'greater':
            return 'maior que'
        case 'lesser':
            return 'menor que'
        case 'greaterequals':
            return 'maior ou igual a'
        case 'lesserequals':
            return 'menor ou igual que'
        case 'startswith':
            return 'começa com'
        case 'nstartswith':
            return 'não começa com'
        case 'endswith':
            return 'termina com'
        case 'nendswith':
            return 'não termina com'
        case 'includes':
            return 'contém'
        case 'nincludes':
            return 'não contém'
        case 'exists':
            return 'existe'
        case 'nexists':
            return 'não existe'
        default:
            return '?'
    }
}
// returns function === (field, value) => boolean
FormulaField.getFunctionFromFilter = function(compare) {
    switch (compare) {
        case 'between-dates':
            return function(field, {
                start,
                end
            }) {
                const [day, month, year] = (field || '').split('/')
                const time = new Date(year, month, day).getTime()
                const [yearStart, monthStart, dayStart] = start.split('-')
                const startDate = new Date(yearStart, monthStart, dayStart)
                const [yearEnd, monthEnd, dayEnd] = end.split('-')
                const endDate = new Date(yearEnd, monthEnd, dayEnd)
                return time >= startDate.getTime() && time <= endDate.getTime()
            }
        case 'equals':
            return function(field, value) {
                return (!/^\d+\.\d{2}$/.test(field) ? `${(field || '').trim()}`.toLowerCase() : field) === (!/^\d+\.\d{2}$/.test(field) ? `${(value || '').trim()}`.toLowerCase() : value)
            }
        case 'equalsNumber':
            return function(field, value) {
                return Number(field) === Number(value)
            }
        case 'different':
            return function(field, value) {
                return (!/^\d+\.\d{2}$/.test(field) ? `${(field || '').trim()}`.toLowerCase() : field) !== (!/^\d+\.\d{2}$/.test(field) ? `${(value || '').trim()}`.toLowerCase() : value)
            }
        case 'differentNumber':
            return function(field, value) {
                return Number(field) !== Number(value)
            }
        case 'greater':
            return function(field, value) {
                return Number(field) > Number(value)
            }
        case 'lesser':
            return function(field, value) {
                return Number(field) < Number(value)
            }
        case 'greaterequals':
            return function(field, value) {
                return Number(field) >= Number(value)
            }
        case 'lesserequals':
            return function(field, value) {
                return Number(field) <= Number(value)
            }
        case 'startswith':
            return function(field, value) {
                return `${(field || '').trim()}`.toLowerCase().startsWith(`${(value || '').trim()}`.toLowerCase())
            }
        case 'nstartswith':
            return function(field, value) {
                return !`${(field || '').trim()}`.toLowerCase().startsWith(`${(value || '').trim()}`.toLowerCase())
            }
        case 'endswith':
            return function(field, value) {
                return `${(field || '').trim()}`.toLowerCase().endsWith(`${(value || '').trim()}`.toLowerCase())
            }
        case 'nendswith':
            return function(field, value) {
                return !`${(field || '').trim()}`.toLowerCase().endsWith(`${(value || '').trim()}`.toLowerCase())
            }
        case 'includes':
            return function(field, value) {
                return `${(field || '').trim()}`.toLowerCase().includes(`${(value || '').trim()}`.toLowerCase())
            }
        case 'nincludes':
            return function(field, value) {
                return !`${(field || '').trim()}`.toLowerCase().includes(`${(value || '').trim()}`.toLowerCase())
            }
        case 'exists':
            return function(field, value) {
                return !!field
            }
        case 'nexists':
            return function(field, value) {
                return !field
            }
        default:
            return function() {
                return false
            }
    }
}

FormulaField.getFilterInverse = function(compare) {
    const compares = ['equals', 'greater', 'greaterequals', 'lesserequals', 'startswith', 'endswith', 'includes', 'exists']
    const comparesInverse = ['different', 'lesser', 'lesser', 'greater', 'nstartswith', 'nendswith', 'nincludes', 'nexists']
    return (
        compares.includes(compare) ?
        comparesInverse[compares.findIndex(value => value == compare)] :
        compares[comparesInverse.findIndex(value => value == compare)]
    )
}

FormulaField.isFilterInverse = function(field, type) {
    return [{
            type: 'Historico por Conta',
            fields: ['CtDeb', 'CtCre']
        },
        {
            type: 'Historico por Valor',
            fields: ['Valor']
        }
    ].some(filter => filter.type == type && filter.fields.includes(field))
}

FormulaField.compareFilter = function({
    filter,
    lancamento,
    type,
    shouldReturnFn = false
}) {
    const isNumber = (field, compare) => ['Quantidade', 'Valor'].includes(field) && ['equals', 'different'].includes(compare)
    const isAccountName = filter.field === 'HP'
    const filterCompare = FormulaField.isFilterInverse(filter.field, type) ?
        FormulaField.getFilterInverse(filter.compare) :
        filter.compare
    const compareFn = FormulaField.getFunctionFromFilter(`${filterCompare}${isNumber(filter.field, filter.compare) ? 'Number' : ''}`)
    if (shouldReturnFn) return compareFn

    const multipleFilterValues = filterCompare == 'between-dates' ? [filter.value] : filter.value.split(';')
    const fn = FormulaField.isFilterInverse(filter.field, type) ? 'every' : 'some'
    return multipleFilterValues[fn](value => {
        if (!value) return true
        if (isAccountName)
            return (lancamento[filter.field] ? .split('|') || [])
                .map(accoutName => window.utils.stringFormatter(accoutName.split('&').shift()))
                .some(accoutName => compareFn(accoutName, window.utils.stringFormatter(value)))
        else
            return compareFn(window.utils.stringFormatter(lancamento[filter.field]), window.utils.stringFormatter(value))
    })

}

FormulaField.getFiltersInfo = function(filters) {
    const isAllMonthsSelected = (filter) => filter.field === 'Meses' && filter.value.split(';').length === 12
    return Object.values(
        filters.reduce((total, filter) =>
            Object.assign(total, {
                [filter.field]: `${
            // se conter já um filtro deste campo, adiciona um "e"
            total[filter.field]
              ? `${total[filter.field]} e `
              : ''
          }${
            // nome do campo: valor, quantidade mensal, etc...
            this.getFilterFieldName(filter.field)
          } ${
            // nome do filtro de comparação: maior que, menor que, igual a, etc...
            this.getFilterCompareName(filter.compare)
          } "${ isAllMonthsSelected(filter) ? 'todos os meses' : (filter.value).replace(/;/g, ', ') }"`
            }), {})
    )
}
FormulaField.getFilterNameFromOcorrencia = function({
    filter
}) {
    const filterInfos = this.getFiltersInfo(filter.filter(filter => !!filter.value))
    return window.utils.capitalize(`${filterInfos.slice(0, -1).join(', ')}${ filterInfos.length > 1 ? ' e ' : '' }${filterInfos.pop()}`)
}
window.components = Object.assign(window.components || {}, {
    FormulaField
})