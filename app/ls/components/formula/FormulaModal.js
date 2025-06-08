function FormulaModal(onUpdateFormula) {
    this.onUpdateFormula = onUpdateFormula
    this.currentEditFormula = {}
    this.monthsFilter = []
    this.renderModal()
    setTimeout(() => {
        $('.modal-backdrop').show()
        $(`#modal`).show()
        $(`#modal`).modal('show')
    }, 1)
    window.controllers.FormulaModal = this
}
FormulaModal.prototype.renderFormula = function(formula, opName = 'cadastrar') {
    const isEditing = opName === 'editar'
    const element = document.getElementById('modal')
    element.innerHTML = `
      <div class="card modal-dialog modal-dialog-centered" style="max-width: 700px">
         <span class="mx-auto text-lg">
            <span>${ window.utils.capitalize(opName) } fórmula <span id="modal-title">(${FormulaModal.getOperByType(formula.type || 'Historico por Conta', true)})</span></span>
            <i class="ti-help-alt align-middle hover:text-blue-500" id="tooltip-info" data-toggle="tooltip" data-placement="right"></i>
         </span>
         <div class="card-body">
            <div class="m-auto">
               <label class="block">
               <span class="text-gray-700">Tipo de Fórmula</span>
               <select id="Ocorrencia_campos-select-${opName}" value="${ formula.type || 'Historico por Conta' }" class="form-select mt-1 block w-full" onchange="window.controllers.FormulaModal.renderizarCampos(${isEditing})">
                  ${ window.components.FormulaField.getTypeOptions(formula) }
               </select>
               </label>
            </div>
            <form id="Ocorrencia_dataForm-${opName}" name="dataForm" onsubmit="window.controllers.FormulaModal.validateFields()">
               <div id="Ocorrencia_fields-${opName}" class="container bg-gray-100 shadow p-3">
                  ${
                     formula.filter
                        ? window.components.FormulaCampo.getHtmlForCampos({ camposToRender: window.components.FormulaCampo.filterToCampos(formula.filter), type: formula.type })
                        : window.components.FormulaCampo.getHtmlForCampos({ type: 'Historico por Conta' })
                  }
               </div>
            </form>
            <div class="m-auto">
               <label class="block">
               <span class="text-gray-700">Nome da Fórmula</span>
               <input id="Ocorrencia_descricao-${isEditing ? 'editar' : 'cadastrar'}" name="descricao" class="form-input mt-1 w-full" value="${ formula.name || '' }">
               ${
                  isEditing
                  ? `
                  <input id="Ocorrencia_id-editar" name="id" class="hidden" value="${ formula.id || ''}" />
                  <input id="Ocorrencia_empresa-editar" name="empresa" class="hidden" value="${ formula.empresa || ''}" />
                  `
                  : ''
               }
               </label>
            </div>
         </div>
         <div class="modal-footer" style="padding: 3px">
            <button type="button" class="btn btn-success" onclick="window.controllers.FormulaModal.save()"><i class="ti-save"></i> &nbsp; Salvar &nbsp;</button>
            <button type="button" class="btn btn-danger"  onclick="window.controllers.FormulaModal.close()"><i class="ti-close"></i> &nbsp; Cancelar &nbsp; </button>
         </div>
      </div>
    `

    $('#tooltip-info').tooltip({
        html: true,
        template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div id="tooltip-inner" class="tooltip-inner" style="min-width: 400px"></div></div>',
        title: this.getHtmlTooltip(FormulaModal.getOperByType(formula.type || 'Historico por Conta'))
    })

    if (['Quantidade por Conta', 'Personalizada'].includes(formula ? .type))
        this.renderMultiSelect(isEditing ? 'editar' : 'cadastrar', formula.filter.find(filter => filter.field === 'Meses'))
}
FormulaModal.prototype.renderCampos = function(isEditing, camposToRender, type) {
    const opName = isEditing ? 'editar' : 'cadastrar'
    const modalTitleElem = document.getElementById('modal-title')
    const title = modalTitleElem.textContent.replace(/^(.*?)\((.*)\)$/, function(_, ...args) {
        return `${args.shift().trim()} (${FormulaModal.getOperByType(type, true)})`
    }.bind(this))

    modalTitleElem.textContent = title
    document.getElementById(`Ocorrencia_fields-${opName}`).innerHTML = window.components.FormulaCampo.getHtmlForCampos({
        camposToRender,
        isEditing,
        type
    })
}
FormulaModal.prototype.renderizarCampos = function(isEditing) {
    const opName = isEditing ? 'editar' : 'cadastrar'
    const inputType = document.getElementById(`Ocorrencia_campos-select-${opName}`).value
    const camposSelected = FormulaCampo.getCamposOcorrenciaSelecionada(isEditing)
    this.renderCampos(isEditing, camposSelected, inputType)
    $('#tooltip-info').attr('data-original-title', this.getHtmlTooltip(FormulaModal.getOperByType(inputType)))
    if (['Quantidade por Conta', 'Personalizada'].includes(inputType))
        this.renderMultiSelect(opName)
}
FormulaModal.prototype.renderMultiSelect = function(opName, {
    value: months
} = []) {
    const monthsToFill = months ? months.split(';') : window.utils.getMonths()
    this.monthsFilter = monthsToFill

    document.getElementById(`Ocorrencia_fields-${opName}`)
        .insertAdjacentHTML('beforeend', `
         <div class="col">
            <label class="block condicao grid grid-flow-col my-1 grid-cols-12" id="Ocorrencia_months-filter">
               <label class="my-auto w-full col-span-3">
                  <span class="px-2 text-gray-700 font-normal">Meses</span>
               </label>
               <select id="multiselect-months" class="form-select block w-full col-span-12" multiple="multiple">
                  ${
                     window.utils.getMonths().map(month =>
                        `
                           <option value=${month} ${monthsToFill.includes(month) ? 'selected' : ''}>${month}</option>
                        `
                     )
                  }
               </select>
            </label>
         </div>
      `)

    $('#multiselect-months').multiselect({
        buttonClass: 'custom-select',
        selectAllText: 'Todos os meses',
        selectAllValue: 'all_months',
        includeSelectAllOption: true,
        delimiterText: ', ',
        numberDisplayed: 1,
        nSelectedText: 'meses selecionados',
        nonSelectedText: 'Nenhum mês selecionado',
        allSelectedText: 'Todos',
        selectAllNumber: false,
        buttonWidth: false,
        buttonContainer: '<div class="btn-group" style="width: 100%" />',
        onInitialized: function(_, _2) {
            $('.multiselect-native-select').addClass('col-span-12')
            $('.custom-select, .multiselect-container').css('width', '100%')
        },
        onChange: function([{
            value
        }], checked) {
            const months = window.utils.getMonths()
            if (checked)
                this.monthsFilter.push(value)
            else
                this.monthsFilter.splice(this.monthsFilter.indexOf(value), 1)
            this.monthsFilter = this.monthsFilter.sort((monthA, monthB) => months.indexOf(monthA) - months.indexOf(monthB))
        }.bind(this),
        onSelectAll: function() {
            this.monthsFilter = window.utils.getMonths()
        }.bind(this),
        onDeselectAll: function() {
            this.monthsFilter = []
        }.bind(this),
    })
}
FormulaModal.prototype.validateFields = function(isEditing) {
    const formId = 'Ocorrencia_dataForm-' + (isEditing ? 'editar' : 'cadastrar')
    const fields = [...document.querySelectorAll(`#${ formId } input[name="campo-field"]`)].map(({
        value
    }) => value)
    const compares = [...document.querySelectorAll(`#${ formId } select[name="campo-compare"]`)].map(({
        value
    }) => value)
    const customSelects = [...document.querySelectorAll(`#${ formId } select[name="custom-select"]`)]
    const extractCampoValues = (value) => value.split(';').map(v => (v || '').trim()).join(';')
    const formatValues = (values) => values.split(';').map(value =>
        /^(-?\d{1,3}(?:\.?\d{3})*,\d{2})$/.test(value) ?
        value.replace(/\./g, '').replace(',', '.') :
        value
    ).join(';')
    const values = [...document.querySelectorAll(`#${ formId } input[name="campo-value"]`)].map(({
        value
    }) => extractCampoValues(value))
    const filterCustomSelects = customSelects.map(({
        value,
        attributes: {
            type: {
                value: attr
            }
        }
    }) => ({
        field: attr,
        compare: 'equals',
        value
    })) || []

    return fields.map((field, index) =>
        ({
            field,
            compare: compares[index],
            value: (
                field === 'Valor' ?
                formatValues(values[index]) :
                values[index]
            )
        })
    ).concat(...filterCustomSelects)
}
FormulaModal.prototype.resetForm = function() {
    document.querySelectorAll('[id^="Ocorrencia_dataForm"]').forEach(form =>
        form.reset()
    )
    document.querySelectorAll('[id^="Ocorrencia_descricao"]').forEach(element => element.value = '')
}
FormulaModal.prototype.close = function(shouldReload = false) {
    $(`#modal`).modal('hide')
    $(`#modal`).modal().hide()
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    if (location.pathname.includes('Result_Consulta.php') && shouldReload)
        window.utils.forceReload()
}

