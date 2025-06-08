function FormulaService() {}
FormulaService.remove = function(formula, callback = () => void 0) {
    swal({
            title: "Deseja Excluir a Fórmula?? ",
            text: formula.name,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, Excluir !!",
            cancelButtonText: "Cancelar !!",
            closeOnConfirm: true
        },
        (isConfirm) => {
            if (isConfirm)
                $.ajax({
                    type: 'POST',
                    url: `${ BASE_URL }/rest/auditoria/create.php?tpaction=delete`,
                    data: JSON.stringify({
                        id: formula.id
                    }),
                    contentType: 'application/json',
                    dataType: 'json',
                    success: () => {
                        if (location.pathname.includes('Auditoria.php'))
                            window.libs.toastPrimary('Sucesso', 'Remoção realizada com sucesso !')
                        else
                            sessionStorage.setItem('toastToShow', JSON.stringify({
                                type: 'success',
                                title: 'Sucesso',
                                message: 'Remoção realizada com sucesso'
                            }))
                        return callback()
                    }
                })
        })
}
FormulaService.upsert = function(formula, filterHasChanged, callback) {
    return $.ajax({
        type: 'POST',
        url: `${ BASE_URL }/rest/auditoria/create.php${ formula.id ? `?tpaction=update`: '' }`,
        data: JSON.stringify({ ...formula,
            filter: JSON.stringify(formula.filter),
            filterHasChanged
        }),
        contentType: 'application/json',
        dataType: 'json',
        success: (result) => {
            try {
                if (!result) throw new Error('Processamento não realizado...')
                else if (Array.isArray(result)) throw new Error(`Já existe uma formula com estes parâmetros. Nome: ${ result.pop().Nome || '' }`)
                else if (typeof result !== 'object') throw new Error('Resultado diferente do esperado...')
                if (callback)
                    callback({ ...result,
                        filter: JSON.parse(result.filter)
                    })
                if (location.pathname.includes('Auditoria.php'))
                    window.libs.toastPrimary('Sucesso', 'Cadastro realizado com sucesso !')
                else
                    sessionStorage.setItem('toastToShow', JSON.stringify({
                        type: 'success',
                        title: 'Sucesso',
                        message: 'Operação realizada com sucesso'
                    }))
            } catch (err) {
                window.libs.toastPrimary('Atenção!', err.message || 'Erro ao realizar cadastro', 'warning', 6200)
                throw err
            }
        },
        error: (error) => {
            window.utils.forceReload()
        }
    })
}
window.services = Object.assign(window.services || {}, {
    FormulaService
})