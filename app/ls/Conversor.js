let daysSince = null;
const isExtComp = window.location.href.includes("ExtComp")
allStates = availableMunicipalities = []
fetch('nfs_municipalities.json')
    .then(response => response.json())
    .then(data => {
        // Aqui você tem acesso ao array de objetos JSON
        allStates = data.allStates;
        availableMunicipalities = data.availableMunicipalities;
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));

function getStateName(state) {
    stateName = "";
    allStates.forEach(element => {
        if (state === element.sigla) {
            stateName = element.nome;
            return;
        }
    });
    return stateName;
}

function seeExtComp(type) {
    $("#upload").removeAttr("required");
    $("#uploadComp").removeAttr("required");
    $("#cadastro").attr("action", "layout/processa_ExtComp.php?see=" + type);
    Loader.startLoading()
    document.getElementById('cadastro').submit();
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function(item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function normalizeSearch(text) {
    text = text.toUpperCase();
    text = text.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    text = text.replace(/-/g, "");
    text = text.replace(/\s+/g, " ");
    text = text.trim();
    return text;
}

function TipoFile() {
    var tpfile = document.cadastro.Empresa.value;
    var tpfile = tpfile.split('|');
    var input = document.querySelector('#upload');
    input.setAttribute('accept', tpfile);
};


function verificaMostraUpload() {
    //Mostra Upload
    if (document.cadastro.Empresa.value.length !== 0) {
        $('#GpUpload').show();
    };
}

function ProcessaForm(lastImport = false, extComp = false) {
    if (daysSince !== null && daysSince < 7 && !lastImport) {
        confirm = false
        Swal.fire({
            title: 'Atenção!',
            text: 'Você está importando um novo arquivo. Caso confirme, as alterações individuais da importação anterior serão perdidas permanentemente. Digite "CONFIRMO" para continuar.',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            showLoaderOnConfirm: true,
            preConfirm: (resp) => {
                if (resp.toUpperCase().trim() === "CONFIRMO") {
                    confirm = true;
                } else {
                    toastPrimary('Tente novamente', "Digite \"CONFIRMO\" para importar.", "error")
                }
            },
        }).then(() => {
            if (confirm) {
                startImport(lastImport, extComp);
            }
        })
    } else {
        startImport(lastImport, extComp);
    }
}

async function startImport(lastImport, extComp = false) {
    if ($("#lastImport").val() == '' && extComp === false) {
        await new Promise(function(resolve, reject) {
            Swal.fire({
                title: 'Deseja sempre salvar a última importação para esta empresa?',
                text: 'Caso aceite, poderá acessar a última importação desta empresa em até 7 dias ou até realizar uma nova importação.\n\nEssa configuração pode ser alterada no Cadastro de Empresas.',
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                showLoaderOnConfirm: true,
            }).then((isConfirm) => {
                $("#updateLastImport").val(isConfirm ? "1" : "0");
                resolve();
            });
        })
    }
    if (!lastImport) {
        document.getElementById('cadastro').action += "?newImport=1";
        if (extComp) {
            document.getElementById('cadastro').action += "&extComp=" + extComp;
        }
    } else {
        $("#upload").removeAttr('required')
    }
    if (document.cadastro.Empresa.value.length == 0) {
        alert('Informe a Empresa Antes de Importar o Arquivo!!!')
        document.cadastro.Empresa.focus()
        return false;
    } else {
        if (dateInput && $("#datepicker").val() === "") {
            return toastPrimary('Campo de data vazio!',
                "O campo \"Contabilização\" é obrigatório para esse layout.", "error")
        }
        if (yearInput && $("#yearReg").val() === "") {
            return toastPrimary('Campo de ano vazio!',
                "O campo \"Ano dos Lançamentos\" é obrigatório para esse layout.", "error")
        }
        sessionStorage.removeItem("currentPage");
        Loader.startLoading()

        document.getElementById('cadastro').submit();
    }
}

function EscreveArq(isComp = false) {
    if (isComp) {
        var nomeDoArquivo = $("#uploadComp").val().split("\\").pop();
        $("#NomeArqComp").text(nomeDoArquivo);
    } else {
        var nomeDoArquivo = $("#upload").val().split("\\").pop();
        $("#NomeArq").text(nomeDoArquivo);
    }
};

function verificaMostraBotao() {
    if ($("#upload").val() != "") {
        if (isExtComp) {
            $('#processaExt').show();
        } else {
            $('#processa').show();
        }
        $(window).load(function() {
            $("#Loader").fadeOut("slow");
        })
    }
    if (isExtComp) {
        if ($("#uploadComp").val() != "") {
            $('#processaComp').show();
        }
        $(window).load(function() {
            $("#Loader").fadeOut("slow");
        })
    }

    //Mostra Campo de Data
    var nomeDoLayout = document.cadastro.Empresa.value.split("|");

    // Exceção issue 6001
    var isExceptionHuL_1 = nomeDoLayout[3] === "HuL_1" && [202220, 999999, 654321].includes(
        base); // Específico da issue #5393


    system = session.SistPrincLS;

    // Layouts que precisam do input de data para importar corretamente
    dateInput = [
        'MmJ_8', 'CfC_5', 'CfC_21', 'RaS_3', 'BaL_1', 'NfX_1', 'UqF_1', 'QtW_1',
        'RcW_1', 'CdU_1', 'AuN_1', 'VyV_1', 'CwZ_1', 'GmP_1', 'WrM_1', 'KzF_1',
        'NaX_1', 'HmK_1', 'MaG_1', 'EqG_1', 'CfG_1', 'VoS_1', 'QqP_1', 'OtA_1',
        'LhA_1', 'KtJ_2', 'DhJ_1', 'AxJ_1', 'JiO_2', 'SnA_1', 'YpX_1', 'CtX_1',
        'SgC_1', 'AmU_1', 'EoZ_1', 'XdO_1', 'TxV_2', 'RfC_3', 'TlV_1', 'SqC_1',
        'IkC_1', 'SnY_1', 'WeM_1', 'ZcE_1', 'CoS_2', 'YqZ_1', 'ZxS_1', 'PjX_1',
        'GyZ_2', 'HaW_1', 'HeD_1', 'FwN_1', 'PiY_1', 'JgX_1', 'NyY_1', 'SaV_1',
        'UaG_1', 'NmJ_1', 'GeF_1', 'RtF_1', 'IfV_1', 'LcT_1', 'XuF_1'
    ];

    // Layouts que às vezes precisam do input de data
    optionalDateInput = [
        'RfD_1', 'JtG_1', 'ThJ_1', 'TsE_1', 'QtK_1', 'GcW_1', 'WtX_1', 'JjP_1',
        'JrR_1', 'TtC_1', 'QmT_1', 'YqC_1', 'LxG_1', 'LwO_1', 'OsX_2', 'HcL_1',
        'TwH_1', 'QsA_1', 'ScX_1', 'ArV_1', 'ZyQ_1', 'SIC_19', 'BmL_1', 'YsR_1'
    ];

    // Layouts que precisam do input de ano para importar corretamente
    yearInput = [
        'EsA_1', 'ExI_4', 'OrT_1', 'BnS_3', 'VsM_4', 'CfC_13', 'ExS_8', 'ExI_10',
        'ExI_9', 'OoO_17', 'ExS_20', 'ExU_4', 'ExS_22', 'NyU_1', 'SeV_1', 'MbY_2',
        'XbS_1', 'UxY_1', 'HoK_1', 'ZrM_1', 'YeJ_1', 'YnV_1', 'PqM_1', 'JnH_1',
        'VeG_1', 'EqV_1', 'YsR_1', 'AkD_1', 'RqH_1', 'PpK_1', 'FpY_1', 'OxE_1',
        'JdZ_1', 'OtS_1', 'TtX_1', 'WcJ_1', 'JoT_1', 'VjZ_1', 'IdF_1', 'UzR_1',
        'HzU_1', 'DjP_1', 'JwS_1', 'ErP_1', 'ZsN_1', 'IhH_1', 'UgX_1', 'UlL_1', 'AfO_1',
        'ZhF_1', 'YoA_1', 'JrI_1', 'SfT_1', 'EnN_2', 'EaN_1', 'HlF_1', 'IeZ_1',
        'GoP_1', 'PoI_1', 'UhI_1', 'CkT_2', 'ZtV_1', 'TqS_1', 'HrD_1', 'IwF_1', 'VqZ_2',
    ];

    // Layouts que às vezes precisam do input de ano
    optionalYearInput = [
        'DSN_M', 'KnO_1', 'WzR_1', 'UmT_1', 'QsA_1', 'XvF_1', 'IoC_1',
        'ExU_1', 'EeY_1', 'QrQ_1', 'IhD_1', 'BrD_12', 'CpJ_1', 'BaN_1', 'AoZ_1',
        'QqL_1', 'JjP_1', 'DvL_1', 'GkT_1', 'LhY_1', 'EpV_1', 'ScR_1', 'ZrF_2',
        'HcH_1', 'OpY_1', 'XxV_1', 'KrT_1', 'AaZ_1', 'ZoM_1', 'FcX_1', 'HnT_1',
        'KpZ_1', 'VkW_2', 'EnB_2'
    ];

    // Caso tenha essa exceção, aparece o input de data. Caso não tenha, apenas o de ano.
    if (["202220"].includes(base)) {
        optionalDateInput.push('HuL_1');
    } else {
        optionalYearInput.push('HuL_1');
    }

    if (["850440", "654321"].includes(base)) {
        optionalDateInput.push('UsX_1');
    }

    if (["400321"].includes(base)) {
        optionalDateInput.push('EeY_1');
        const index = optionalYearInput.indexOf('EeY_1');
        if (index !== -1)
            optionalYearInput.splice(index, 1);
    }

    dateInput = dateInput.includes(nomeDoLayout[3]) || customLayDateInput;
    optionalDateInput = optionalDateInput.includes(nomeDoLayout[3])
    yearInput = yearInput.includes(nomeDoLayout[3])
    optionalYearInput = optionalYearInput.includes(nomeDoLayout[3])

    if ($.isNumeric(nomeDoLayout[3])) {
        allCustomLayPDF.forEach(lay => {
            if (lay.id === nomeDoLayout[3]) {
                const hasInpDate = (lay.data.match(/"importDate":"(.?)"/) || ["", "0"])[1];
                switch (hasInpDate) {
                    case "Y":
                        dateInput = false;
                        yearInput = true;
                        break;
                    case "D":
                        dateInput = true;
                        yearInput = false;
                        break;
                    default:
                        dateInput = false;
                        yearInput = false;
                        break;
                }
            }
        });
    }

    layoutUsesDayInput = ['CrB_1'].includes(nomeDoLayout[3])
    layoutUsesAccInput = ['AWP', 'WCB'].includes(nomeDoLayout[4])
    layoutUsesDateAndInitialValueInputs = ['AWP'].includes(nomeDoLayout[4])

    if (layoutUsesDayInput) {
        $('#GpDay').show();
    } else {
        $('#GpDay').hide();
    };

    if (layoutUsesAccInput) {
        $('#GpAccount').show();
        if (nomeDoLayout[4] === "WCB") {
            $("#GpAccountLabel").text("Código do Banco:");
        } else {
            $("#GpAccountLabel").text("Conta:");
        }
    } else {
        $('#GpAccount').hide();
    };

    if (dateInput || optionalDateInput) {
        $('#GpData').show();
        if (optionalDateInput) {
            $('#GpDataAviso').text(
                "* Essa data só será utilizada se o layout não encontrar a data dos lançamentos no arquivo."
            );
        } else {
            $('#GpDataAviso').text("* Esse campo é obrigatório para a importação correta nesse layout.");
        }
        $('#GpDataAviso').show();

    } else {
        $('#GpData').hide();
    };
    if (system === "LSConc" || layoutUsesDateAndInitialValueInputs) {
        $('#GpData').show();
        $('#GpInitialValue').show();
        $('#GpCtBankExp').show();
        $('#GpData label strong').text("Competência:");
    } else {
        if (!(dateInput || optionalDateInput)) {
            $('#GpData').hide();
        }
        $('#GpInitialValue').hide();
        $('#GpCtBankExp').hide();
    }

    if (yearInput || optionalYearInput) {
        $('#GpAno').show();
        $('#GpAnoAviso').show();
        if (optionalYearInput) {
            $('#GpAnoAviso').text(
                "* Esse ano só será utilizado se o layout não encontrar o ano dos lançamentos no arquivo."
            );
        } else {
            $('#GpAnoAviso').text("* Esse campo é obrigatório para a importação correta nesse layout.");
        }
    } else {
        $('#GpAno').hide();
    }

    if (nomeDoLayout[4] == 'DF1') {
        $('#TpExportacao').show();
    } else {
        $('#TpExportacao').hide();
    }

    if (nomeDoLayout[4] == 'WXL') {
        $('#exceptionWXL').show();
    } else {
        $('#exceptionWXL').hide();
    }

    if (nomeDoLayout[4] == 'JOB') {
        $('#GpLanc').show();
    } else {
        $('#GpLanc').hide();
    }

    if (nomeDoLayout[4] == 'DF3') {
        $('#exceptionDF3').show();
    } else {
        $('#exceptionDF3').hide();
    }

    if (nomeDoLayout[4] == 'KWZ') {
        $('#exceptionKWZ').show();
    } else {
        $('#exceptionKWZ').hide();
    }

    $('#GpDates').show();

    if (nomeDoLayout[4] == 'RGV' || nomeDoLayout[4] == 'POP') {
        $('#infoBanco').show();
    } else {
        $('#infoBanco').hide();
    }

    if (nomeDoLayout[4] == 'RGV') {
        $('#exceptionRGV').show();
    } else {
        $('#exceptionRGV').hide();
    }

    if (nomeDoLayout[4] == 'POP') {
        $('#exceptionPOP').show();
    } else {
        $('#exceptionPOP').hide();
    }

    if (nomeDoLayout[4] == 'RWM') {
        $('#exceptionRWM').show();
    } else {
        $('#exceptionRWM').hide();
    }
}

const error = findGetParameter("error");
const naoImp = findGetParameter("NaoImp");
const importStatus = findGetParameter("import");
var dateInput, optionalDateInput, yearInput, optionalYearInput, customLayDateInput, allCustomLayPDF, filter, session, base, isInternalBase, codEmp, layoutsDaBase
const hasLastImportBase = true

$(document).ready(function() {
    Loader.startLoading();
    $.ajax({
        type: 'POST',
        url: `https://portal.ssparisi.com.br/prime/app/ls/getDataConversor.php`,
        data: {},
        contentType: 'application/json',
        dataType: 'json',
        error: (err) => {
            console.log('err', err)
        },
        success: (data) => {
            Loader.stopLoading();
            allCustomLayPDF = data.allCustomPDF;
            session = data.session;
            base = session.user_base;
            isInternalBase = ["999999", "654321"].includes(base)
            codEmp = data.codEmp;
            layoutsDaBase = data.layouts;

            filter = base === "654321" ? "multi" : "all"
            $(document).ready(function() {
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
                        window.location = window.location.href.split("&")[0];
                    });
                    throw new Error("Limite insuficiente!");
                }

                $(`#button-${filter}`).addClass("active")
                if (isInternalBase) {
                    $("#companyFilter").show()
                }
                $(".filterOption").click(function() {
                    $(".filterOption").removeClass("active")
                    $(this).addClass("active")
                    filter = $(this).val()
                })

                //Exibe a opcao do arquivo
                if (codEmp !== "") {
                    $('#GpUpload').hide();
                }

                var year = new Date().getFullYear();
                document.getElementById('yearReg').value = year;

                $("#Empresa").on("change", function() {
                    verificaMostraUpload();
                });

                //Exibe o Botao
                $('#processa').hide();
                $('#GpData').hide();
                $('#GpAccount').hide();
                $('#GpAno').hide();
                $('#GpLanc').hide();
                $('#GpInitialValue').hide();
                $('#GpCtBankExp').hide();
                $('#lastImportDiv').hide();
                $('#TpExportacao').hide();
                $('#exceptionWXL').hide();
                $('#exceptionRGV').hide();
                $('#exceptionPOP').hide();
                $('#exceptionDF3').hide();
                $('#exceptionKWZ').hide();
                $('#GpDates').hide();
                $('#infoBanco').hide();

                $("#upload").on("change", function() {
                    verificaMostraBotao();
                });
                $("#uploadComp").on("change", function() {
                    verificaMostraBotao();
                });

                if (importStatus == "success" && session.Ls_IsExtComp == "ext") {
                    Swal.fire({
                        title: "Extrato importado com sucesso!",
                        text: `Você pode ver os lançamentos importados nessa mesma tela após selecionar a empresa e clicar em Conciliação > Ver Lançamentos.`,
                        icon: "success",
                        confirmButtonText: "Ok",
                        confirmButtonColor: '#487fe2',
                    }).then(() => {
                        window.location = window.location.href.split("&")[0];
                    });
                }
                if (importStatus == "success" && session.Ls_IsExtComp == "comp") {
                    Swal.fire({
                        title: "Comprovantes importados com sucesso!",
                        text: `Você pode ver os comprovantes importados nessa mesma tela após selecionar a empresa e clicar em Comprovantes > Ver Lançamentos.`,
                        icon: "success",
                        confirmButtonText: "Ok",
                        confirmButtonColor: '#487fe2',
                    }).then(() => {
                        window.location = window.location.href.split("&")[0];
                    });

                }
            });

            let phpEmpresas;
            if (isExtComp) {
                phpEmpresas = data.empresas.filter((elm) => elm.allowPayment == "1");
            } else {
                phpEmpresas = data.empresas.filter((elm) => elm.allowPayment != "1");
            }
            const empresas = phpEmpresas.map(empresa => ({ ...empresa,
                label: empresa['Empresa']
            }));
            const input = document.getElementById("empresa-autocomplete");
            const empresaInfo = document.getElementById('Empresa')
            let empresaSelecionada = {};
            let layoutSelecionado = {};
            if (codEmp !== "") {
                empresaSelecionada = Empresa.dadosToEmpresa(data.dadosEmp);
            } else {
                empresas.find(empresa => empresa.label === input.value) || {};
            }

            if (empresaSelecionada && empresaSelecionada.Cad_Emp) {
                input.value = empresaSelecionada['Empresa'];
                document.getElementById('upload').accept = empresaSelecionada.TpFile
                empresaInfo.value = Empresa.empresaToDados(empresaSelecionada)
                customLay = JSON.parse(empresaInfo.value[5])
                $('#GpUpload').show();
            } else $('#GpUpload').hide();
            autocomplete({
                input,
                showOnFocus: true,
                minLength: 0,
                emptyMsg: 'Empresa não encontrada',
                fetch: function(text, update) {
                    text = normalizeSearch(text);

                    const empresasFiltradas = empresas.filter(function(n) {
                        textCompare = n.label.toLowerCase()
                        textFilter = (!text || normalizeSearch(n.label)
                            .includes(text))

                        frequency = JSON.parse(n.Frequency)

                        if (!frequency) {
                            frequency = {
                                type: "",
                                Qtd: ""
                            }
                        }
                        switch (filter) {
                            case "multi":
                                frequencyFilter = frequency["type"] ==
                                    "Used" && Number(frequency["Qtd"]) >
                                    1
                                break
                            case "one":
                                frequencyFilter = frequency["type"] ==
                                    "Used" && Number(frequency[
                                        "Qtd"]) == 1
                                break
                            case "none":
                                frequencyFilter = frequency["type"] ==
                                    "NotUsed"
                                break
                            case "new":
                                frequencyFilter = frequency["type"] ==
                                    ""
                                break
                            default:
                                frequencyFilter = true
                                break
                        }
                        return frequencyFilter && textFilter
                    })
                    if (!empresaSelecionada || empresaSelecionada.label !==
                        text)
                        $('#GpUpload').hide()
                    update(empresasFiltradas);
                },
                onSelect: function(empresa) {
                    input.value = empresa.label;
                    empresaSelecionada = empresa;
                    if (!empresa.TpFile && $.isNumeric(empresa.SistImp)) {
                        empresa.TpFile = ".pdf";
                        empresaSelecionada.TpFile = ".pdf";
                    }
                    empresaInfo.value = Empresa.empresaToDados(empresa);
                    try {
                        customLay = JSON.parse((empresaInfo.value) ? .split("|")[5])
                    } catch {
                        customLay = null
                    }
                    customLayDateInput = customLay ? .date ? .type === "input";

                    if (empresa.SistImp === "ItZ_1") {
                        document.getElementById('upload').accept = ".xls, .xlsx";
                    } else {
                        document.getElementById('upload').accept = empresaSelecionada.TpFile;
                    }
                    if (empresa.SistImp === "PjU_1") {
                        $('#tableNFS').show();
                        $("#tableNFS_wrapper").show();
                    } else {
                        $('#tableNFS').hide();
                        $("#tableNFS_wrapper").hide();
                    }

                    if (document.cadastro.Empresa.value.length !== 0)
                        $('#GpUpload').show();
                    $('#lastImport').val(empresaSelecionada.allowLastImport);
                    $('#SistPrinc').val(empresaSelecionada.SistPrinc);
                    if (empresaSelecionada.allowLastImport == 1 &&
                        empresaSelecionada.LastImport != null &&
                        hasLastImportBase) {
                        lastImportDate = empresaSelecionada.LastImport
                            .replace("_saveLastON", "")
                            .replace("_saveLastDB", "")
                            .replace("_A")
                            .replace("_old")
                            .split("_").reverse()[1]
                        lastImportDate = lastImportDate.slice(0, 2) + '/' +
                            lastImportDate.slice(2, 4) + '/20' + lastImportDate
                            .slice(4)
                        lastImportDateMMDDYYYY = lastImportDate.split('/')[1] +
                            '/' + lastImportDate.split('/')[0] + '/' +
                            lastImportDate.split('/')[2]
                        daysSince = Date.now() - new Date(
                            lastImportDateMMDDYYYY).getTime()
                        daysSince = Math.floor(daysSince / (1000 * 3600 * 24))
                        if (daysSince == 0) {
                            daysText = "Hoje"
                        } else if (daysSince == 1) {
                            daysText = daysSince + " dia atrás"
                        } else {
                            daysText = daysSince + " dias atrás"
                        }
                        if (daysSince > 7) {
                            $('#lastImportDiv span').css("color", "red");
                            $('#lastImportButton').on("click", function() {
                                swal(
                                    "Importação com mais de 7 dias!!!",
                                    "Não é possível realizar essa ação pois a última importação dessa empresa foi realizada a mais de 7 dias.",
                                    "error"
                                )
                            });
                        } else {
                            $("#lastImportButton").prop("onclick", null).off(
                                "click");
                            $('#lastImportDiv span').css("color", "black");
                            $('#lastImportButton').on("click", function() {
                                ProcessaForm(true)
                            });
                        }
                        $('#lastImportDate').text(lastImportDate + " - " +
                            daysText)
                        $('#lastImportDiv').show();
                        $('#lastImportTable').val(empresaSelecionada
                            .LastImport);
                    } else {
                        $('#lastImportDiv').hide();
                    }

                    if (isExtComp) {
                        $("#layExt").val(empresaSelecionada.NFanImp);
                        $("#layCompSigla").val(empresaSelecionada.LastImport);
                        let layout = layoutsDaBase.filter((lay) => lay.SistImp == empresaSelecionada.LastImport)[0];
                        if (layout) {
                            $("#layComp").val(layout.NFanImp);
                            layoutSelecionado = layout;
                            document.getElementById('uploadComp').accept = layout.TpFile;
                            $("#compFileContainer").show();
                        }
                        $("#heading1").show();
                        $("#heading2").show();
                        $("#Btn2").click();
                    }
                }
            });
            if (isExtComp) {
                autocomplete({
                    input: document.getElementById("layComp"),
                    showOnFocus: true,
                    minLength: 0,
                    emptyMsg: 'Layout não encontrado',
                    fetch: function(text, update) {
                        text = normalizeSearch(text);

                        layoutsFiltrados = layoutsDaBase.map(layout => ({ ...layout,
                            label: layout['NFanImp']
                        }));

                        layoutsFiltrados = layoutsFiltrados.filter(function(n) {
                            textCompare = n.label.toLowerCase()
                            textFilter = (!text || normalizeSearch(n.label)
                                .includes(text))

                            return textFilter && n.isComprovante == "1"
                        })
                        update(layoutsFiltrados);
                    },
                    onSelect: function(layout) {
                        document.getElementById("layComp").value = layout.label;
                        layoutSelecionado = layout;
                        $("#layCompSigla").val(layoutSelecionado.SistImp)
                        $("#layComp").val(layoutSelecionado.NFanImp);
                        document.getElementById('uploadComp').accept = layoutSelecionado.TpFile;
                        if (document.getElementById('layComp').value.length !== 0) {
                            $("#compFileContainer").show();
                        }
                    }
                });
            }

            if (session.SistPrincLS == "LSNfs") {
                //Headers da tabela
                $("#tableNFS").children("thead").append(`<tr>
                    <th class="text-left">Município</th>
                    <th class="text-left">Estado</th>
                </tr>`);

                // Foreach na tabela
                availableMunicipalities.forEach(mun => {
                    $("#tableNFS").children("tbody").append(`
                        <tr>
                            <td class="text-left">${mun.municipality}</td>
                            <td class="text-left">${getStateName(mun.state)}</td>
                        </tr>`);
                });

                console.log('jQuery versão:', $.fn.jquery);
                console.log('DataTables versão:', $.fn.dataTable.version);
                console.log('Tabela encontrada:', $('#tableNFS').length);
                // Transforma a tabela em dataTable
                table = $('#tableNFS').DataTable({

                    "initComplete": function(settings, json) {
                        $('#tableNFS_wrapper').css('display', 'none');
                        $('#tableNFS_wrapper').css('margin', 'auto');
                        $('#tableNFS_wrapper').addClass('card');
                        $('#tableNFS_wrapper').prepend(`
                            <h3 class="text-center mt-2 text-3xl"><b>Municípios disponíveis para este layout</b></h3>
                        `);

                    },
                    // Número da coluna que será ordenada por padrão
                    "order": [
                        [0, "asc"]
                    ],

                    // Textos da tabela
                    "language": {
                        "lengthMenu": "_MENU_ por página",
                        "zeroRecords": "Município indisponível para o layout.",
                        "info": "Mostrando página _PAGE_ de _PAGES_",
                        "infoEmpty": "Nenhum município encontrado",
                        "infoFiltered": "(filtrados _FILTERED_ de _MAX_ municípios)",
                        "paginate": {
                            "first": "Início",
                            "previous": "Anterior",
                            "next": "Próxima",
                            "last": "Fim"
                        }
                    },
                    "pagingType": "full_numbers",
                    "pageLength": 5,
                    "lengthChange": false
                });

                // Edita o input de pesquisa
                let divBusca = $("div.dataTables_filter").children("label");
                divBusca.children("input").attr("placeholder", "Pesquisar...");
                divBusca.html($(divBusca).html().replace("Search:", ""));
                $(divBusca.children("input")).keyup(function() {
                    table.search(this.value).draw();
                    filtered = ($("#tableNFS_info").html().replace("_FILTERED_", table.rows({
                        search: 'applied'
                    }).count()))
                    $("#tableNFS_info").html(filtered)
                });
                $("#tableNFS_wrapper").hide();

            }
        }
    });
});