FormulaModal.prototype.saveFormula = function(formula, filterHasChanged) {
    window.services.FormulaService.upsert(formula, filterHasChanged, (newFormula) => {
        this.resetForm()
        if (this.onUpdateFormula)
            this.onUpdateFormula(newFormula)
        this.close(true)
    })
}
FormulaModal.prototype.save = function() {
    const idInput = document.getElementById("Ocorrencia_id-editar")
    const id = idInput && idInput.value
    const empresaInput = document.getElementById('Ocorrencia_empresa-editar')
    const empresa = empresaInput && empresaInput.value
    const isEditing = !!id
    const opName = isEditing ? 'editar' : 'cadastrar'
    const inputName = document.getElementById(`Ocorrencia_descricao-${ opName }`)
    const inputType = document.getElementById(`Ocorrencia_campos-select-${ opName }`)
    const name = inputName.value,
        filter = this.validateFields(isEditing),
        type = inputType.value;
    const hasMonthFilter = ['Quantidade por Conta', 'Personalizada'].includes(type)

    if (hasMonthFilter)
        filter.push({
            field: 'Meses',
            compare: 'equals',
            value: this.monthsFilter.join(';')
        })

    const filterHasChanged = isEditing && !(this.currentEditFormula.filter
        .every((oldFilter) => filter.some((newFilter) => Object.keys(newFilter).every((key) => newFilter[key] === oldFilter[key]))))

    const validation = this.validate(filter, name)

    if (validation === true)
        this.saveFormula({
            name,
            filter,
            type,
            id,
            empresa
        }, filterHasChanged)
    else
        SweetAlertaConfirmacaoP3(validation)
}
FormulaModal.prototype.validate = function(filter, name) {
    const isValidRelAccounts = !(filter.filter(({
            field
        }) => ['CtCre', 'CtDeb'].includes(field))
        .every(({
            value
        }) => value.includes(';')))
    const ctDebFilter = filter.find(({
        field
    }) => field === 'CtDeb')
    const ctCreFilter = filter.find(({
        field
    }) => field === 'CtCre')
    const monthFilter = filter.find(({
        field
    }) => field === 'Meses')
    const hasBothAccounts = (!!ctDebFilter && ctDebFilter.value) && (!!ctCreFilter && ctCreFilter.value)

    if (!filter.filter(({
            field
        }) => field !== 'Meses').some(filter => !!filter.value))
        return 'Preencha o(s) campo(s) que deseja Auditar.'
    if (hasBothAccounts) {
        if (!isValidRelAccounts)
            return 'O recurso de incluir várias contas não pode ser utilizado ao mesmo tempo em contas de débito e crédito.'
        if (ctDebFilter.value === ctCreFilter.value)
            return 'As contas de débito e crédito não podem ser iguais.'
        const accountWithValues = [ctDebFilter, ctCreFilter].find(({
            value
        }) => value.includes(';'))
        if (accountWithValues) {
            const accountWithOneValue = (accountWithValues.field === 'CtCre' ? ctDebFilter : ctCreFilter).value
            if (accountWithValues && accountWithValues.value.split(';').some(value => value === accountWithOneValue))
                return `A conta "${ accountWithOneValue }" está presente nos filtros de débito e crédito.`
        }
    }
    if (monthFilter && !monthFilter.value.length)
        return 'Selecione pelo menos um mês.'
    if (!name.length)
        return 'Informe o Nome da Fórmula.'
    return true
}
FormulaModal.prototype.edit = function(formula) {
    this.renderFormula(formula, 'editar')
    this.currentEditFormula = formula
}
FormulaModal.prototype.create = function() {
    this.renderFormula({})
    this.currentEditFormula = {}
}
FormulaModal.prototype.renderModal = function() {
    const modal = document.createElement('div')
    modal.setAttribute('id', 'modal')
    modal.classList.add('modal', 'rounded', 'fade', 'm-auto', 'h-full')
    modal.setAttribute('role', 'dialog')
    modal.setAttribute('tabindex', '-1')
    modal.setAttribute('aria-labelledby', 'modal-modalLabel')
    modal.setAttribute('aria-hidden', 'true')
    if (document.getElementById('modal'))
        document.getElementById('modal').remove()
    document.body.appendChild(modal)
}
FormulaModal.getOperByType = function(type, changeColorsElement = false) {
    const operation = ['Historico por Valor', 'Historico por Conta', 'Quantidade por Conta', 'Saldo invertido'].includes(type) ?
        'Auditoria' :
        'Consulta'

    if (changeColorsElement) {
        setTimeout(() => {
            $('#modal-title').css('color', operation == 'Consulta' ? '#2d4ef5' : '#eb6112')
        }, 1);
    }

    return operation
}

FormulaModal.prototype.getHtmlTooltip = function(type) {
    if (type == 'Auditoria')
        return `
         <p>O sistema exibirá todos os registros que divergem dos filtros.</p>
         `
    else
        return `
         <p>O sistema exibirá todos os registros que estão de acordo com os filtros.</p>
      `
}

window.components = Object.assign(window.components || {}, {
    FormulaModal
})