function Empresa() {

}
/**
 * Função para transformar os dados da empresa selecionada
 * no padrão aglutinado por | (pipe)
 */
Empresa.empresaToDados = function(empresa) {
    console.log('Empresa.empresaToDados', empresa)
    if (!empresa || !Object.keys(empresa).length) return ''
    const infos = [empresa['Cad_Emp'], empresa['Empresa'], empresa['TpFile'], empresa['SistImp'], empresa['SistExp'], empresa["customLay"]]
    return infos.filter(i => !!i).join('|')
}
Empresa.dadosToEmpresa = function(dados) {
    console.log('dados', dados)
    if (!dados || typeof dados !== 'string') return null
    const [Cad_Emp, Empresa, TpFile, SistImp, SistExp] = dados.split('|')
    return {
        Cad_Emp,
        Empresa,
        TpFile,
        SistImp,
        SistExp
    }
}

function changeSaveLastImport(save) {
    const allowLastImport = save === '1' || save === true;
    $("#allowLastImport").val(save);
    if (allowLastImport) {
        $('button[save="save"]').addClass('active');
        $('button[save="dontSave"]').removeClass('active');
        $("#lastImportFlip").prop("checked", true);
    } else {
        $('button[save="dontSave"]').addClass('active');
        $('button[save="save"]').removeClass('active');
        $("#lastImportFlip").prop("checked", false);

    }
}

function changePayment(active) {
    const payment = active === '1' || active === true;
    $("#allowPayment").val(active);
    if (payment) {
        $("#paymentFlip").prop("checked", true);
        $("#rowBO-lastImport").removeClass("d-flex", "slow");
        $("#rowBO-lastImport").addClass("d-none", "slow");
        changeSaveLastImport("0");
        changeBankExt(false, false);
        $("#labelSImp").text("Layout Importação (Extrato)");
    } else {
        $("#paymentFlip").prop("checked", false);
        $("#rowBO-lastImport").removeClass("d-none", "slow");
        $("#rowBO-lastImport").addClass("d-flex", "slow");
        $("#labelSImp").text("Layout Importação");

    }
}

//Funcao Habilita Tipo de contabilização
function HabilitarTpCont() {
    if (document.cadastro.SImp.value == 'RfD_1') {
        document.getElementById("TpCont1").disabled = true;
        document.getElementById("TpCont1").checked = false;
        document.getElementById("TpCont2").disabled = false;
        document.getElementById("TpCont2").checked = true;
        document.getElementById("TpCont3").disabled = true;
        document.getElementById("TpCont3").checked = false;
        $("#CodExt").removeAttr('required');
        $("#DivCodExt").css("display", "none");
        $("#NomeCont").text('Débito/ Crédito');
        return false;
    } else {
        document.getElementById("TpCont1").disabled = false;
        document.getElementById("TpCont2").disabled = false;
        document.getElementById("TpCont1").checked = true;
        document.getElementById("TpCont3").checked = false;
        $("#NomeCont").text('Débito/ Crédito');
    }

};

//Funcao Habilita Cod Externo
function HabilitarCodExt() {
    if (document.cadastro.SImp.value === 'RfD_1') return
    const hasCodExt = validations.codExt.find(layout => layout === document.cadastro.SExp.value)
    $('#DivCodExt').css(
        'display', hasCodExt ? 'flex' : 'none'
    )
    if (hasCodExt) {
        if (document.cadastro.SExp.value === 'VLI') return
        $('#CodExt').attr('required', 'true')
        const codExt = validations.codExtName.find(({
            layouts
        }) => layouts.includes(document.cadastro.SExp.value))
        $("label[for='CodExt']").text(
            (codExt && codExt.name) ||
            'Cod Externo'
        )
        $('#CodExt').attr('placeholder', codExt && codExt.placeholder || '')
    } else
        $('#CodExt').removeAttr('required')

    // Débito / Crédito / HP
    $('#NomeCont2').text(EmpresaUtilsSigla.getExceptionByTpRelac(document.cadastro.SExp.value, 'D/C/HP'))
    // Débito / Crédito
    $('#NomeCont').text(EmpresaUtilsSigla.getExceptionByTpRelac(document.cadastro.SExp.value, 'D/C'))
    // Lançamento automático
    $('#NomeCont1').text(EmpresaUtilsSigla.getExceptionByTpRelac(document.cadastro.SExp.value, 'LA'))
    Object.entries(validations.fields)
        .forEach(([fieldName, properties], index) => {
            const field = $(`#${fieldName}`)
            field[0].disabled = !!properties.disabled.find(layout => layout === document.cadastro.SExp.value)
            field[0].checked = !!properties.checked.find(layout => layout === document.cadastro.SExp.value)
        })
    const hasAnyChecked =
        Object
        .entries(validations.fields)
        .some(([fieldName]) => !!$(`#${fieldName}`)[0].checked)
    if (!hasAnyChecked) {
        const [firstEnabled] = Object
            .entries(validations.fields)
            .find(([fieldName]) => !$(`#${fieldName}`)[0].disabled) || ''
        if (firstEnabled)
            $(`#${ firstEnabled }`)[0].checked = true
    }
};

