function AccordionsFormula(formulasWithLancamentos, {
    firstDate,
    lastDate,
    saldos
}) {
    this.formulasWithLancamentos = formulasWithLancamentos
    this.lastDateLancamentos = lastDate.slice(3)
    this.firstDateLancamentos = firstDate.slice(3)
    this.saldos = saldos
    window.controllers.AccordionsFormula = this
}
AccordionsFormula.prototype.onEditFormula = function(index) {
    const {
        formula
    } = this.formulasWithLancamentos[index]
    const formulaModal = new window.components.FormulaModal()
    formulaModal.edit(formula.sourceFormula || formula)
}
AccordionsFormula.prototype.onRemoveFormula = function(index) {
    const {
        formula
    } = this.formulasWithLancamentos[index]
    const onRemoveSuccess = () => window.utils.forceReload()
    window.services.FormulaService.remove(formula, onRemoveSuccess)
}
AccordionsFormula.prototype.render = function() {
    const lastDateLancamentos = this.lastDateLancamentos
    const firstDateLancamentos = this.firstDateLancamentos
    const saldos = this.saldos
    const formulasGroupedByType = this.formulasWithLancamentos
        .reduce(function(totalAudit, {
            formula,
            lancamentos,
            lancamentosGroupByMes
        }, index) {
            const getLancamentosFromDate = (date, lancGrpByMes) =>
                (date && lancGrpByMes[date] || []).length

            const getLatestMatchingIndex = (array, expression) =>
                array
                .reduce(
                    (total, elm, elmIndex) => {
                        return total.concat(
                            expression(elm, elmIndex) ?
                            (!total.length || elmIndex === (total[total.length - 1] + 1)) ?
                            elmIndex :
                            [] :
                            []
                        )
                    }, [])
                .pop()

            const getLatestLancamentoIndex = (qtLancamentos, index, array, lancGrpByMes) => {
                const expression = (elm, elmIndex) => {
                    const qtElmLancamentos = getLancamentosFromDate(elm, lancGrpByMes)
                    const qtNextElmLancamentos = getLancamentosFromDate(array[elmIndex + 1], lancGrpByMes)
                    return elmIndex >= index && (
                        qtLancamentos === qtElmLancamentos &&
                        (!array[elmIndex + 1] || qtElmLancamentos !== qtNextElmLancamentos)
                    )
                }
                const latestIndex = getLatestMatchingIndex(array, expression)
                return latestIndex
            }

            const getTotalMonthsAndYears = (firstDate, lastDate) => {
                const monthsTotal = [];
                const startDate = moment(firstDate, 'MM/YYYY');
                const endDate = moment(lastDate, 'MM/YYYY');

                while (startDate.isBefore(endDate)) {
                    monthsTotal.push(startDate.format("MM/YYYY"));
                    startDate.add(1, 'month');
                }

                if (monthsTotal[0] !== firstDate)
                    monthsTotal.unshift(firstDate)

                return monthsTotal.concat(lastDate)
            }

            const monthFilter = formula.filter.find(formula => formula.field === 'Meses')
            let allMonths = getTotalMonthsAndYears(firstDateLancamentos, lastDateLancamentos)
            if (monthFilter)
                allMonths = allMonths.filter(month => monthFilter.value.includes(window.utils.getMonths()[Number(month.split('/').shift()) - 1]))

            const qtdMonthsOnLancamentos = allMonths.reduce((totalMonthsOnLancamentos, month) => {
                if (totalMonthsOnLancamentos.length && totalMonthsOnLancamentos.indexOf(month) !== -1)
                    return totalMonthsOnLancamentos
                if (lancamentos.some(({
                        Data
                    }) => Data.slice(3) === month))
                    return totalMonthsOnLancamentos.concat(month)
                return totalMonthsOnLancamentos
            }, []).length

            const getTimelineLancamentosFromMes = (lancGrpByMes) =>
                allMonths
                .reduce((totalByMonth, monthYear, index, array) => {
                    // if (totalByMonth.length && totalByMonth[totalByMonth.length -1].latestIndex >= index)
                    //   return totalByMonth
                    const qtLancamentos = getLancamentosFromDate(monthYear, lancGrpByMes)
                    const obj = {
                        latestIndex: index,
                        months: [monthYear],
                        qtLancamentos,
                    }
                    // const latestIndex = getLatestLancamentoIndex(qtLancamentos, index, array, lancGrpByMes) || index
                    // if (latestIndex >= 0 && qtLancamentos === 0 && latestIndex !== index) {
                    //   obj.latestIndex = latestIndex
                    //   obj.months.push(array[latestIndex])
                    // }

                    if (!lancamentos.some(lancamento => lancamento.Data.slice(3) === monthYear)) {
                        const qtdFilter = formula.filter.find(({
                            field
                        }) => field === 'Quantidade')
                        obj.notMatched = 'notMatched-red'
                        if (qtdFilter && (qtLancamentos > qtdFilter.value))
                            obj.notMatched = 'notMatched-yellow'
                    }

                    return totalByMonth.concat(obj)
                }, [])
                .map(({
                        months,
                        qtLancamentos,
                        notMatched = ''
                    }, index) =>
                    `
               <li class="jtimeline-event ${ !notMatched && qtLancamentos ? 'is-active' : notMatched }" data-timestamp="${ index }">
                  Mês${ months.length > 1 ? 'es' : '' }: ${ months.length > 1 ? `${ months[0] } ~ ` : '' }${ months[months.length - 1] } <br>
                  Lançamentos: ${ qtLancamentos }
               </li>
            `
                )
                .join('')

            const operation = window.components.FormulaModal.getOperByType(formula.type) // Consulta ou Auditoria
            // if (!totalAudit[formula.type])
            //    totalAudit[formula.type] = `
            //       <div class="hidden border-b-2 text-center text-lg rounded uppercase p-3 border-gray-300 font-medium tracking-widest ${ Object.keys(totalAudit).length > 1 ? 'mt-3' : '' }" style="background-color: ${operation == 'Consulta' ? '#60a5fa' : '#ec874d'}; color: white;">Tipo: ${ formula.type } (${operation})</div>
            //    `
            if (!totalAudit[formula.type])
                totalAudit[formula.type] = ''

            const accountsDescriptionFiltered = formula.filter
                .filter(({
                    field,
                    value
                }) => value && ['CtDeb', 'CtCre', 'Conta'].includes(field))
                .map(({
                    value: filterConta
                }) => saldos.find(({
                    CtCre,
                    CtDeb
                }) => [CtCre, CtDeb].includes(filterConta)) || ({
                    accountNotFound: filterConta
                }))
                .reduce((totalDescription, {
                    HP: infoAccountRaw,
                    CtCre,
                    CtDeb,
                    accountNotFound
                }) => {
                    const accountName = infoAccountRaw ? .split('&').shift()
                    const infoAccount = `(${ CtCre || CtDeb || accountNotFound }) ${accountName || 'Conta não encontrada'}`
                    return totalDescription.concat(infoAccount)
                }, [])
                .sort((descriptionA, descriptionB) => {
                    const regexAccountNumber = /^\((\d+)\).*$/
                    const accountA = Number(descriptionA.replace(regexAccountNumber, '$1'))
                    const accountB = Number(descriptionB.replace(regexAccountNumber, '$1'))
                    return accountA - accountB
                })
                .filter((description, index, array) => array.slice(index + 1).indexOf(description) === -1)

            const accountsDescription = accountsDescriptionFiltered.length ? accountsDescriptionFiltered : ['Contas diversas']
            const allAccountsNotFound = () =>
                accountsDescription.every(account => account && account.includes('Conta não encontrada'))

            totalAudit[formula.type] += `
        <div class="card cursor-pointer" onmouseover="Content.show('btnEditAudit-${index}'); Content.show('btnRemoveAudit-${index}')" onmouseleave="Content.hide('btnEditAudit-${index}'); Content.hide('btnRemoveAudit-${index}')" onclick="window.controllers.ListagemFormula?.edit('${ formula.id }')">
          <div class="card-header" id="heading${index+1}">
            <div class="flex flex-row justify-between">
              <button type="button" class="btn btn-link col-11 text-left" data-toggle="collapse" data-target="#collapse${index+1}" aria-expanded="true" aria-controls="collapseOne">
                <div class="flex space-y-2 justify-between row align-items-center">
                  <span class="font-medium tex-lg col-4 whitespace-normal flex align-items-center">
                     ${ formula.name }
                  </span>
                  <span class="col-1 m-0 text-right">
                     <i class="ti-info tooltip-accordion btn-info rounded-full p-5" data-toggle="tooltip" data-placement="top" title='${ window.components.FormulaField.getFilterNameFromOcorrencia(formula) }'></i>
                  </span>
                  <span class="col-5 m-0">
                  ${
                     allAccountsNotFound()
                        ? `<p> (${accountsDescription
                              .reduce((total, description) =>
                                 total.concat(description.replace(/^\((\d+)\).*$/, '$1')), []).join(', ')}) Conta(s) não encontrada(s) </p>`
                        : accountsDescription.map((description, index) =>
                           `<p class="whitespace-normal ${index > 0 ? 'mt-2' : ''}" > ${ description } </p>`
                        ).join('')
                  }
                  </span>
                  <span class="col-1 font-medium text-xl text-right mt-0">${ formula.type === 'Quantidade por Conta' ? (allMonths.length - qtdMonthsOnLancamentos) : lancamentos.length }</span>
                </div>
              </button>
              <div class="flex flex-row space-x-4 max-w-16 justify-end">
                <svg
                  id="btnEditAudit-${index}"
                  onclick="event.stopPropagation(); window.controllers.AccordionsFormula.onEditFormula(${index})"
                  class="my-auto w-6 h-6 cursor-pointer opacity-0 transition-opacity duration-500 text-gray-500 hover:text-yellow-500"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
                <svg
                  id="btnRemoveAudit-${index}"
                  onclick="event.stopPropagation(); window.controllers.AccordionsFormula.onRemoveFormula(${ index })"
                  class="my-auto w-7 h-7 cursor-pointer opacity-0 transition-opacity duration-500 text-gray-500 hover:text-red-500 d-none"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </div>
            </div>
          </div>

          <div id="collapse${index+1}" class="collapse" aria-labelledby="heading${index+1}" data-parent="#accordion">
            <div class="card-body">
            ${
              formula.type === 'Ocorrencia mensal'
              ||
              formula.type === 'Quantidade por Conta'
              ||
              (formula.type === 'Personalizada' && formula.filter.find(filter => filter.field == 'Quantidade' && !!filter.value))
                ?
                `
                  <div id="jtimeline-demo-${index}" class="jtimeline">
                    <ul class="jtimeline-events">
                      ${
                        getTimelineLancamentosFromMes(lancamentosGroupByMes)
                      }
                    </ul>
                  </div>
                  <hr class="LinhaPag mt-3 mb-3">
                `
                :
                ''
            }
              <table class="display table table-hover" id="table-audit-${index}">
                <thead>
                  <tr>
                  <th scope="col" class="text-center">Data</th>
                  <th scope="col" class="text-center">Histórico</th>
                  <th scope="col" class="text-center">Débito / Crédito</th>
                  <th scope="col" class="text-center">Valor</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `
            return totalAudit
        }, {})

    const contentDuplicados = `
    <div class="hidden wrapper-accordions" id="Duplicados-wrapper-accordions">
      <h3 style="font-size: 17px;" class="mb-3">Lançamentos iguais suspeitos de duplicidade</h3>
      <div class="card">
        <table id="sameHist" class="display table table-hover">
          <thead>
              <tr>
                <th class="text-center">Data</th>
                <th class="text-center">Histórico</th>
                <th class="text-center">Débito / Crédito</th>
                <th class="text-center">Valor</th>
              </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      <h3 style="font-size: 17px;" class="my-3">Lançamentos iguais com históricos diferentes suspeitos de duplicidade</h3>
      <div class="card">
        <table id="diffHist" class="display table table-hover">
          <thead>
              <tr>
                <th class="text-center">Data</th>
                <th class="text-center">Histórico</th>
                <th class="text-center">Débito / Crédito</th>
                <th class="text-center">Valor</th>
              </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  `;

    Object.keys(formulasGroupedByType).forEach(key => {
        formulasGroupedByType[key] = `
      <div class="hidden wrapper-accordions" id="${key}-wrapper-accordions">
         ${formulasGroupedByType[key]}
      </div>
   `
    })
    return Object.values(formulasGroupedByType).join('') + contentDuplicados
}
window.components = Object.assign(window.components || {}, {
    AccordionsFormula
})