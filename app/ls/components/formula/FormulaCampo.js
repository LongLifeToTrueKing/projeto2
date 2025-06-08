function FormulaCampo() {}

FormulaCampo.textOptions = function(child) {
    const options = [{
            value: "includes",
            label: "contém"
        },
        {
            value: "nincludes",
            label: "não contém"
        },
        {
            value: "equals",
            label: "é igual a"
        },
        {
            value: "different",
            label: "é diferente de"
        },
        {
            value: "startswith",
            label: "começa com"
        },
        {
            value: "nstartswith",
            label: "não começa com"
        },
        {
            value: "endswith",
            label: "termina com"
        },
    ]
    const filterOption = ({
            value
        }, child) =>
        !['CtCre', 'CtDeb', 'Conta'].includes(child.field) || ['equals', 'different'].includes(value)
    return options
        .filter(option => filterOption(option, child))
        .map(({
                value,
                label
            }) =>
            `<option ${ child.compare === value ? 'selected' : ''} value="${ value }">${ label }</option>`
        ).join('')
}
FormulaCampo.numberOptions = function(child, type) {
    const excludeOptions = [{
        type: 'Historico por Valor',
        values: ['different']
    }]
    const excludeOptionsFn = (value, {
        type: typeExclude,
        values: optionValue
    }) => typeExclude === type && optionValue.includes(value)
    const options = [{
            value: 'equals',
            label: 'é igual a'
        },
        {
            value: 'different',
            label: 'é diferente de'
        },
        {
            value: 'greater',
            label: 'maior que'
        },
        {
            value: 'lesser',
            label: 'menor que'
        },
        {
            value: 'greaterequals',
            label: 'maior ou igual a'
        },
        {
            value: 'lesserequals',
            label: 'menor ou igual a'
        },
    ].filter(({
        value
    }) => !(excludeOptions.find(option => excludeOptionsFn(value, option))))
    return options
        .map(({
                value,
                label
            }) =>
            `<option ${child.compare === value ? 'selected' : ''} value="${value}"> ${ label }</option>`
        ).join('')
}
FormulaCampo.contentCondicaoCampo = function(child, isRoot, index, type) {
    const isCustomField = child.id.includes('custom')
    if (isCustomField)
        return this.generateCustomField(child)
    const isDisableSelect = ['CtCre', 'CtDeb', 'Conta'].includes(child.field) && type !== 'Personalizada'
    return `
      <div class="col">
         <label class="block condicao grid grid-flow-col my-1 grid-cols-12" id="Ocorrencia_${child.id}-filter">
         <input class="hidden" name="campo-field" value="${ child.field }" />
         <label class="my-auto w-full col-span-3">
            <span class="px-2 text-gray-700 font-normal">${child.placeholder}</span>
         </label>
            <select ${isDisableSelect ? 'disabled' : ''} class="form-select block w-full col-span-5" id="Ocorrencia_${child.id}-select${ !isRoot ? `-${index}` : '' }" name="campo-compare" onchange="FormulaCampo.onChangeCondicao('Ocorrencia_${child.id}')">
            ${
               child.type === 'number' ?
                  FormulaCampo.numberOptions(child, type) :
                  FormulaCampo.textOptions(child)
            }
            </select>
         <input id="Ocorrencia_${child.id}-input${ !isRoot ? `-${index}` : '' }" name="campo-value" class="form-input w-full col-span-5" value="${child.value || ''}" ${ child.field === 'Valor' ? 'autcomplete="off" onkeyup="FormulaCampo.valueMask(event, this)" onkeydown="FormulaCampo.checkKeysValue(event)"' : '' }>
         </label>
      </div>
   `.trim()
}
FormulaCampo.onChangeCondicao = function(id) {
    const value = document.getElementById(`${id}-select`) ? .value
    if (!value) return
    document.getElementById(`${id}-input`).style.display = ['exists', 'nexists'].includes(value) ?
        'none' :
        'block'
}
FormulaCampo.contentCampo = function(campo, customId, type) {
    return `
    <div id="Ocorrencia_wrapper-${campo.id}">
        ${
          (campo.children || [campo]).reduce(function (total, child, index) {
            const isRoot = campo.id == child.id
            total += FormulaCampo.contentCondicaoCampo({ ...child, id: customId || child.id }, isRoot, index, type)
            return total
          }, '')
        }
    </div>
  `.trim()
}
FormulaCampo.getDefault = function() {
    return [{
            placeholder: 'Histórico',
            id: 'historico',
            field: 'Hist'
        },
        {
            placeholder: 'Valor',
            id: 'valor',
            type: 'number',
            field: 'Valor'
        },
        {
            placeholder: 'Quantidade Mensal',
            id: 'quantidade',
            type: 'number',
            field: 'Quantidade'
        },
        {
            placeholder: 'Conta',
            id: 'conta',
            children: [{
                    placeholder: 'Ct. Débito',
                    id: 'conta-debito',
                    field: 'CtDeb'
                },
                {
                    placeholder: 'Ct. Crédito',
                    id: 'conta-credito',
                    field: 'CtCre'
                }
            ]
        },
        {
            placeholder: 'Saldo',
            id: 'saldo',
            children: [{
                    placeholder: 'Conta',
                    id: 'single-conta',
                    field: 'Conta'
                },
                {
                    placeholder: 'Saldo Invariavel',
                    id: 'custom-select-saldo',
                    field: 'saldoInvariavel'
                },
            ]
        },
    ]
}
FormulaCampo.filterToCampos = function(filters) {
    const groupByFilter =
        filters.filter(filter => filter.field !== 'Meses').reduce(
            (total, filter) => {
                const parent = FormulaCampo.getDefault().find(({
                        field: parentField,
                        children
                    }) =>
                    parentField === filter.field ||
                    children && children.some(({
                        field: childField
                    }) => childField === filter.field)
                )

                return Object.assign(total, {
                    [parent.id]: Object.assign(parent, !parent.children ? {
                        ...parent,
                        ...filter,
                    } : {
                        ...parent,
                        children: parent.children.map((children, index) =>
                            children.field === filter.field ?
                            ({ ...children,
                                ...filter
                            }) :
                            (total[parent.id] || parent).children[index]
                        )
                    })
                })
            }, {})
    return Object.values(groupByFilter)
}
FormulaCampo.camposOcorrenciaDefault = () => (
    [FormulaCampo.getDefault()[0], FormulaCampo.getDefault()[3]]
)
FormulaCampo.getHtmlForCampos = function({
    camposToRender,
    isEditing,
    type
}) {
    const camposSelected = FormulaCampo.getCamposOcorrenciaSelecionada(isEditing)
    return (camposToRender || camposSelected)
        .reduce((total, campo) => total + FormulaCampo.contentCampo(campo, '', type), '').trim()
}
FormulaCampo.getCamposOcorrenciaSelecionada = function(isEditing) {
    const elementId = `Ocorrencia_campos-select-${isEditing ? 'editar' : 'cadastrar' }`
    const formulaSelecionada = document.getElementById(elementId)
    if (!formulaSelecionada) return FormulaCampo.camposOcorrenciaDefault()

    const camposOcorrencia = FormulaField.getFieldsFromType(formulaSelecionada.value) || []
    return FormulaCampo.getDefault().filter(({
        id
    }) => camposOcorrencia.includes(id))
}
FormulaCampo.valueMask = function(_, element) {
    const rawValue = element.value.replace(/^(0,0?)(.*)$/g, '$2').replace(/,/g, '')
    const valueWithPad = rawValue.length ? rawValue.padStart(3, '0') : ''
    element.value = valueWithPad.replace(/,/g, '').replace(/^(\d+)(\d{2})$/, '$1,$2')
}
FormulaCampo.checkKeysValue = function(event) {
    const {
        key
    } = event
    if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'ArrowLeft', 'ArrowRight'].includes(key))
        return event.preventDefault()
}
FormulaCampo.generateCustomField = function(child) {
    switch (child.id) {
        case 'custom-select-saldo':
            return this.renderSelectSaldo(child)
        default:
            return () => ''
    }
}

FormulaCampo.renderSelectSaldo = function(child) {
    const options = [{
            value: 'credor',
            label: 'credor'
        },
        {
            value: 'devedor',
            label: 'devedor'
        }
    ]
    const renderOptions = () => options.map(({
            value,
            label
        }) =>
        `<option ${ child.value === value ? 'selected' : ''} value="${ value }">${ label }</option>`
    ).join(' ')

    return `
      <div class="col">
         <label class="block condicao grid grid-flow-col my-1 grid-cols-12" >
            <label class="my-auto w-full col-span-3">
               <span class="px-2 text-gray-700 font-normal">Saldo Invariavel</span>
            </label>
            <select id="${child.id}" class="form-select block w-full col-span-12" name="custom-select" type="${child.field}">
                  ${renderOptions()}
            </select>
         </label>
      </div>
   `.trim()
}
window.components = Object.assign(window.components || {}, {
    FormulaCampo
})