function getDataForm(getLayouts = false) {
    const empresa = $('#Empresa').val();
    const tpCont = $('input[name=TpC]:checked').val();
    const codExt = $('#CodExt').val();
    const base = $('#Base').val();
    const id = $('#Cad_Emp').val();
    const layoutImp = $('#SImp').val();
    const layoutExp = $('#SExp').val();
    const allowLastImport = $('#allowLastImport').val();
    const emailFin = $('#nomeFinanceiro').val() + '|' + $('#emailFinanceiro').val();
    const agrup = $('#agrupFinanceiro').val();
    const keywords = $("#cadExcepKeywords").val();
    const planoConta = $("#PlanoConta").val();
    const namePlano = $("#autocompleter-plano-autocomplete").val();
    const customLay = $("#customLayJson").val();
    const allowPayment = $('#allowPayment').val();
    const cnpj = $('#cnpj').val();
    return {
        Empresa: empresa.trim(),
        TpCont: tpCont,
        Cod_Ext: codExt,
        Cad_Emp: id,
        Base: base,
        allowLastImport: allowLastImport,
        emailFinanceiro: emailFin,
        group: agrup,
        keywords: keywords,
        ...(getLayouts ? {
            Importar: layoutImp,
            Exportar: layoutExp,
        } : {}),
        customLay: customLay,
        planoConta: planoConta,
        namePlano: namePlano,
        allowPayment: allowPayment,
        cnpj: cnpj,
    };
}

function createEmpresa(data, baseInfo = null) {
    if (baseInfo) {
        var lay = data.Importar
        var base = baseInfo[0]
        var obj = {
            base: base,
            sigla: lay,
            type: "importacao"
        }
        $.ajax({
            type: 'POST',
            url: `${ BASE_URL }/rest/base/vincLayout.php`,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(obj),

        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown)
        })
    }
    email = data.emailFinanceiro ? .split("|") ? .pop()
    if (email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return toastBuilder({
            type: 'error',
            title: 'Email inválido!',
            message: 'Por favor, insira um email válido.',
        });
    }

    return $.ajax({
        type: 'POST',
        url: `${ BASE_URL }/rest/empresa/create.php`,
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json'
    })
}

function changeBankExt(value, isClick = true) {
    $("#autocompleter-sisimp-autocomplete").prop('disabled', value);
    if (isClick) {
        $("#autocompleter-sisimp-autocomplete").val(value ? "Banco On-Line" : "")
    }
    $("#saveLastImportDiv").css("display", value ? "none" : "block")
    $("#paymentDiv").css("display", value ? "none" : "block")
    changeSaveLastImport("0")
    if (value) {
        $("#SImp").val("bank")
        changePayment("0")
    }
}

function fillCustomLayFields(json) {
    const obj = JSON.parse(json);
    if (Object.values(obj).length == 0) {
        return;
    }
    const fields = [
        "date",
        "doc",
        "value",
        "debAcc",
        "credAcc",
        "cd"
    ];
    fields.forEach(function(field) {
        if (field == "value" && obj.debAndCredOption) {
            $("#valueLayValue").addClass("d-none");
            $("#debLayValue").removeClass("d-none");
            $("#credLayValue").removeClass("d-none");
            $("#debLayValue").val(obj.value.value.deb);
            $("#credLayValue").val(obj.value.value.cred);
        } else {
            const type = obj[field] ? .type;
            const value = obj[field] ? .value;
            $(`#${field}LayType`).val(type);
            $(`#${field}LayValue`).val(value);
            if (["input", "none"].includes(type)) {
                $(`#${field}LayValue`).prop("disabled", true);
            }
        }
    });
    $(".extraHist").remove();
    obj.hist.forEach(function(element, i) {
        if (i > 0) {
            addRowHist();
        }
        $('.histLayType').last().val(element ? .type)
        $('.histLayValue').last().val(element ? .value)

    });
    $(".extraExtraValues").remove();

    obj.extraValues.forEach(function(element, i) {
        if (i > 0) {
            addExtraValue();
        }
        $('.extraValueType').last().val(element ? .type)
        $('.extraValueName').last().val(element ? .name)
        $('.extraValueValue').last().val(element ? .value)
    });
    const checkboxes = [
        "ctBankOption",
        "importAllOption",
    ];

    if (obj["debAndCredOption"]) {
        $("#debAndCredOption").prop("checked", true).change();
    } else if (obj["separateColumn"]) {
        $("#separateColumn").prop("checked", true).change();
    } else {
        $("#positiveNegative").prop("checked", true);
    }

    checkboxes.forEach(function(checkbox) {
        $(`#${checkbox}`).prop("checked", obj[checkbox]);
    });

}

