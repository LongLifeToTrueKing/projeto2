$(document).ready(function() {

    // Inicializa variáveis globais
    var records = session = originalRecords = {};
    var nameImp = nameExp = ""
    if (!sessionStorage.getItem("currentPage")) {
        sessionStorage.setItem("currentPage", 1);
    }
    var currentPage = +sessionStorage.getItem("currentPage");
    var maxPage = 1;
    var typingTimer; // timer do input de pesquisa
    var doneTypingInterval = 100; // tempo que leva até pesquisar (0,1 seg)
    var qtdText;
    var ctOnly;
    var hasDesmembramento;
    var hasEsclarecimento;
    var emailFinanceiro;
    var lastSort = ["Cont", "asc"];
    var countdown = 1800; // tempo até a página recarregar automaticamente
    var enableDesmemb = true;
    var customFilterIsActive = false;
    var tempRecords = [];
    var contFields = "";
    let allLayM = "";
    var accountPlan;
    var hasAccountPlan;
    var defaultPlan;
    var accPlanProbability;
    var alertNotInPlan;

    const urlParams = new URLSearchParams(window.location.search);
    const exported = urlParams.get('exported');
    const remainingLimit = urlParams.get('remainingLimit');

    if (exported && remainingLimit) {
        Swal.fire({
            title: "Limite insuficiente!",
            text: `Você tentou exportar ${exported} lançamentos, porém seu limite mensal restante é de ${remainingLimit}. Entre em contato com a administração através do chat caso queira ajustar seu limite mensal.`,
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: '#487fe2',
        }).then(() => {
            window.location = window.location.href.split("?")[0];
        });
        throw new Error("Limite insuficiente!");
    } else {
        Loader.startLoading();
    }

    // Pega dados do PHP
    $.ajax({
        type: 'POST',
        url: `https://portal.ssparisi.com.br/prime/app/ls/layout/Result_LS/getData.php`,
        data: {},
        contentType: 'application/json',
        dataType: 'json',
        success: (data) => {
            Loader.stopLoading();
            $(".paging-container").removeClass("d-none");
            $(".paging-container").addClass("d-flex");

            // Atualiza variáveis globais
            records = originalRecords = data.records.map(
                (data) => {
                    return { ...data,
                        search: Object.values(data).join("[,,)(") + "[,,)(" + formatValue(data.Valor)
                    }
                }
            );
            session = data.session;
            maxPage = Math.ceil(records.length / 200);
            nameImp = data.sistImpN;
            nameExp = data.sistExpN;
            tpRelac = data.tpRelac;
            desmemb = data.hasDesmembramento;
            allLayM = data.allLayM;
            accountPlan = data.accountPlan;
            contFields = EmpresaUtilsSigla.getExceptionByTpRelac(session.Ls_SistExp, tpRelac, true);
            qtdText = tpRelac.split("/").length;

            console.log(session);

            setInterval(countFrom1Hour, 1000);

            // Preenche o topo da página com informações da empresa
            empName = session.Ls_NomeEmp;
            dataWithDebOrCred = records.filter((data) => data.CtCre || data.CtDeb).length;
            allData = records.length;
            if (session.Ls_Bank_Active) {
                $("#empInfo").text(`${empName} (Conta: ${session.Ls_Bank_Account_Number}) - ${dataWithDebOrCred}/${allData}`);
            } else {
                $("#empInfo").text(`${empName} - ${dataWithDebOrCred}/${allData}`);
            }
            $("#layInfo").text(`${nameImp} - ${nameExp}`);

            // Conta Única e Conta Banco
            ctOnly = session.Ls_CtOnly;
            $("#CtOnly").val(ctOnly);
            if (qtdText > 1) {
                $("#ctOnly-wrapper").show();
                if (session.Ls_DebCred || session.SistPrincLS == "LSConc") {
                    $("#ctBank-wrapper").show();
                }
            }

            // Desmembramento
            hasDesmembramento = desmemb === "S" || desmemb === "M";

            // Esclarecimento
            var emailEmpresa = data.emailEmp;
            emailFinanceiro = emailEmpresa[0].emailFinanceiro;
            hasEsclarecimento = emailFinanceiro && emailFinanceiro !== "|";

            // Plano de Contas
            hasAccountPlan = session.Ls_AccountPlan && session.Ls_AccountPlan !== "0";

            defaultPlan = data.defaultPlan;
            accPlanProbability = data.accPlanProbability;
            alertNotInPlan = data.alertNotInPlan;

            if (!hasAccountPlan && defaultPlan) {
                hasAccountPlan = true;
                accountPlan = defaultPlan;
            }

            // Constrói a tabela
            getAccountingType(tpRelac);

            // Ordena por padrão pelas contas não preenchidas
            $("th[sort-by=Cont]").click();

            $("#loader-div").remove();
            if (hasAccountPlan) {
                showAccountPlan(accountPlan.id, accountPlan.name, accountPlan.layout, accountPlan.data, true);
            }
        },
        error: (err) => {
            console.log('err', JSON.stringify(err))
        }
    });

    function countFrom1Hour() {
        countdown--;
        if (countdown === 0) {
            toastPrimary(
                'A página será recarregada!',
                'Sua sessão será verificada por motivos de segurança.',
                'info'
            )
            setTimeout(() => {
                location.reload();
            }, 5000);
        }
    }


    //#region Estrutura da página
    function manualSlice(array, start, end) {
        const newArray = [];
        for (let i = start; i < end; i++) {
            if (array[i] === undefined) {
                break;
            }
            newArray.push(array[i]);
        }
        return newArray;
    }

    function customStringify(element) {
        noQuotesObj = {}
        for (var field in element) {
            if (typeof element[field] === 'string') {
                noQuotesObj[field] = element[field].replace(/'/g, '<<quote>>');
            }
        }
        return JSON.stringify(noQuotesObj)
    }

    function customParse(element) {
        return JSON.parse(element.replace(/<<quote>>/g, "'"))
    }

    function buildTable() {
        output = manualSlice(records, 200 * (currentPage - 1), 200 * currentPage);
        sessionStorage.setItem("currentPage", currentPage);

        // Esvazia e reconstrói a tabela
        $("#accordion_parent").empty()
        output.forEach((element, index) => {
            const temp = getTempRecord(element.CodTemp);
            $("#accordion_parent").append(`<tr role="row">
                <td class="w-3p">${element.CodTemp}</td>
                <td class="w-6p">${element.Data}</td>
                <td class="dt-head-center dt-body-center w-1/12">
                    <input type="text" class="doc-input doc text-center mx-auto w-full px-2 form-input font-medium tracking-wide" id="field-${element.CodTemp}-doc" value="${element.NrDoc ? element.NrDoc : ""}">
                </td>
                <td class="w-5/12">
                    <div class="w-full flex text-center" style="min-width: 330px">
                    <input type="text" class="hist-input hist text-left mx-auto w-full px-2 form-input font-medium tracking-wide" id="field-${element.CodTemp}-hist" value="${element.Hist.replace(/"/g, '&quot;')}">
                        <div class="tooltip-container" style="margin:8px">
                            <button type="button" data-toggle="tooltip" data-html="true" title="<strong><u>Histórico de Relacionamento</u></strong><br>${element.HistRel.replace(/"/g, '&quot;')}" class="help-tooltip" style="padding: 0;color: #3e63eb;width: 25px;height: 25px;border-radius: 90px;border: 0;background-color: transparent;"
                            style="padding: 0;color: white;width: 25px;height: 25px;border-radius: 90px;border: 0;">
                            <i class="ti-link" style="font-size: 1.5rem !important;"></i>
                            </button>
                        </div>
                    </div>
                </td>
                <td class="dt-head-right dt-body-right w-1/12">${formatValue(element.Valor)}</td>
                <td class="w-2/12">
                    <span class="flex flex-row accounts-span${temp ? " tempRecord" : ""}" id="buttons-wrapper-${element.CodTemp}">
                        ${['S', 'M'].includes(element.Opc) ?
                            `<div class='m-auto' typeRec='${element.Opc}' style='color: rgb(4, 120, 87);'>DESMEMBRADO</div>`
                            :
                            (['P', 'N'].includes(element.Opc)) ? `<div class='m-auto' typeRec='${element.Opc}' style='color: #E8B63A;'>${element.Opc === "P" ? "ENVIO PENDENTE" : "ENVIADO"}</div>` :
                                getFieldsArray()
                                    .map((field, index) =>
                                        `<input type="text"
                                    codTemp="${element.CodTemp}"
                                    name="${field}"
                                    class="form-input ml-0.5 text-center field-${element.CodTemp}-fields w-full acc-input"
                                    style="border-color: ${element[field] ? 'light-grey' : 'rgb(248,113,113)'} !important; padding-left: 0 !important; padding-right: 0 !important"
                                    id="field-${element.CodTemp}-${index}"
                                    value="${ temp ? temp [field] : element[field] || ''}"
                                />`
                                    )
                                    .join('')
                        }
                    </span>

                </td>
                <td class="dt-head-center w-5p relative">
                    <div class="flex flex-row">
                        <button
                            type="button"
                            codTemp="${element.CodTemp}"
                            class="cadRelac speed-dial__button--small shadow-xl rounded-full ${['E', 'S', 'M', 'P', 'N'].includes(element.Opc) ? 'cursor-not-allowed bg-gray-300 text-white' : 'bg-gray-100 text-blue-900 hover:text-blue-900 hover:bg-blue-100'}"
                            title="Cadastrar relacionamento"
                            ${['E', 'S', 'M', 'P', 'N'].includes(element.Opc) ? ' disabled' : ''}
                        >
                            <svg title="Cadastrar relacionamento" class="icon w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
                        </button>
                        <button
                            type="button"
                            codTemp="${element.CodTemp}"
                            class="alt-individual speed-dial__button--small shadow-xl rounded-full ${['S', 'M', 'P', 'N'].includes(element.Opc) ? 'cursor-not-allowed bg-gray-300 text-white' : 'bg-gray-100 text-yellow-700 hover:text-yellow-700 hover:bg-yellow-100'}"
                            title="Alteração individual"
                            ${['S', 'M', 'P', 'N'].includes(element.Opc) ? ' disabled' : ''}
                        >
                            <svg title="Alteração individual" class="icon w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                        ${(hasDesmembramento || hasEsclarecimento || hasAccountPlan) ? `<button
                            type="button"
                            class="set-accordions accordion rounded-full p-2 text-blue-600"
                            accordion-info='${customStringify(element)}'
                            data-parent="#accordion_parent"
                            data-toggle="collapse"
                            title="Mais opções"
                            data-target="#demo${index}"
                        >
                            <svg
                                title="Mais opções"
                                class="icon icon__plus w-7 h-7 align-middle"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </button>`
                            :
                            ``}
                    </div>
                </td>
            </tr>`);
        });

        // Mostrar histRel
        $('.help-tooltip').tooltip({
            html: true,
            placement: 'top',
            template: `
                <div class="tooltip" role="tooltip">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip-inner bg-blue-600">
                    </div>
                </div>
                `
        })
        $(".help-tooltip").hover(function() {
            $('.tooltip-inner').css('min-width', '350px');
            $('.tooltip-inner').css('font-size', '18px');
            $('.tooltip-inner strong').css('font-size', '14px')
        });

        // Conta Única
        $(".acc-input").on("blur", function() {
            return onChangeDebCre($(this).val(), $(this).attr("name"), $(this).attr("codTemp"))
        });

        // Relacionamento
        $(".cadRelac").on("click", function() {
            return onCadastrarRelacionamento($(this).attr("codTemp"));
        });

        // Marca registros temporários
        $(".acc-input").on("blur", function() {
            return markAsTemporary($(this).attr("codtemp"));
        });

        // Aviso de conta fora do plano
        if (hasAccountPlan && alertNotInPlan) {
            let originalValue;
            let allIDs = JSON.parse(accountPlan.data).map((acc) => String(acc.number));
            $(".acc-input").not("[name='HP']").focus(function() {
                originalValue = $(this).val().trim();
            }).blur(function() {
                currentValue = $(this).val().trim();
                if (currentValue !== originalValue && currentValue !== "") {
                    if (!allIDs.includes(currentValue)) {
                        toastPrimary('Atenção!', 'A conta inserida "' + currentValue + '" não consta no seu Plano de Contas cadastrado.', 'info')
                    }
                }
            });
        }

        // Alteração de histórico
        $(".hist-input").on("change", function() {
            id = $(this).attr("id").split("-")[1]
            Hist = $(this).val()
            const index = originalRecords.findIndex(({
                CodTemp
            }) => CodTemp === id)
            const values = getFieldsValuesFromCodTemp(id)
            const dado = originalRecords[index]
            const newData = { ...dado,
                Hist,
                HistPdr: dado.HistPdr || dado.Hist,
                ...values
            }
            originalRecords[index] = newData
        });

        // Alteração individual
        $(".alt-individual").on("click", function() {
            onCadastrarIndividual($(this).attr("codTemp"));
        });

        // Desmembramento/Esclarecimento
        $(".set-accordions").on("click", function() {
            $this = $(this)
            const obj = customParse($this.attr("accordion-info"))
            setAccordions(obj.CodTemp, obj.Data, obj.HistRel, obj.Hist, obj.Valor, obj.NrDoc, obj.CtDeb, obj.CtCre, obj.HP, obj.Opc, $this);
        });

        updatePageButtons();
        Loader.stopLoading();
    }

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    function getAccountingType() {
        $(".accHeader").text(contFields);
    }

    function getFieldsArray() {
        if (qtdText === 1) {
            return ["CtDeb"];
        } else if (qtdText === 2) {
            return ["CtDeb", "CtCre"];
        } else {
            return ["HP", "CtDeb", "CtCre"];
        }
    }
    //#endregion

    //#region Paginação
    function updatePageButtons() {
        // Atualiza o display dos botões de paginação
        currentPage > 4 ? $(".page-start").show() : $(".page-start").hide();
        currentPage > 4 ? $(".more-prev").show() : $(".more-prev").hide();
        currentPage > 3 ? $(".page-prev3").show() : $(".page-prev3").hide();
        currentPage > 2 ? $(".page-prev2").show() : $(".page-prev2").hide();
        currentPage > 1 ? $(".page-prev1").show() : $(".page-prev1").hide();
        maxPage - currentPage >= 1 ? $(".page-next1").show() : $(".page-next1").hide();
        maxPage - currentPage >= 2 ? $(".page-next2").show() : $(".page-next2").hide();
        maxPage - currentPage >= 3 ? $(".page-next3").show() : $(".page-next3").hide();
        maxPage - currentPage >= 4 ? $(".more-next").show() : $(".more-next").hide();
        maxPage - currentPage >= 4 ? $(".page-end").show() : $(".page-end").hide();

        // Atualiza o onclick dos botões de paginação
        $(".paginate_button").prop("onclick", null).off("click");
        $(".page-start").on("click", () => {
            currentPage = 1;
            buildTable()
        });
        $(".page-prev3").on("click", () => {
            currentPage -= 3;
            buildTable()
        });
        $(".page-prev2").on("click", () => {
            currentPage -= 2;
            buildTable()
        });
        $(".page-prev1").on("click", () => {
            currentPage--;
            buildTable()
        });
        $(".page-next1").on("click", () => {
            currentPage++;
            buildTable()
        });
        $(".page-next2").on("click", () => {
            currentPage += 2;
            buildTable()
        });
        $(".page-next3").on("click", () => {
            currentPage += 3;
            buildTable()
        });
        $(".page-end").on("click", () => {
            currentPage = maxPage;
            buildTable()
        });

        // Atualiza o texto dos botões de paginação
        $(".page-start").text("1");
        $(".page-prev3").text(currentPage - 3);
        $(".page-prev2").text(currentPage - 2);
        $(".page-prev1").text(currentPage - 1);
        $(".current").text(currentPage);
        $(".page-next1").text(currentPage + 1);
        $(".page-next2").text(currentPage + 2);
        $(".page-next3").text(currentPage + 3);
        $(".page-end").text(maxPage);
    }

    $("#headers-table").children("th").on("click", function() {
        $this = $(this);
        className = $this.attr("class")
        sortBy = $this.attr("sort-by")

        // Coloca todos os outros headers na ordenação padrão
        $("#headers-table").children("th").addClass("no-sorting");
        $("#headers-table").children("th").removeClass("asc-sorting");
        $("#headers-table").children("th").removeClass("desc-sorting");

        // Dependendo da classe atual, atualiza para a próxima (sem -> asc -> desc)
        $this.removeClass("no-sorting");
        if (className.includes("no-sorting")) {
            $this.addClass("asc-sorting");
            records.sort((a, b) => (sortTable(a, b, sortBy, "asc")))
        } else if (className.includes("asc-sorting")) {
            $this.addClass("desc-sorting");
            records.sort((a, b) => (sortTable(a, b, sortBy, "desc")))
        } else if (className.includes("desc-sorting")) {
            $this.addClass("no-sorting");
            records.sort((a, b) => (sortTable(a, b, "Cont", "asc")))
        }
        buildTable();
    });
    //#endregion

    //#region Ordenação
    function empty(string) {
        return string ? .trim() === "" || string === null;
    }

    function sortTable(a, b, sortBy, order) {
        lastSort = [sortBy, order];
        let valueA, valueB;
        if (sortBy === "CodTemp") {
            valueA = +a[sortBy];
            valueB = +b[sortBy];
        } else if (sortBy === "Data") {
            // Quantidade de dias
            valueA = +(a[sortBy].split("/")[2]) * 365 + +(a[sortBy].split("/")[1]) * 30 + +(a[sortBy].split("/")[0]);
            valueB = +(b[sortBy].split("/")[2]) * 365 + +(b[sortBy].split("/")[1]) * 30 + +(b[sortBy].split("/")[0]);
        } else if (sortBy === "Valor") {
            valueA = parseFloat(a[sortBy]);
            valueB = parseFloat(b[sortBy]);
        } else if (sortBy === "Cont") {
            let hpA = (empty(a["HP"]) || a["HPisTemp"]) ? 0 : 1
            let hpB = (empty(b["HP"]) || b["HPisTemp"]) ? 0 : 1
            let creA = (empty(a["CtCre"]) || a["CtCreisTemp"]) ? 0 : 0.75
            let creB = (empty(b["CtCre"]) || b["CtCreisTemp"]) ? 0 : 0.75
            let debA = (empty(a["CtDeb"]) || a["CtDebisTemp"]) ? 0 : 0.5
            let debB = (empty(b["CtDeb"]) || b["CtDebisTemp"]) ? 0 : 0.5
            valueA = hpA + creA + debA;
            valueB = hpB + creB + debB;
            if (getTempRecord(a["CodTemp"])) {
                valueA = -5;
            }
            if (getTempRecord(b["CodTemp"])) {
                valueB = -5;
            }

            if (valueA === valueB) {
                valueA = +a["CodTemp"];
                valueB = +b["CodTemp"];
            }
        } else {
            valueA = a[sortBy];
            valueB = b[sortBy];
        }
        return (valueA > valueB) ? (order === "asc" ? 1 : -1) : ((valueB > valueA) ? (order === "asc" ? -1 : 1) : 0);
    }
    //#endregion

    //#region Botões de navigação
    $("#new-file").on("click", () => {
        sessionStorage.removeItem("currentPage");
        window.location = (
            session.Ls_IsExtComp == "final" ?
            'https://portal.ssparisi.com.br/prime/app/ls/Conversor_ExtComp.php?sist=LSCont' :
            'https://portal.ssparisi.com.br/prime/app/ls/layout/Actions.php?tpaction=NovoArq');
    });

    $("#export-data").on("click", () => {
        if (session.Tab_Temp ? .trim() === "") {
            window.location.replace("https://portal.ssparisi.com.br/prime/pph/lgu.php");
        }
        $(this).prop('onclick', null).off('click');
        if (session.Ls_IsExtComp == "final") {
            $.ajax({
                type: 'POST',
                url: `${BASE_URL}/rest/lancamentos/markAsExported.php`,
                data: JSON.stringify({
                    records
                }),
                contentType: 'application/json',
                dataType: 'json',
                error: () => {
                    window.libs.toastPrimary('Erro', 'Ocorreu um erro.', 'error')
                }
            });
        }
        window.location = `https://portal.ssparisi.com.br/prime/app/ls/layout/${session.Ls_SistExp}.php`;
    });
    //#endregion

    //#region Pesquisa
    $("#searchInput").on("keyup", function() {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(searchInTable, doneTypingInterval);
    })

    function searchInTable(resetTable = true) {
        text = $("#searchInput").val()
        records = originalRecords.filter((data) => {
            return formatSearchText(data.search).includes(formatSearchText(text))
        })
        maxPage = Math.ceil(records.length / 200);
        if (resetTable) {
            currentPage = 1;
        }
        buildTable();
    }

    function formatSearchText(text) {
        text = text.toUpperCase()
        text = text.normalize("NFD").replace(/\p{Diacritic}/gu, "")
        text = text.replace(/-/g, "")
        text = text.replace(/\s+/g, " ")
        text = text.trim()
        return text
    }
    //#endregion

    //#region Relacionamentos

    function onProcessa(action, dado, message = 'Cadastro realizado com sucesso !', escResolve = null) {
        return $.ajax({
            type: 'POST',
            url: `${BASE_URL}/rest/lancamentos/index.php?tpaction=${action}`,
            data: JSON.stringify(dado),
            contentType: 'application/json',
            dataType: 'json',
            success: (result) => {
                if (result.status) {
                    // Atualiza as informações da empresa
                    const element = $('#empInfo');
                    const currentValue = element.text().trim();
                    element.text(currentValue.replace(/^(.*?) (\d+)\/(\d+)$/, `$1 ${result.count || '$2'}/$3`));
                    if (escResolve) {
                        escResolve(result);
                    }
                    Loader.stopLoading();
                } else {
                    toastPrimary('Erro', 'A conexão com o servidor foi perdida, a página será recarregada!', 'error')
                    setTimeout(() => {
                        location.reload();
                    }, 5000);
                }
            },
            error: () => {
                toastPrimary('Erro', 'Erro ao realizar operação, recarregue e tente novamente, por favor!', 'error')
                if (escResolve) {
                    const resp = session.Ls_RespEsc;
                    escResolve(resp)
                }
            }
        });
    }

    function getRecordFromCodTemp(codTemp) {
        const array = originalRecords.sort(function(a, b) {
            return Number(a.CodTemp) - Number(b.CodTemp);
        });
        return array[codTemp - 1]
    }

    function getFieldsFromCodTemp(codTemp) {
        // retornará algo como 1/2/3
        return Array.from(document.querySelectorAll(`.field-${codTemp}-fields`)).map(({
            value
        }) => value).join('[/]')
    }

    function getFieldsValuesFromCodTemp(codTemp) {
        const fields = getFieldsFromCodTemp(codTemp); // ex: 1[/]2[/]3
        const fieldValues = fields.split('[/]');
        const values = getFieldsArray();
        return values.reduce(
            (obj, fieldName, fieldIndex) => Object.assign(obj, {
                [fieldName]: fieldValues[fieldIndex]
            }), {}
        )
    }

    function onAlteracao(idRecord, options = {
        individual: false
    }, tpRelac = "R") {
        const index = originalRecords.findIndex(({
            CodTemp
        }) => CodTemp === idRecord);
        const values = getFieldsValuesFromCodTemp(idRecord);
        if (!values || !Object.keys(values).length) {
            Loader.stopLoading();
            throw new Error('dados não preenchidos');
        }
        const newNrDoc = $(`#field-${idRecord}-doc`).val();
        const newData = {
            ...originalRecords[index],
            ...values,
            Opc: options.individual ? 'E' : originalRecords[index].Opc,
            NrDoc: newNrDoc
        };
        getFieldsArray().map(function(field, i) {
            newData[`${field}isTemp`] = false;
        });
        originalRecords.splice(index, 1, newData)
        return {
            values,
            newData
        }
    }

    function onCadastrarRelacionamento(codTemp, accounts = {}, tpRelac = "R", escResolve = null) {
        try {
            if (tpRelac !== "E") {
                Loader.startLoading();
            }
            setTimeout(function() {
                const index = originalRecords.findIndex(({
                    CodTemp
                }) => CodTemp === codTemp);
                const newNrDoc = $(`#field-${codTemp}-doc`).val();

                const {
                    newData,
                    values
                } = onAlteracao(codTemp, {
                    individual: false
                }, tpRelac)
                Object.assign(newData, {
                    HistPdr: newData.HistPdr || newData.Hist
                })
                if (Object.keys(accounts).length !== 0) {
                    newData.CtCre = accounts.cred;
                    newData.CtDeb = accounts.deb;
                    newData.HP = accounts.hp;
                }
                newData.tpRelac = tpRelac
                //promise para as mensagens de alerta (processa se for resolve)
                const promise = new Promise(function(resolve, reject) {
                    //verifica se crédito e débito estão vazios
                    if (newData.CtCre === '' && newData.CtDeb === '' && qtdText != 1 && tpRelac === "R") {
                        Swal.fire({
                            title: "Contas vazias!",
                            text: "Contas de crédito e débito vazias! Por favor, preencha pelo menos uma das duas.",
                            icon: "error",
                            confirmButtonText: "Ok",
                            confirmButtonColor: '#487fe2',
                        });
                        reject();
                        return;
                    }
                    //verifica se o histórico está vazio e confirma se o cliente quer usar o histórico original
                    if (newData.Hist === "") {
                        Swal.fire({
                            title: "Histórico em branco!",
                            text: "O histórico original será utilizado no lugar do campo vazio. Deseja continuar? Para exportar um registro com histórico vazio, insira apenas \"!\", \"-\" ou \".\" no histórico.",
                            icon: "warning",
                            confirmButtonText: "Confirmar",
                            confirmButtonColor: '#487fe2',
                            cancelButtonText: 'Cancelar',
                            cancelButtonColor: '#d33',
                        }).then((isConfirm) => {
                            if (isConfirm) {
                                resolve();
                            } else {
                                reject();
                            }
                            return;
                        });
                    } else {
                        resolve();
                    }
                });
                promise.then(function() {
                    let processa = onProcessa('CadRel', newData, 'Relacionamento realizado com sucesso !', escResolve)
                    processa.then(
                        function(value) {
                            if (value.status) {
                                originalRecords.forEach((element, i) => {
                                    if (element.HistRel == originalRecords[index].HistRel) {
                                        removeFromTempList(element.CodTemp);

                                        getFieldsArray().map(function(field, i) {
                                            element[`${field}isTemp`] = false;
                                            $(`.acc-input[codtemp=${element.CodTemp}][name=${field}]`).val(newData[field])
                                        });
                                        if (tpRelac === "E") {
                                            element.Opc = "P";
                                        }
                                        if (["236598"].includes(session.user_base) || element.CodTemp == originalRecords[index].CodTemp) {
                                            element.NrDoc = newNrDoc;
                                        }
                                        originalRecords.splice(i, 1, element);
                                    }
                                });

                                originalRecords.forEach((data, indexRelac) => {
                                    if (data.HistRel !== newData.HistRel) {
                                        return;
                                    }
                                    let newDataRelac = { ...data,
                                        Hist: (newData.Hist === newData.HistPdr ? data.Hist : newData.Hist),
                                        ...values
                                    };
                                    delete newDataRelac.search;
                                    newDataRelac.search = Object.values(data).join("[,,)(") + "[,,)(" + formatValue(data.Valor);
                                    originalRecords.splice(indexRelac, 1, newDataRelac);
                                })
                                records = originalRecords;
                                records.sort((a, b) => (sortTable(a, b, lastSort[0], lastSort[1])));
                                searchInTable(false);
                                editNrDocDatabase(codTemp, newNrDoc);
                                Loader.stopLoading();
                            } else {
                                toastPrimary(
                                    'A página será recarregada!',
                                    'Ocorreu um erro ao cadastrar o relacionamento, tente novamente.',
                                    'error'
                                )
                                setTimeout(() => {
                                    location.reload();
                                }, 3000);

                            }
                        }
                    );
                });
            }, 200);

        } catch (err) {
            toastPrimary('Erro', (err && err.message || ''), 'error')
            Loader.stopLoading();
        }
    }

    function editNrDocDatabase(codTemp, nrDoc) {
        return $.ajax({
            type: 'POST',
            url: `${BASE_URL}/rest/lancamentos/editDocument.php`,
            data: JSON.stringify({
                codTemp: codTemp,
                nrDoc: nrDoc
            }),
            contentType: 'application/json',
            dataType: 'json',
            error: () => {
                window.libs.toastPrimary('Erro', 'Ocorreu um erro ao alterar o número de documento.', 'error')
            }
        });
    }
    //#endregion

    //#region Alteração Individual

    function onCadastrarIndividual(codTemp) {
        Loader.startLoading();
        try {
            setTimeout(function() {
                const {
                    newData
                } = onAlteracao(codTemp, {
                    individual: true
                });
                records = originalRecords;
                records.sort((a, b) => (sortTable(a, b, lastSort[0], lastSort[1])));
                searchInTable(false);
                Loader.stopLoading();
                editNrDocDatabase(codTemp, newData.NrDoc);
                removeFromTempList(codTemp);
                return onProcessa('EdtInd', newData, 'Alteração individual realizada com sucesso !');
            }, 200);
        } catch (err) {
            toastPrimary('Erro', (err && err.message || ''), 'error');
            Loader.stopLoading();
        }
    }


    //#endregion

    //#region Conta Única
    function onChangeDebCre(currentValue, field, codTemp) {
        if (!currentValue || !ctOnly || !['CtDeb', 'CtCre'].includes(field) || qtdText === 1) {
            return
        }
        const fieldToFill = field === 'CtCre' ? 'CtDeb' : 'CtCre'
        const input = document.querySelector(`input[id^="field-${codTemp}"][name="${fieldToFill}"]`)
        if (!input.value || input.value === 0)
            input.value = currentValue !== ctOnly ? ctOnly : input.value
    }

    $("#btn-ctOnly").on("click", function() {
        const codEmp = $('#CtOnly').val()
        return $.ajax({
            type: 'POST',
            url: `${BASE_URL}/rest/empresa/editSingleConta.php`,
            data: JSON.stringify({
                conta: codEmp
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: () => {
                window.libs.toastPrimary('Sucesso', 'Conta única alterada com sucesso.', 'success')
                ctOnly = codEmp
            },
            error: () => {
                window.libs.toastPrimary('Erro', 'Ocorreu um erro ao alterar a conta única.', 'error')
            }
        });

    });

    $('#help-ctOnly').tooltip({
        title: `
    CONTA ÚNICA: informe aqui o número de uma conta para ser usada automaticamente na contrapartida dos lançamentos de cada linha. <br>
    Ao importar relatório de caixa, por exemplo, informe apenas qual é a conta caixa no seu plano. Depois disso, a cada conta digitada, o Lance Ssimples informa a conta única na contrapartida, evitando a necessidade de digitação da mesma conta.
`,
        html: true,
        placement: 'right',
        template: `
    <div class="tooltip" role="tooltip">
        <div class="tooltip-arrow"></div>
        <div class="tooltip-inner bg-blue-600" style="min-width: 310px">
        </div>
    </div>
`
    })
    //#endregion

    //#region Conta Banco
    $("#btn-ctBank").on("click", function() {
        return Swal.fire({
            title: "Aplicar a conta do banco para todos os lançamentos?",
            text: "Ao confirmar, o sistema vai aplicar a conta para a conta de crédito quando o lançamento contiver um (D), e para a conta de débito quando contiver um (C).",
            icon: "warning",
            confirmButtonText: "Sim, aplicar!",
            confirmButtonColor: '#487fe2',
            cancelButtonText: 'Cancelar!',
            cancelButtonColor: '#d33',
        }).then(() => {
            $("#FormCtBank").submit();
        });
    });

    $('#help-contaBanco').tooltip({
        title: `
    CONTA BANCO: se, ao importar um extrato de banco, você já tem a identificação do que entrou na conta e saiu da conta (D ou C).<br>
    Use a função CONTA BANCO para informar apenas qual é a conta contábil do banco no seu plano de contas. O Lance Ssimples preenche todas as linhas do extrato corretamente, de forma automática, bastando apenas lançar a contrapartida.
`,
        html: true,
        placement: 'left',
        template: `
    <div class="tooltip" role="tooltip">
        <div class="tooltip-arrow"></div>
        <div class="tooltip-inner bg-blue-600" style="min-width: 350px">
        </div>
    </div>
`
    })
    //#endregion

    //#region Accordions

    function setAccordions(cod, date, histRel, hist, value, doc, deb, cred, hp, typeRec, $button) {
        $tr = $button.parent().parent().parent();
        let dataTarget = ($button.attr("data-target") || "").replace("#", "");
        if ($tr.next("tr").hasClass("isAccordion")) {
            $tr.next("tr").hide("fast", function() {
                $tr.next("tr").remove();
            })
        } else {
            $(".isAccordion").hide("fast", function($elm) {
                $(this).remove();
            });
            $tr.after(`
        <tr class="isAccordion">
            <td colspan="7" style="padding: 0 !important;">
                <div class="collapse" id="${dataTarget}" style="padding: 0 4px;">
                    <div class="flex-row inline-flex">
                        ${hasEsclarecimento ? `
                        <div class="m-1">
                            <button
                            type="button"
                            id="escl-button-${cod}"
                            class="speed-dial__button--small shadow-xl rounded-full bg-gray-100 text-yellow-700 hover:text-yellow-700 hover:bg-yellow-100"
                            title="Esclarecimento"
                            >
                                <svg title="Esclarecimento" class="icon w-8 h-8" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><g fill="none"><path d="M7 8.88a.625.625 0 1 1 0 1.25a.625.625 0 0 1 0-1.25zm0-4.877c1.031 0 1.853.846 1.853 1.95c0 .586-.214.908-.727 1.318l-.277.215c-.246.194-.329.3-.346.448l-.011.156A.5.5 0 0 1 6.5 8c0-.57.21-.884.716-1.288l.278-.215c.288-.23.36-.342.36-.544c0-.558-.382-.95-.854-.95c-.494 0-.859.366-.853.945a.5.5 0 0 1-1 .01C5.136 4.82 5.952 4.003 7 4.003zM2 7a5 5 0 1 1 2.886 4.533l-2.288.457a.5.5 0 0 1-.588-.588l.457-2.289A4.983 4.983 0 0 1 2 7zm5-4a4 4 0 0 0-3.564 5.818a.5.5 0 0 1 .045.326l-.344 1.719l1.719-.344a.5.5 0 0 1 .326.045A4 4 0 1 0 7 3zm-1.14 9.892A4.98 4.98 0 0 0 9 14c.754 0 1.47-.167 2.113-.467l2.289.457a.5.5 0 0 0 .588-.588l-.457-2.288c.3-.643.467-1.36.467-2.114c0-1.189-.415-2.28-1.108-3.139a6.029 6.029 0 0 1 .007 2.242a4.014 4.014 0 0 1-.335 2.715a.5.5 0 0 0-.045.326l.344 1.719l-1.72-.344a.5.5 0 0 0-.325.045a4.009 4.009 0 0 1-2.716.335a6.031 6.031 0 0 1-2.242-.007z" fill="#e7b63a"/></g></svg>
                            </button>
                        </div>`: ''}
                        ${hasDesmembramento ?
                    `<div class="m-1">
                            <button
                            type="button"
                            id="desm-button-${cod}"
                            class="speed-dial__button--small shadow-xl rounded-full bg-gray-100 text-green-700 hover:text-green-700 hover:bg-green-100"
                            title="Desmembrar lançamento"
                            >
                                <i class="ti-view-list-alt" style="vertical-align: middle;font-size: 21px !important;"></i>
                            </button>
                        </div>`: ''}
                        ${hasAccountPlan ?
                    `<div class="m-1">
                            <button
                            type="button"
                            id="accplan-button-${cod}"
                            class="speed-dial__button--small shadow-xl rounded-full bg-gray-100 text-purple-700 hover:text-purple-700 hover:bg-purple-100"
                            title="Consultar plano de contas"
                            >
                                <i class="ti-search" style="vertical-align: middle;font-size: 21px !important;"></i>
                            </button>
                        </div>`: ''}
                    </div>
                </div>
            </td>
        </tr>
    `);
            $(`#desm-button-${cod}`).on("click", function() {
                onDesmembrar(cod, date, doc, hist, histRel, value, ['S', 'M'].includes(typeRec), typeRec);
            });
            $(`#escl-button-${cod}`).on("click", function() {
                onEsclarecimento(emailFinanceiro, cod, date, doc, hist, value, histRel, typeRec);
            });
            $(`#accplan-button-${cod}`).on("click", function() {
                openAccountPlan(cod);
            });

        }
    }
    //#endregion

    //#region Desmembramento

    function getDesmembramentoRowId() {
        let $lastInputs = $("#splitTable tr").last().children().first().children();
        let rowAmount = $lastInputs.first().attr("id");
        if (!rowAmount || rowAmount.includes("original")) {
            rowAmount = "0";
        } else {
            rowAmount = parseInt(rowAmount.split("-")[1]) + 1;
        }
        return rowAmount;
    }

    function toggleRecordType(type) {
        hasMultiple = desmemb === "M";

        if (type == 'S') {
            $("#simple").addClass("active");
            $("#multiple").removeClass("active");
            $("#originalRecord").hide();
            enableInputsMultiple();
            $(".splitCredInput, .splitDebInput").off("blur");
        } else {
            if (hasMultiple) {
                let nrDoc = $("#splitNrDoc").val();
                if (!nrDoc && ["ALT", "SCU", "WKR"].includes(session.Ls_SistExp)) {
                    toastPrimary('Preencha o número de documento!', `O número de documento é obrigatório para lançamentos múltiplos no sistema ${session.Ls_SistExp === "WKR" ? "WK" : (session.Ls_SistExp === "ALT" ? "Alterdata" : "SCI Único")}.`, 'error');
                    return;
                }

                // if (session.Ls_SistExp == "HXA") {
                // $(".splitHistInput").val($("#splitHistInput-original").val())
                // }
                if (
                    ($("#splitCredInput-original").val() == "" || $("#splitDebInput-original").val() == "") &&
                    !($("#splitCredInput-original").val() == "" && $("#splitDebInput-original").val() == "")
                ) {
                    disableInputsMultiple($("#splitDebInput-original").val() == "");
                }
                $("#multiple").addClass("active");
                $("#simple").removeClass("active");
                $("#originalRecord").show();
                $(".splitCredInput, .splitDebInput").on("blur", function() {
                    $this = $(this);
                    if ($this.val() === "") {
                        enableInputsMultiple();
                    } else {
                        if ($this.attr("id") === "splitCredInput-original") {
                            isCred = true;
                        } else if ($this.attr("id") === "splitDebInput-original") {
                            isCred = false;
                        } else {
                            isCred = $this.hasClass("splitDebInput");
                        }
                        disableInputsMultiple(isCred);
                    }
                });
            } else {
                Swal.fire({
                    title: "Lançamentos múltiplos indisponíveis!",
                    text: "Os lançamentos múltiplos só estão disponíveis para os seguintes layouts de exportação:\n\n" + allLayM + "\n\nCaso queira realizar lançamentos múltiplos nesse layout, entre em contato com o seu sistema contábil e nos envie a forma como deve ser feitos.",
                    icon: "error",
                    confirmButtonText: "Ok",
                    confirmButtonColor: '#487fe2',
                });
            }
        }
    }

    function disableElement($elm) {
        $elm.val("")
        $elm.css("background-color", "#d7d7d7")
        $elm.prop("disabled", true);
    }

    function disableInputsMultiple(isCred) {
        if (!isCred) {
            disableElement($("#splitCredInput-original"))
            disableElement($(".splitDebInput").not("#splitDebInput-original"))
            disableElement($(".splitHPInput").not("#splitHPInput-original"))
        } else {
            disableElement($("#splitDebInput-original"))
            disableElement($(".splitCredInput").not("#splitCredInput-original"))
            disableElement($(".splitHPInput").not("#splitHPInput-original"))
        }
    }

    function enableInputsMultiple() {
        $(".splitDebInput, .splitCredInput, .splitHPInput").css("background-color", "white")
        $(".splitDebInput, .splitCredInput, .splitHPInput").prop("disabled", false);
    }

    function getValueTotal() {
        valueOnInputs = 0;
        $(".splitValueInput").each(function(index) {
            $input = $(this);
            if (!$input.attr("id").includes("-original")) {
                val = (parseFloat($input.val().replace(",", ".")) || 0);
                valueOnInputs += val;
            }
        });
        return Math.round(valueOnInputs * 1e2) / 1e2;
    }

    function recalculateInputValue() {
        //pega todos os inputs de valor menos o último e os escondidos, os soma, e verifica o valor que sobra, e o coloca no último input
        var value = parseFloat($("#splitValue").text().replace(",", "."));
        var valueOnInputs = 0;
        var length = $(".splitValueInput").length;
        $(".splitValueInput").each(function(index) {
            $input = $(this);
            if (index !== length - 1 && !$input.attr("id").includes("-original")) {
                val = (parseFloat($input.val().replace(",", ".")) || 0);
                valueOnInputs += val;
            }
        });
        $(`.splitValueInput`).last().val((value - valueOnInputs).toFixed(2).replace(".", ","));
    }

    function addRowDesmembramento(isEdit = false, isMain = false) {
        //obtém o id da próxima linha a partir da última
        rowAmount = isMain ? 'original' : getDesmembramentoRowId();

        //verifica quantos campos de contabilidade são (HP, Deb, Cred, etc) e coloca o width de acordo
        let inputWidth = 100 / qtdText + "%";
        let debInput = `<input type="text" class="form-input splitDebInput" id="splitDebInput-${rowAmount}">`;
        let credInput = `<input type="text" class="form-input splitCredInput" id="splitCredInput-${rowAmount}">`;
        let hpInput = `<input type="text" class="form-input splitHPInput" id="splitHPInput-${rowAmount}">`;
        let accountingInput;
        switch (qtdText) {
            case 1:
                accountingInput = debInput;
                break;
            case 2:
                accountingInput = debInput + credInput;
                break;
            case 3:
                accountingInput = hpInput + debInput + credInput;
                break;
            default:
                break;
        }

        //pega o histórico e o coloca no input. também monta os outros inputs

        let useHistFromFirstInput = false; //session.Ls_SistExp === "HXA" && $("#splitHistInput-original").val()

        var hist = useHistFromFirstInput ? $("#splitHistInput-original").val() : $("#splitHist").text();
        var value = parseFloat($("#splitValue").text().replace(",", "."));
        let histInput = `<input type="text" class="form-input w-100 splitHistInput" id="splitHistInput-${rowAmount}" value="${hist}">`;
        let valueInput = `<input type="text" class="form-input splitValueInput" id="splitValueInput-${rowAmount}" ${isMain ? 'style="background-color:#d7d7d7" disabled' : ''}>`;

        //se for a primeira linha adiciona um tr escondido do registro original, se não for edição
        if (rowAmount == "0" && !isEdit) {
            $("#splitTable tbody").prepend(`
                <tr id="originalRecord" style="display:none">
                    <td><input type="text" class="form-input w-100 splitHistInput" id="splitHistInput-${rowAmount}" value="${hist}"></td>
                    <td><input type="text" class="form-input splitValueInput" id="splitValueInput-${rowAmount}" value="${(value.toFixed(2)).replace(".", ",")}" style="background-color:#d7d7d7" disabled></td>
                    <td class="flex flex-row splitAccountingInput">${accountingInput}</td>
                    <td><button class="btn btn-danger deleteRow"><i class="ti-trash"></i></button></td>
                </tr>
            `);
            //muda o id dos inputs
            $("#originalRecord td input").each(function(index) {
                let $this = $(this);
                let id = $this.attr("id");
                $this.attr("id", id.replace("-0", "-original"));
            });
        }

        //coloca os elementos na tabela
        $("#splitTable tbody").append(`
            <tr ${isMain ? 'id="originalRecord"' : ''}>
                <td>${histInput}</td>
                <td>${valueInput}</td>
                <td class="flex flex-row splitAccountingInput">${accountingInput}</td>
                <td><button class="btn btn-danger deleteRow"><i class="ti-trash"></i></button></td>
            </tr>
        `);
        $(".splitAccountingInput input").css("width", inputWidth);

        //keyup no input do valor para corrigir valores incorretos
        $(`#splitValueInput-${rowAmount}`).on('change, keyup', function() {
            var currentInput = $(this).val();
            var fixedInput = currentInput.replace(/[^0123456789\-,]/g, '');
            fixedInput = fixedInput.replace(/(?<=(\d)+,\d{2}).+/g, '');
            $(this).val(fixedInput);
        });

        // if (session.Ls_SistExp === "HXA") {
        //keyup no input do histórico (HXA apenas) para manter todos os históricos iguais
        // $(`.splitHistInput`).on('change, keyup', function () {
        // if ($("#multiple").hasClass("active")) {
        // var currentInput = $(this).val();
        // $(".splitHistInput").val(currentInput);
        // }
        // });
        // }

        //calcula o valor restante e coloca no último input
        recalculateInputValue();

        //onblur para criar uma nova linha caso o valor ainda não esteja completo
        $(`#splitValueInput-${rowAmount}`).on('blur', function() {
            valueOnInputs = getValueTotal();
            //se o valor não estiver completo, cria uma nova linha
            if (valueOnInputs < value && $(this).val() !== "") {
                addRowDesmembramento();
            }
        });

        if ($("#multiple").hasClass("active")) {
            if ($("#splitDebInput-original").prop("disabled")) {
                disableInputsMultiple(true);
            }
            if ($("#splitCredInput-original").prop("disabled")) {
                disableInputsMultiple(false);
            }
        }

        //se o id for 0 não exibe o botão de deletar
        if (rowAmount == "0") {
            $(".deleteRow").css("visibility", "hidden");
        }

        //onclick no botão de deletar para deletar e recalcular o valor
        $(".deleteRow").on("click", function() {
            $(this).parent().parent().remove();
            recalculateInputValue();
        });
    }

    function buildEditDesmembramento(dataFromDatabase) {
        var opc = dataFromDatabase[0].Opc;
        dataFromDatabase.sort(function(a, b) {
            return a.Id - b.Id;
        });
        dataFromDatabase.forEach(function(data, index) {
            addRowDesmembramento(true, data.Main === '1');
            $(".splitValueInput").last().val(data.Valor);
            $(".splitHistInput").last().val(data.Hist);
            $(".splitDebInput").last().val((data.CtDeb || "").replace("D", ''));
            $(".splitCredInput").last().val(data.CtCre);
            $(".splitHPInput").last().val(data.HP);
        })
        toggleRecordType(opc);
    }

    function deleteDesmembrar(isEdit = false, isEsclarecimento = false) {
        id = $(isEsclarecimento ? '#escCod' : '#splitCod').val();
        const index = originalRecords.findIndex(({
            CodTemp
        }) => CodTemp === id);
        const isRel = $("#recordRel").prop("checked");
        if (isEsclarecimento && isRel) {
            const histRel = $("#escHistRel").val();
            originalRecords.forEach((element, i) => {
                if (element.HistRel == histRel) {
                    element.Opc = "";
                    element.CtCre = "";
                    element.CtDeb = "";
                    element.HP = "";
                    originalRecords.splice(i, 1, element);
                }
            });
            records = originalRecords;
            buildTable();
            Loader.startLoading();
            return $.ajax({
                type: 'POST',
                url: `${BASE_URL}/rest/esclarecimento/deleteMultiple.php`,
                data: JSON.stringify({
                    histRel
                }),
                contentType: 'application/json',
                dataType: 'json',
                success: () => {
                    Loader.stopLoading();
                    toastPrimary('Sucesso!', 'Esclarecimento cancelado!', 'success');
                },
                error: () => {
                    Loader.stopLoading();
                    toastPrimary('Erro', 'Erro ao realizar operação, recarregue e tente novamente por favor!', 'error');
                }
            });
        }
        const newData = { ...originalRecords[index],
            Opc: '0',
            CtDeb: '',
            CtCre: '',
            HP: ''
        };
        originalRecords.splice(index, 1, newData);
        records = originalRecords;
        buildTable();
        return $.ajax({
            type: 'POST',
            url: `${BASE_URL}/rest/lancamentos/complemento.php?action=delete`,
            data: JSON.stringify({
                id
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: () => {
                if (!isEdit) {
                    toastPrimary('Sucesso!', isEsclarecimento ? 'Esclarecimento cancelado!' : 'Desmembramento desfeito com sucesso!', 'success');
                }
                updateEmpInfo(isEdit, true);
            },
            error: () => {
                toastPrimary('Erro', 'Erro ao realizar operação, recarregue e tente novamente por favor!', 'error');
            }
        })
    }

    function confirmDesmembrar(isEdit = false) {
        if (!enableDesmemb) {
            return
        };
        enableDesmemb = false;
        //pega os dados que são iguais para todos
        var orValue = parseFloat($('#splitValue').text().replace(",", "."));
        var date = $('#splitDate').text();
        var nrDoc = $('#splitNrDoc').val();
        var histRel = $('#splitHistRel').val();
        var orHist = $('#splitHist').text();
        var cod = $('#splitCod').val();
        var isMultiple = $('#multiple').hasClass("active");
        if (isMultiple && !nrDoc && ["ALT", "SCU", "WKR"].includes(session.Ls_SistExp)) {
            enableDesmemb = true;
            toastPrimary('Preencha o número de documento!', `O número de documento é obrigatório para lançamentos múltiplos no sistema ${session.Ls_SistExp === "WKR" ? "WK" : (session.Ls_SistExp === "ALT" ? "Alterdata" : "SCI Único")}.`, 'error');
            return;
        }
        if (orValue !== getValueTotal()) {
            enableDesmemb = true;
            toastPrimary('Valor incorreto!', 'A soma dos valores dos registros deve ser igual ao valor original!', 'error');
            return;
        }
        if ($("#splitTable tbody tr").length == 2) {
            enableDesmemb = true;
            toastPrimary('Registros insuficientes!', 'Divida o registro original em ao menos duas vezes.', 'error');
            return;
        }
        //valida os outros dados em cada linha visível
        var valHist = valValue = valAccounts = true;
        var recordArray = [];
        if (!isMultiple) {
            recordArray.push({
                hist: orHist,
                value: orValue,
                hp: '',
                deb: 'D',
                cred: '',
                date,
                nrDoc,
                histRel,
                opc: isMultiple ? 'M' : 'S',
                main: '1'
            });
        }
        var hp = $("#splitHPInput-original").val();
        $("#splitTable tbody tr").each(function(index) {
            $elm = $(this);
            if ($elm.css("display") != "none") {
                let hist = $elm.find(".splitHistInput").val();
                let value = parseFloat($elm.find(".splitValueInput").val().replace(",", "."));
                let deb = $elm.find(".splitDebInput").val();
                let cred = $elm.find(".splitCredInput").val();
                if (!isMultiple) {
                    hp = $elm.find(".splitHPInput").val();
                }
                if (!hist) {
                    valHist = false;
                }
                if (!value) {
                    valValue = false;
                }
                if (!deb && !cred) {
                    valAccounts = false;
                }
                if (valHist && valValue && valAccounts) {
                    recordArray.push({
                        hist,
                        value,
                        hp,
                        deb,
                        cred,
                        date,
                        nrDoc,
                        histRel,
                        opc: isMultiple ? 'M' : 'S',
                        main: $elm.attr("id") === "originalRecord" ? '1' : '0',
                        type: 'D'
                    });
                } else {
                    return;
                }
            }
        })
        if (valHist && valValue && valAccounts) {
            if (isEdit) {
                deleteDesmembrar(true);
            }
            const index = originalRecords.findIndex(({
                CodTemp
            }) => CodTemp === cod);
            const newData = { ...originalRecords[index],
                Opc: isMultiple ? 'M' : 'S',
                CtDeb: 'D',
                NrDoc: nrDoc
            };
            originalRecords.splice(index, 1, newData);
            records = originalRecords;
            searchInTable();
            $("#btnConfirmDesmembrar").prop("onclick", null).off("click");
            return $.ajax({
                type: 'POST',
                url: `${BASE_URL}/rest/lancamentos/complemento.php?action=insert`,
                data: JSON.stringify({
                    id: cod,
                    nrDoc,
                    type: 'D',
                    opc: isMultiple ? 'M' : 'S',
                    hasTemp: true,
                    data: recordArray
                }),
                contentType: 'application/json',
                dataType: 'json',
                success: () => {
                    toastPrimary('Sucesso!', `Registro ${isEdit ? 'alterado' : 'desmembrado'} com sucesso!`, 'success');
                    updateEmpInfo(isEdit);
                    $('#modal-split').modal('toggle');
                },
                error: () => {
                    toastPrimary('Erro', 'Erro ao realizar operação, recarregue e tente novamente, por favor!', 'error');
                }
            });
        } else {
            if (!valHist) {
                enableDesmemb = true;
                toastPrimary('Histórico vazio!', 'Por favor, preencha todos os históricos.', 'error');
            }
            if (!valValue) {
                enableDesmemb = true;
                toastPrimary('Valor vazio!', 'Por favor, preencha todos os valores.', 'error');
            }
            if (!valAccounts) {
                enableDesmemb = true;
                toastPrimary('Contas vazias!', 'Por favor, preencha pelo menos uma conta em cada registro.', 'error');
            }
            return;
        }
    }

    function removeRowDesmembramento() {
        $("#splitTable tbody").empty();
    }

    function onDesmembrar(cod, date, doc, hist, histRel, value, isEdit, typeRec) {

        if (qtdText === 1) {
            deb = $("#field-" + cod + "-0").val();
        } else if (qtdText === 2) {
            deb = $("#field-" + cod + "-0").val();
            cred = $("#field-" + cod + "-1").val();
        } else {
            hp = $("#field-" + cod + "-0").val();
            deb = $("#field-" + cod + "-1").val();
            cred = $("#field-" + cod + "-2").val();
        }
        $('#modal-split').modal('show');
        $('#splitDate').text(date);
        $('#splitHist').text(hist);
        $('#splitHistRel').val(histRel);
        $('#splitCod').val(cod);
        $('#splitNrDoc').val(doc);
        $('#splitValue').text(value.replace(".", ","));
        removeRowDesmembramento();
        $('#btnConfirmDesmembrar').off('click');
        enableDesmemb = true;
        if (isEdit) {
            $("#btnDeleteDesmembrar").css("display", "block");
            $("#btnConfirmDesmembrar").text("Editar desmembramento");
            $("#btnConfirmDesmembrar").on("click", function() {
                confirmDesmembrar(true);
            });
            return $.ajax({
                type: 'POST',
                url: `${BASE_URL}/rest/lancamentos/complemento.php?action=select`,
                data: JSON.stringify({
                    id: cod,
                    data: []
                }),
                contentType: 'application/json',
                dataType: 'json',
                success: (data) => buildEditDesmembramento(data),
            });
        } else {
            toggleRecordType('S');
            $("#btnDeleteDesmembrar").css("display", "none");
            $("#btnConfirmDesmembrar").text("Desmembrar");
            $("#btnConfirmDesmembrar").on("click", function() {
                confirmDesmembrar();
            })
            addRowDesmembramento();
            $("#splitHPInput-original").val(hp === "null" ? "" : hp);
            $("#splitDebInput-original").val(deb === "null" ? "" : deb);
            $("#splitCredInput-original").val(cred === "null" ? "" : cred);
        }
    }

    $("#simple").on("click", function() {
        toggleRecordType('S');
    });

    $("#multiple").on("click", function() {
        toggleRecordType('M');
    });

    $("#btnDeleteDesmembrar").on("click", function() {
        deleteDesmembrar();
        $('#modal-split').modal('toggle');
    });

    $("#btnConfirmDesmembrar").on("click", function() {
        confirmDesmembrar();
    });


    //#endregion

    //#region Esclarecimento

    function removeInputsEsclarecimento() {
        $("#esclarecimento-accounts").empty();
    }

    async function confirmEsclarecimento() {
        var cod = $("#escCod").val();
        var histRel = $("#escHistRel").val();
        var date = $("#escDate").text();
        var nrDoc = $("#escNrDoc").text();
        var hist = $("#escHist").text();
        var value = parseFloat($("#escValue").text().replace(",", "."));
        var deb = $("#escDebInput").val();
        var cred = $("#escCredInput").val();
        var hp = $("#escHPInput").val();
        var obs = $("#obsEsc").val();
        var recordRel = $("#recordRel").is(":checked");
        var tpCont = session.Ls_TpCont;
        tpCont = tpCont.split("/").length;
        if (recordRel) {
            cadastrarRel = await new Promise(async function(resolve) {
                Loader.startLoading();
                await onCadastrarRelacionamento(cod, {
                    hp,
                    deb,
                    cred
                }, "E", resolve);
            }).then(function(resp) {
                Loader.stopLoading();
                if (resp) {
                    toastPrimary('Sucesso!', `No final do dia, será enviado um email solicitando esclarecimento.`, 'success');
                } else {
                    toastPrimary('Erro', 'Erro ao realizar operação, recarregue e tente novamente por favor!', 'error');
                }
                $('#modal-esclarecimento').modal('toggle');
            });
            return;
        }

        const index = originalRecords.findIndex(({
            CodTemp
        }) => CodTemp === cod);
        const newData = { ...originalRecords[index],
            Opc: 'P',
            CtDeb: 'D'
        };

        originalRecords.splice(index, 1, newData);
        records = originalRecords;
        searchInTable();

        return $.ajax({
            type: 'POST',
            url: `${BASE_URL}/rest/lancamentos/complemento.php?action=insert`,
            data: JSON.stringify({
                id: cod,
                nrDoc,
                hasTemp: true,
                opc: 'P',
                type: 'E',
                data: [{
                    hist,
                    value,
                    hp,
                    deb,
                    cred,
                    date,
                    nrDoc,
                    histRel,
                    opc: 'P',
                    main: '1',
                    obs,
                    type: 'E',
                }]
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: () => {
                toastPrimary('Sucesso!', `No final do dia, será enviado um email solicitando esclarecimento.`, 'success');
                $('#modal-esclarecimento').modal('toggle');
            },
            error: () => toastPrimary('Erro', 'Erro ao realizar operação, recarregue e tente novamente por favor!', 'error')
        });
    }


    function updateEsclarecer() {
        var cod = $("#escCod").val();
        var deb = $("#escDebInput").val();
        var cred = $("#escCredInput").val();
        var hp = $("#escHPInput").val();
        var obs = $("#obsEsc").val();
        return $.ajax({
            type: 'POST',
            url: `${BASE_URL}/rest/lancamentos/complemento.php?action=update`,
            data: JSON.stringify({
                id: cod,
                data: [{
                    hp,
                    deb,
                    cred,
                    obs,
                }]
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: () => {
                toastPrimary('Sucesso!', `Mensagem alterada com sucesso!`, 'success');
                $('#modal-esclarecimento').modal('toggle');
            },
            error: () => toastPrimary('Erro', 'Erro ao realizar operação, recarregue e tente novamente por favor!', 'error')
        });
    }

    function onEsclarecimento(email, id, date, nrDoc, hist, value, histRel, isEdit) {
        if (qtdText === 1) {
            hp = "";
            deb = $("#field-" + id + "-0").val();
            cred = "";
        } else if (qtdText === 2) {
            hp = "";
            deb = $("#field-" + id + "-0").val();
            cred = $("#field-" + id + "-1").val();
        } else {
            hp = $("#field-" + id + "-0").val();
            deb = $("#field-" + id + "-1").val();
            cred = $("#field-" + id + "-2").val();
        }

        $("#recordRel").on("change", function() {
            if (["111111", "654321", "999999"].includes(session.user_base) && session.Ls_SistImp === "KrG_1") {
                $("#recordRel").prop("checked", false);
                return toastPrimary('Opção desabilitada!', 'Opção desabilitada para esse layout nas bases Demonstração, Suporte e DSN devido ao arquivo de demonstração Sped.', 'error');
            }
            const isRel = $(this).prop("checked");
            $("#obsEsc").attr("disabled", isRel);
            if (isRel) {
                $("#obsEsc").css("background-color", "#F0F0F0");
                $("#obsEsc").val("Não é possível enviar observações em esclarecimentos com o robô ativo.");
            } else {
                $("#obsEsc").css("background-color", "#FFFFFF");
                $("#obsEsc").val("");
            }
        });

        removeInputsEsclarecimento();
        let debInput = `<input type="text" class="form-input w-100 esclarecimentoInput" id="escDebInput" value="${deb}">`;
        let credInput = `<input type="text" class="form-input w-100 esclarecimentoInput" id="escCredInput" value="${cred}">`;
        let hpInput = `<input type="text" class="form-input w-100 esclarecimentoInput" id="escHPInput" value="${hp}">`;
        let accountingInput;
        switch (qtdText) {
            case 1:
                accountingInput = debInput;
                break;
            case 2:
                accountingInput = debInput + credInput;
                break;
            case 3:
                accountingInput = hpInput + debInput + credInput;
                break;
            default:
                break;
        }
        $("#obsEsc").val("");
        $("#esclarecimento-accounts").append(accountingInput);
        $("#btnConfirmEsclarecer").prop("onclick", null).off("click");

        if (['P', 'N'].includes(isEdit)) {
            $.ajax({
                type: 'POST',
                url: `${BASE_URL}/rest/lancamentos/complemento.php?action=select`,
                data: JSON.stringify({
                    id,
                    data: []
                }),
                contentType: 'application/json',
                dataType: 'json',
                success: (data) => {
                    $("#escDebInput").val(data[0] ? .CtDeb);
                    $("#escCredInput").val(data[0] ? .CtCre);
                    $("#escHPInput").val(data[0] ? .HP);
                    $("#obsEsc").val(data[0] ? .obs);
                    const isRel = data[0] ? .isRel == "1";
                    $("#recordRel").prop("checked", isRel);
                    if (isRel) {
                        $(".esclarecimentoInput").css("background-color", "#F0F0F0");
                        $(".esclarecimentoInput").attr("disabled", true);
                    } else {
                        $(".esclarecimentoInput").css("background-color", "#FFFFFF");
                        $(".esclarecimentoInput").removeAttr("disabled");
                    }
                },
            });
            $("#recordRelLabel").css("text-decoration", "line-through");
            $("#recordRel").attr("disabled", true);
            if (isEdit == "N") {
                $("#relDescription").text("Esclarecimento já enviado, não é possivel alterar.");
                $("#btnConfirmEsclarecer").css("display", "none");
                $("#btnDeleteEsclarecer").css("display", "none");
            } else if (isEdit == "P") {
                $("#relDescription").text("Para mudar essa opção, desfaça o esclarecimento.");
                $("#btnConfirmEsclarecer").css("display", "block");
                $("#btnConfirmEsclarecer").text("Editar envio");
                $("#btnDeleteEsclarecer").css("display", "block");
                $("#btnDeleteEsclarecer").on("click", function() {
                    deleteDesmembrar(false, true);
                    $('#modal-esclarecimento').modal('toggle');
                });
                $("#btnConfirmEsclarecer").on("click", function() {
                    updateEsclarecer();
                    $(this).prop('onclick', null).off('click');
                });
            }
        } else {
            $(".esclarecimentoInput").removeAttr("disabled");
            $(".esclarecimentoInput").css("background-color", "#FFFFFF");
            $("#recordRel").removeAttr("disabled");
            $("#recordRelLabel").css("text-decoration", "none");
            $("#recordRel").prop("checked", false);
            $("#relDescription").text("Ao marcar esta opção o sistema automaticamente vai identificar os próximos registros com o mesmo histórico e também serão enviados ao cliente para esclarecimento.");
            $("#btnConfirmEsclarecer").css("display", "block");
            $("#btnDeleteEsclarecer").css("display", "none");
            $("#btnConfirmEsclarecer").text("Agendar Envio");
            $("#btnConfirmEsclarecer").on("click", function() {
                confirmEsclarecimento();
                $(this).prop('onclick', null).off('click');
            });
        }
        $("#escDate").text(date);
        $("#escNrDoc").text(nrDoc);
        $("#escHist").text(hist);
        $("#escValue").text(value.replace(".", ","));
        $("#nomeFin").text((email || "|").split("|")[0].trim());
        $("#emailFin").text((email || "|").split("|")[1].trim());
        $("#escCod").val(id);
        $("#escHistRel").val(histRel);
        $('#modal-esclarecimento').modal('show');
        $("#btnCancelEsclarecer, #btnCancelEsclarecerX").on("click", function() {
            $('#modal-esclarecimento').modal('hide');
        });


    }

    //#endregion

    //#region Filtro Personalizado
    $("#filterButton").on("click", function() {
        $('#modal-customFilter').modal('toggle');
        let fields = ["date", "doc", "hist", "value", "hp", "deb", "cred"];
        fields.forEach(field => {
            if ($("#" + field + "FilterType").val() === "") {
                $("#" + field + "FilterValue").attr("disabled", "true");
            }
            $("#" + field + "FilterType").on("change", function() {
                $("#" + field + "FilterValue").attr("disabled", $(this).val() === "");
                if ($(this).val() === "") {
                    $("#" + field + "FilterValue").val("")
                }
            });
        });
        contFieldsSplit = contFieldsSplit.split("/");
        if (contFieldsSplit.length == 3) {
            $("#hpLabel").text(contFieldsSplit[0]);
            $("#debLabel").text(contFieldsSplit[1]);
            $("#credLabel").text(contFieldsSplit[2]);
        } else if (contFieldsSplit.length == 2) {
            $("#debLabel").text(contFieldsSplit[0]);
            $("#credLabel").text(contFieldsSplit[1]);
            $("#hpFilterRow").remove();
        } else {
            $("#debLabel").text(contFieldsSplit[0]);
            $("#hpFilterRow").remove();
            $("#credFilterRow").remove();
        }
    });

    $("#btnConfirmCustomFilter").on("click", function() {

        let fields = ["date", "doc", "hist", "value", "hp", "deb", "cred"];

        let dateTempFilter = $("#dateFilterValue").val().split("-");
        let totalDaysFilter = parseInt(dateTempFilter[0]) * 365 + parseInt(dateTempFilter[1]) * 30 + parseInt(dateTempFilter[2]);

        let docValue = $("#docFilterValue").val().toUpperCase();
        let histValue = $("#histFilterValue").val().toUpperCase();
        let valueValue = parseFloat($("#valueFilterValue").val() ? .replace(",", "."));
        let hpValue = $("#hpFilterValue").val();
        let debValue = $("#debFilterValue").val();
        let credValue = $("#credFilterValue").val();

        customFilterIsActive = false;
        fields.forEach(field => {
            if ($("#" + field + "FilterType").val() !== "") {
                customFilterIsActive = true;
            }
        });

        $("#searchInput").val("");
        $("#searchInput").attr("disabled", customFilterIsActive);

        records = originalRecords.filter((data) => {

            // Inicializa o filtro
            let currentFilter = true;

            // Filtra pela data
            let dateTempRecord = data.Data ? .split("/");
            let totalDaysRecord = parseInt(dateTempRecord[2]) * 365 + parseInt(dateTempRecord[1]) * 30 + parseInt(dateTempRecord[0]);
            switch ($("#dateFilterType").val()) {
                case "before":
                    currentFilter = currentFilter && totalDaysRecord < totalDaysFilter;
                    break;
                case "after":
                    currentFilter = currentFilter && totalDaysRecord > totalDaysFilter;
                    break;
                case "is_equal":
                    currentFilter = currentFilter && totalDaysRecord === totalDaysFilter;
                    break;
            }

            let recordNrDoc = (data.NrDoc || "").toUpperCase();

            // Filtra pelo nrDoc
            switch ($("#docFilterType").val()) {
                case "contains":
                    currentFilter = currentFilter && recordNrDoc.includes(docValue);
                    break;
                case "doesnt_contain":
                    currentFilter = currentFilter && !recordNrDoc.includes(docValue);
                    break;
                case "is_equal":
                    currentFilter = currentFilter && recordNrDoc === docValue;
                    break;
                case "is_different":
                    currentFilter = currentFilter && recordNrDoc !== docValue;
                    break;
            }

            let recordHist = data.Hist.toUpperCase()

            // Filtra pelo histórico
            switch ($("#histFilterType").val()) {
                case "contains":
                    currentFilter = currentFilter && recordHist.includes(histValue);
                    break;
                case "doesnt_contain":
                    currentFilter = currentFilter && !recordHist.includes(histValue);
                    break;
                case "is_equal":
                    currentFilter = currentFilter && recordHist === histValue;
                    break;
                case "is_different":
                    currentFilter = currentFilter && recordHist !== histValue;
                    break;
            }

            let recordValue = parseFloat(data.Valor)

            // Filtra pelo valor
            switch ($("#valueFilterType").val()) {
                case "higher_than":
                    currentFilter = currentFilter && recordValue > valueValue;
                    break;
                case "lower_than":
                    currentFilter = currentFilter && recordValue < valueValue;
                    break;
                case "is_equal":
                    currentFilter = currentFilter && recordValue === valueValue;
                    break;
                case "is_different":
                    currentFilter = currentFilter && recordValue !== valueValue;
                    break;
            }

            // Filtra pelo HP
            switch ($("#hpFilterType").val()) {
                case "is_equal":
                    currentFilter = currentFilter && data.HP === hpValue;
                    break;
                case "is_different":
                    currentFilter = currentFilter && data.HP !== hpValue;
                    break;
            }

            // Filtra pelo HP
            switch ($("#debFilterType").val()) {
                case "is_equal":
                    currentFilter = currentFilter && data.CtDeb === debValue;
                    break;
                case "is_different":
                    currentFilter = currentFilter && data.CtDeb !== debValue;
                    break;
            }

            // Filtra pelo HP
            switch ($("#credFilterType").val()) {
                case "is_equal":
                    currentFilter = currentFilter && data.CtCre === credValue;
                    break;
                case "is_different":
                    currentFilter = currentFilter && data.CtCre !== credValue;
                    break;
            }

            return currentFilter
        })
        maxPage = Math.ceil(records.length / 200);
        currentPage = 1;
        buildTable();
        $('#modal-customFilter').modal('toggle');
    });

    $("#valueFilterValue").on('change, keyup', function() {
        var currentInput = $(this).val();
        var fixedInput = currentInput.replace(/[^0123456789,]/g, '');
        fixedInput = fixedInput.replace(/(?<=(\d)+,\d{2}).+/g, '');
        $(this).val(fixedInput);
    });

    $("#btnDeleteCustomFilter").on("click", function() {
        clearFieldsCustomFilter();
        $("#btnConfirmCustomFilter").trigger("click");
    });

    function clearFieldsCustomFilter() {
        let fields = ["date", "doc", "hist", "value", "hp", "deb", "cred"];
        fields.forEach(field => {
            $("#" + field + "FilterType").val("");
            $("#" + field + "FilterValue").val("");
            $("#" + field + "FilterValue").attr("disabled", true);
        });
    }


    //#endregion

    //#region Atualiza #empInfo
    function updateEmpInfo(isEdit, isDelete = false) {
        const element = $('#empInfo');
        const currentValue = element.text().trim();
        element.text(currentValue.replace(/^(.*?) (\d+)\/(\d+)$/, (
            match, group1, group2, group3) => `${group1} ${isDelete ? Number(group2) - 1 : Number(group2) + 1}/${group3}`));

        return;
    }
    //#endregion

    //#region Formatação de valor
    function formatValue(value) {
        if (/\d+:\d+/.test(value) && session.SistPrincLS === "LSDep") {
            return value.trim();
        }
        return formatter.format(value).replace("R$", "").trim();
    }
    //#endregion

    //#region Marcação de registros temporários
    function markAsTemporary(cod) {

        const record = getRecordFromCodTemp(cod);
        // Cria o row com o codigo e as contas
        const row = {
            "codTemp": cod
        };
        const recordRow = {
            "codTemp": cod
        };

        getFieldsArray().map(function(field, i) {
            row[field] = $(`.acc-input[codtemp=${cod}][name=${field}]`).val();
            recordRow[field] = record[field] || "";
        });
        if (JSON.stringify(row) == JSON.stringify(recordRow)) {
            return removeFromTempList(cod);
        }

        // Se estiver tudo vazio não marca
        let accounts = Object.values(row);
        accounts.shift();
        if (accounts.every((value) => value === "")) {
            return;
        }

        // Procura se já tem um com o mesmo código marcado
        let found = false;
        tempRecords.forEach(function(element, i) {
            if (element.codTemp === cod) {
                tempRecords[i] = row;
                found = true;
                return;
            }
        });

        // Se já não estiver marcado, marca
        if (!found) {
            tempRecords.push(row);
            if (tempRecords.length > 0 && tempRecords.length % 10 === 0) {
                toastPrimary(
                    `Você possui ${tempRecords.length} registros não confirmados.`,
                    'Eles serão perdidos caso a página seja recarregada.',
                    'info'
                )
            }
        }

        $("#buttons-wrapper-" + cod).addClass("tempRecord");
    }

    function removeFromTempList(cod) {
        tempRecords.forEach(function(element, i) {
            if (element.codTemp === cod) {
                tempRecords.splice(i, 1);
                return;
            }
        });
        $("#buttons-wrapper-" + cod).removeClass("tempRecord");
    }

    function getTempRecord(cod) {
        retValue = null;
        tempRecords.forEach(function(element, i) {
            if (element.codTemp === cod) {
                retValue = element;
                return;
            }
        });
        return retValue;
    }

    //#endregion

    //#region Plano de contas

    function openAccountPlan(id) {
        currentInputAccountPlan = id;
        showAccountPlan(accountPlan.id, accountPlan.name, accountPlan.layout, accountPlan.data, false, true);
    }

    //#endregion
});