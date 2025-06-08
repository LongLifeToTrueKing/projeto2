function Tutorial() {}

Tutorial.start = function() {
    new Anno([{
            target: '#help-start',
            position: 'center-right',
            content: 'Bem-vindo a tela de Fórmulas/Consulta! Nesta tela podem ser criados Filtros que poderão ser transformados em Fórmula.',
        },
        {
            target: '#filtrosContainer',
            position: 'top',
            content: 'Utilize os Filtros em Conjunto ou Individualmente para pesquisar os lançamentos.'
        },
        {
            target: '#btnHistorico',
            position: 'top',
            content: 'Clique para pesquisar por um campo especifico.'
        },
        {
            target: '#btnSalvarFiltro',
            position: 'bottom',
            content: 'Salve a Consulta como Fórmula, assim o sistema vai identificar Fórmulas automaticamente.',
            buttons: {
                text: 'Finalizar',
                click: function(anno) {
                    anno.hide()
                    $.ajax({
                        type: 'POST',
                        url: `${ BASE_URL }/rest/tutorial/create.php`,
                        data: JSON.stringify({
                            name: 'Result_Consulta'
                        }),
                        contentType: 'application/json',
                        dataType: 'json'
                    })
                }
            }
        },
    ]).show()
}