function toggleCustomLayButton(layout) {
    if (layout === "ItZ_1") {
        $("#customSettings").css("display", "block");
    } else {
        $("#customSettings").css("display", "none");
        $("#customLayJson").val("");
    }
}

function addRowHist() {
    const qtdHist = $('.trHist').length;
    return $('.trHist').last().after(`
        <tr class="d-flex align-items-center trHist extraHist" id="trHist-${qtdHist}">
            <td style="width: 20%"><label for="histLayType-${qtdHist}">Complemento Histórico</label></td>
            <td style="width: 40%">
                <select id="histLayType-${qtdHist}" name="histLayType" class="form-control custom-select histLayType height-35">
                    <option value="index">Posição da coluna</option>
                    <option value="header">Nome da coluna</option>
                    <option value="fixed">Texto fixo</option>
                </select>
            </td>
            <td style="width: 40%" class="d-flex">
                <input id="histLayValue-${qtdHist}" class="form-control histLayValue height-35" type="text" placeholder="Complemento Histórico">
                <button class="btn btn-info ml-1 addHist" onclick="addRowHist()" style="padding: 2px 8px"><i class="ti-plus"></i></button>
                <button class="btn btn-danger ml-1 removeHist" onclick="removeRowHist('${qtdHist}')" style="padding: 2px 8px"><i class="ti-trash"></i></button>
            </td>
        </tr>
    `);
}

function addExtraValue(isCustomLay = false) {
    const qtdHist = $('.trExtraValues').length;
    $('.trExtraValues').last().after(`
        <tr class="d-flex align-items-center trExtraValues extraExtraValues" id="trExtraValues-${qtdHist}">
            <td style="width: ${isCustomLay ? "50%" : "20%"}">
                <input id="extraValueName-${qtdHist}" class="form-control extraValueName height-35" type="text" placeholder="Informe o nome...">
            </td>
            ${isCustomLay ? "" : `<td style="width: 40%">
                <select id="extraValueType-${qtdHist}" name="extraValueType" class="form-control custom-select extraValueType height-35">
                    <option value="none">Não importar</option>
                    <option value="index">Posição da coluna</option>
                    <option value="header">Nome da coluna</option>
                </select>
            </td>`}
            <td style="width: ${isCustomLay ? "50%" : "40%"}" class="d-flex">
                ${
                    isCustomLay ?
                    `<select name="extraValue-${qtdHist}" id="extraValue-${qtdHist}" class="field-select form-control custom-select m-auto" style="width: 80%">
                        <option value="0">Escolher Coluna...</option>
                    </select>` :
                    `<input id="extraValueValue-${qtdHist}" class="form-control extraValueValue height-35" type="text" disabled>`
                }
                <button class="btn btn-info ml-1 addExtraValue" onclick="addExtraValue(${isCustomLay})" style="padding: 2px 8px"><i class="ti-plus"></i></button>
                <button class="btn btn-danger ml-1 removeExtraValue" onclick="removeExtraValue('${qtdHist}', ${isCustomLay})" style="padding: 2px 8px"><i class="ti-trash"></i></button>
            </td>
        </tr>
    `);
    addOnChangeToCustomLaySelect(`#extraValueType-${qtdHist}`);
}

function removeRowHist(id) {
    return $("#trHist-" + id).remove();
}

function removeExtraValue(id, isCustomLay = false) {
    if (isCustomLay) {
        const idSelect = $("#trExtraValues-" + id).children().last().children('.field-select').first().attr("id");
        $(`#${idSelect}Div`).remove();
    }
    return $("#trExtraValues-" + id).remove();
}

