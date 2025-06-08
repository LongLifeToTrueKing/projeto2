function StepsResult() {

}

StepsResult.lancamentos = (...args) => {
    return [{
            target: '#fake-div-ano',
            content: `
               <h6 class="text-lg mb-1"><b>Bem-vindo a nova tela de lançamentos do Lance Ssimples!</b></h6>
               Criamos novos recursos para melhorar ainda mais o seu desempenho.
               <div class="dropdown">
                  <button class="anno-fake-btn  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false" style="position:absolute;top:12px;height:30px;color:white">
                     Ações
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                     <a class="dropdown-item" href="#" onclick="annoLancamentos.hide()">Pular</a>
                     <a class="dropdown-item" href="#" onclick="annoLancamentos.hide();Tutorial.saveTutorial('Result_Lancamentos')">Não ver mais</a>
                  </div>
               </div>
            `,
            className: 'w-25',
            position: 'center-top',
            onShow: function() {
                $('.dropdown-toggle').click()
                $('.anno-arrow').addClass('d-none')
            },
            onHide: function() {
                $('.anno-inner').removeClass('anno-inner-custom')
            }
        },
        {
            target: '#result_dataTable_filter input',
            content: `
            <h6 class="text-lg mb-1"><b>Localize lançamentos</b></h6>
            Pesquise lançamentos por qualquer campo. Basta digitar: valor, histórico, data, documento e etc.
         `,
            position: 'center-left'
        },
        {
            target: '#headers-table',
            content: `
            <h6 class="text-lg mb-1"><b>Personalize a ordem dos lançamentos</b></h6>
            Clique nos campos data, histórico, valor e contas e ordene da maneira que desejar...
         `,
            position: 'center-bottom'
        },
        {
            target: '#result_dataTable_length label',
            content: `
            <h6 class="text-lg mb-1"><b>Quantidade de lançamentos por página</b></h6>
            Agora você pode escolher quantos lançamentos quer ver por página:
            50, 100, 200, 500. Você é quem escolhe! <br>
            <b>Vem mais novidades por aí!</b>
            `
        }
    ]
}

StepsResult.ctOnly = (...args) => {
    return [{
            target: '#ctOnly-wrapper',
            content: `
            Com o recurso de conta única, basta digitar uma conta e a outra será preenchida automaticamente. <br>
            <b>Digite uma conta teste.</b>
            <div class="dropdown">
            <button class="anno-fake-btn  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false" style="position:absolute; top:12px; height:30px; color:white">
               Ações
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
               <a class="dropdown-item" href="#" onclick="annoCtOnly.hide()">Pular</a>
               <a class="dropdown-item" href="#" onclick="annoCtOnly.hide(); Tutorial.saveTutorial('Result_CtOnly')">Não ver mais</a>
            </div>
         </div>
         `,
            buttons: [{
                text: 'Próximo',
                click: function(anno) {
                    if ($('#CtOnly').val())
                        anno.switchToChainNext()
                    else
                        $('#CtOnly').trigger('focus')
                }
            }],
            onShow: function() {
                $('#CtOnly').trigger('focus')
                $('#btn-ctOnly').prop('disabled', true)
                const element = $('#ctOnly-wrapper')
                element.css('width', 'auto')
                element.addClass('p-1')
            },
            onHide: function() {
                $('#btn-ctOnly').prop('disabled', false)
            }
        },
        {
            target: '#buttons-wrapper-0 input[name="CtDeb"]',
            content: 'Ao preencher um campo, o outro será preenchido com a conta única informada',
            buttons: [{
                text: 'Próximo',
                click: function(anno) {
                    if ($(anno.target).val())
                        anno.switchToChainNext()
                    else
                        document.querySelector(anno.target).focus()
                }
            }],
            onShow: function(_, target, _) {
                target.focus()
            },
            onHide: function(_, target, _) {
                ctOnly = $('#CtOnly').val()
                target.blur()
            }
        },
        {
            target: '#buttons-wrapper-0 input[name="CtCre"]',
            content: `
            Perceba que a coluna foi preenchida automaticamente <br>
            <span style="font-size: 14px !important">
               Para mais detalhes <a href="https://transcripts.gotomeeting.com/#/s/cce9154056582a5ff350113ec104050f89f12c5db6fdb7c7d1e8c1d8a56a6bd1" target="_blank" class="text-blue-800" style="font-size: 14px !important">acesse o vídeo</a>
            </span>
         `
        },
    ]
}

StepsResult.contaBanco = (...args) => {
    return [{
        target: '#ctBank-wrapper',
        content: `Com este recurso, o sistema vai aplicar a conta para a Conta de Crédito quando o lançamento contiver um (D)
            e para a Conta de Débito quando contiver um (C) <br>
            <span style="font-size: 14px !important">
               Para mais detalhes <a href="https://transcripts.gotomeeting.com/#/s/cce9154056582a5ff350113ec104050f89f12c5db6fdb7c7d1e8c1d8a56a6bd1" target="_blank" class="text-blue-800" style="font-size: 14px !important">acesse o vídeo</a>
            </span>
            `,
        position: 'center-left',
        onShow: function() {
            const element = $('#ctBank-wrapper')
            element.css('width', 'auto')
            element.addClass('p-1')
        }
    }]
}