function validateCustomLayInput(type, value, id) {
    switch (type) {
        case "index":
            value = value.toUpperCase();
            value = value.trim();
            if (!/^[A-Z]{1,2}$/.test(value)) {
                console.log(type, value, id)
                $(id).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
                toastPrimary("Posição inválida!", "Insira uma coluna de Excel válida. Exemplos: A, B, AC, etc.", "error")
                return false;
            }
            break;
        case "fixed":
        case "header":
            value = value.trim();
            if (value === "") {
                $(id).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
                toastPrimary("Nome da coluna vazio!", "Por favor, preencha o nome da coluna.", "error")
                return false;

            }
    }
    return true;
}

function addOnChangeToCustomLaySelect(selector) {
    $(selector).off("change");
    $(selector).on("change", function() {
        const $this = $(this);
        const $input = $this.parent().siblings().last().children().first();
        console.log($this, $input)
        if (["input", "none"].includes($this.val())) {
            $input.val("");
            $input.prop("disabled", true);
        } else {
            $input.prop("disabled", false);
        }
    })

}

$(document).ready(function() {

    $("#autocompleter-plano-autocomplete").removeAttr('required');

    addOnChangeToCustomLaySelect("#modal-customLay select");

    $("#debAndCredOption, #positiveNegative, #separateColumn").on("change", function() {
        if ($("#debAndCredOption").is(":checked")) {
            $("#valueLayValue").addClass("d-none");
            $("#debLayValue").removeClass("d-none");
            $("#credLayValue").removeClass("d-none");
        } else {
            $("#valueLayValue").removeClass("d-none");
            $("#debLayValue").addClass("d-none");
            $("#credLayValue").addClass("d-none");
        }
        if ($("#separateColumn").is(":checked")) {
            $("#cdTr").addClass("d-flex");
            $("#cdLayType").val("index").change()
            $("#cdTr").removeClass("d-none");
        } else {
            $("#cdTr").addClass("d-none");
            $("#cdTr").removeClass("d-flex");
        }
    });

    $("#ctBankOption").on("change", function() {
        const isChecked = $(this).is(":checked");
        if (isChecked) {
            $("#cdOptions").show(0);
        } else {
            $("#cdOptions").hide(0);
            $("#positiveNegative").prop("checked", true).change();
            $("#debAndCredOption").prop("checked", false).change();
            $("#separateColumn").prop("checked", false).change();
        }
    });

    $("#btnConfirmCustomLay").on("click", function() {
        const fields = [
            "date",
            "doc",
            "value",
            "debAcc",
            "credAcc",
        ];
        const checkboxes = [
            "debAndCredOption",
            "ctBankOption",
            "importAllOption",
            "separateColumn"
        ];

        let configs = {
            "hist": []
        };
        let hasError = false;
        let isDebCred = $("#debAndCredOption").is(":checked");
        let isSeparateColumn = $("#separateColumn").is(":checked");
        if (isSeparateColumn) {
            fields.push("cd")
        }
        fields.forEach(function(field) {
            const type = $(`#${field}LayType`).val();
            let value = $(`#${field}LayValue`).val();
            if (field === "value" && isDebCred) {
                value = {
                    "deb": $("#debLayValue").val(),
                    "cred": $("#credLayValue").val()
                };
            }
            if (field === "value" && isDebCred) {
                if (!validateCustomLayInput(type, value["deb"], "#debLayValue") || !validateCustomLayInput(type, value["cred"], "#credLayValue")) {
                    hasError = true;
                    return;
                }
            } else if (!validateCustomLayInput(type, value, `#${field}LayValue`)) {
                hasError = true;
                return;
            }
            configs = {
                ...configs,
                [field]: {
                    "type": type,
                    "value": value
                }
            }
        });
        $(".trHist").each(function() {
            const id = $(this).attr("id").replace("trHist-", "");
            if (!validateCustomLayInput($(`#histLayType-${id}`).val(), $(`#histLayValue-${id}`).val(), `#histLayValue-${id}`)) {
                hasError = true;
                return;
            }
            configs.hist.push({
                "type": $(`#histLayType-${id}`).val(),
                "value": $(`#histLayValue-${id}`).val()
            });
        });
        checkboxes.forEach(function(checkbox) {
            configs = {
                ...configs,
                [checkbox]: $(`#${checkbox}`).is(":checked")
            };
        });
        if (hasError) {
            return
        };
        const extraValues = [];
        $(".trExtraValues").each((i) => {
            let $this = $(".trExtraValues").eq(i);
            extraValues.push({
                "name": $this.children().eq(0).children().first().val(),
                "type": $this.children().eq(1).children().first().val(),
                "value": $this.children().eq(2).children().first().val()
            });
        });
        configs = {
            ...configs,
            extraValues
        };
        $("#customLayJson").val(JSON.stringify(configs));
        $("#modal-customLay").modal("toggle");
    });
});