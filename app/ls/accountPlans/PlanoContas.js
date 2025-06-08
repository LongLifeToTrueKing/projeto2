var typingTimerPlan;
var doneTypingIntervalPlan = 500; // tempo que leva até pesquisar (0,5 seg)
var session;
var plans;
var allAccounts;
var visibleAccounts;
var layouts;
var hasChanges = false;
var pagePlan = 1;
var maxPlanPage;

$(document).ready(function() {
    createOnHideModal();
});

function setUpTableLoadingDiv() {
    const overlay = document.getElementById("tbodyOverlay");

    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.top = "0";
    overlay.style.left = "0";
}

function createOnHideModal() {
    $('.modal, #closeModalEditX, #closeModalEdit').on('click', function(e) {
        const modal = $("#ModalInfoPlan");
        if (!$(this).hasClass("modal") || e.target === e.currentTarget) {
            if (hasChanges) {
                // Check if the modal is clicked, not an element inside the modal:
                Swal.fire({
                    title: 'Existem alterações não salvas do seu plano de contas!',
                    text: 'Deseja descartar as alterações?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#f57567',
                    confirmButtonText: 'Sim, descartar alterações.',
                    cancelButtonText: 'Não, continuar editando.'
                }).then((result) => {
                    if (result.isConfirmed) {
                        hasChanges = false;
                        modal.modal('hide');
                    }
                });
            } else {
                modal.modal('hide');
            }
        }
    });
}

function updateMaxPlanPage() {
    maxPlanPage = Math.ceil(visibleAccounts.length / 10);
}

function rebuildAccountTable() {
    showAccountPlan(null, null, null, null, true);
}

function findElementAndSplice(newObj, array) {
    array.forEach((obj, i) => {
        if (obj.id == newObj.id) {
            array.splice(i, 1, newObj);
            return array;
        }
    });
    return array;
}

function flashError(id) {
    $(id).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function findPlanName(codPlan) {
    let planName = "";
    plans.forEach(plan => {
        if (plan.id == codPlan) {
            planName = plan.name
            return
        }
    });
    return planName;
}

function findLayName(sigla) {
    let layName = "";
    layouts.forEach(lay => {
        if (lay.SistImp == sigla) {
            layName = lay.NFanImp
            return
        }
    });
    return layName;
}

function EscreveArq() {
    var nomeDoArquivo = $("#upload").val().split("\\").pop();
    $("#NomeArq").text(nomeDoArquivo);
};

function setAccountEvents() {
    $(".deleteAccount").off("click");
    $(".chooseDeb").off("click");
    $(".chooseCred").off("click");
    $('.tableInput').off("change");
    $("#addNewRow").off("click");

    $("#search-input").off("keyup");
    $(".deleteAccount").on("click", function() {
        $row = $(this).parent().parent();
        Swal.fire({
            title: 'Excluir conta?',
            text: `Essa conta será excluída do plano de contas. Tem certeza?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f57567',
            confirmButtonText: 'Sim, excluir.',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.isConfirmed) {
                $row.css("background-color", "#fdb1b1");
                window.libs.toastPrimary("Conta excluída!", "", "success");
                hasChanges = true;
                let id = $row.attr('id').replace("row-", "");
                index = null;
                allAccounts.forEach((acc, i) => {
                    if (acc.id == id) {
                        index = i;
                        return;
                    }
                });
                if (index > 0) {
                    allAccounts.splice(index, 1)
                }
                setTimeout(() => {
                    $row.hide('slow');
                    setTimeout(() => {
                        $row.remove();
                    }, 600);
                }, 200);

            }
        });
    });
    $(".chooseDeb").on("click", function() {
        let accNr = $(this).parent().siblings().first().children().first().val();
        let cod = currentInputAccountPlan;
        $('input[codtemp="' + cod + '"][name="CtDeb"]').val(accNr);
        // $("#ModalInfoPlan").modal("hide");

        // marca como temporário
        $("#buttons-wrapper-" + cod).addClass("tempRecord");
    });
    $(".chooseCred").on("click", function() {
        let accNr = $(this).parent().siblings().first().children().first().val();
        let cod = currentInputAccountPlan;
        $('input[codtemp="' + cod + '"][name="CtCre"]').val(accNr);
        // $("#ModalInfoPlan").modal("hide");

        // marca como temporário
        $("#buttons-wrapper-" + cod).addClass("tempRecord");
    });
    $('.tableInput').on("change", function() {
        hasChanges = true;
        if (!window.location.href.includes("Result")) {

            // O input que ativou o evento
            var $input = $(this);
            var $td = $input.closest('td');
            var $tr = $td.closest('tr');

            // Todos os inputs dentro do <tr> (primos)
            var $inputs = $tr.find('input');

            // Valores dos inputs
            var values = $inputs.map(function() {
                return $(this).val();
            }).get();

            var id = $tr.attr('id').replace("row-", "");
            var acc = values[0];
            var classification = values[1];
            var name = values[2];

            allAccounts = findElementAndSplice({
                id,
                number: acc,
                class: classification,
                name
            }, allAccounts);
            console.log(allAccounts)
            visibleAccounts = findElementAndSplice({
                id,
                number: acc,
                class: classification,
                name
            }, visibleAccounts);
        }

    });
    $("#addNewRow").on("click", function() {
        const newAccount = {
            id: Number(allAccounts[allAccounts.length - 1] ? .id) + 1,
            name: "",
            account: "",
            class: ""
        };
        visibleAccounts.push(newAccount);
        allAccounts.push(newAccount);

        updateMaxPlanPage();
        pagePlan = maxPlanPage;
        updatePlanButtons();
        rebuildAccountTable();
        setAccountEvents();
    });
    $("#search-input").on("keyup", function() {
        // Lista de teclas que não devem ativar a pesquisa
        var ignoreKeys = ["Control", "Shift", "Alt", "Meta", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

        // Verifica se a tecla pressionada está na lista de teclas a serem ignoradas
        if (ignoreKeys.includes(event.key)) {
            return; // Sai da função se for uma tecla a ser ignorada
        }

        clearTimeout(typingTimerPlan);
        $("#tbodyOverlay").show();
        typingTimerPlan = setTimeout(searchAccount, doneTypingIntervalPlan);
    });

}

function createAccountRow(account = null, hidden = false) {
    const row = document.createElement('tr');
    if (account) {
        row.setAttribute("id", "row-" + account ? .id);
    } else {
        row.setAttribute("id", "row-" + allAccounts[allAccounts.length - 1] ? .id + 1);
    }

    row.classList.add('rowAccountPlan');
    if (hidden) row.classList.add('d-none');

    row.innerHTML = `
        <td><input class="form-control tableInput" value="${account?.number || ""}"></td>
        <td><input class="form-control tableInput" value="${account?.class || ""}"></td>
        <td><input class="form-control tableInput" value="${account?.name || ""}"></td>
        ${window.location.href.includes("Result") ? `
            <td>
                <button class="btn btn-info chooseDeb">Débito</button>
                <button class="btn btn-info chooseCred">Crédito</button>
            </td>` : `
            <td>
                <button class="btn btn-outline-danger acc-list-btn deleteAccount"><i class="ti-trash"></i></button>
            </td>
        `}
    `;
    return row;
}

function compareClass(a, b) {
    console.log(a, b)
    const arrA = (a || "0") ? .split(/[\-.]/);
    const arrB = (b || "0") ? .split(/[\-.]/);
    for (let i = 0; i < 10; i++) {
        const a2 = Number(arrA[i]);
        const b2 = Number(arrB[i]);
        if (!a2 && a2 > 0) return 1;
        if (!b2 && b2 > 0) return -1;
        if (a2 > b2) return 1;
        if (a2 < b2) return -1;
    }
    return 0;
}

function showAccountPlan(id = null, name = null, layout = null, data = null, skipModalOpening = false, skipTableBuilding = false) {
    if (!skipModalOpening) {
        // Inicializa o modal
        Loader.startLoading();
        $("#ModalInfoPlan").modal("toggle");
        pagePlan = 1; // reseta paginação
    }

    setTimeout(() => {
        // Inicializa um fragmento 
        const fragment = document.createDocumentFragment();
        if (!skipTableBuilding) {

            // Coloca informações no modal, caso sejam fornecidas. Caso contrário mantém como está
            if (id) $("#id-plan").val(id);
            if (layout) $("#lay-plan").val(layout);
            if (name) $("#title-show-plan").text(name);

            if (!skipModalOpening) {
                // Reseta barra de pesquisa
                $("#search-input").val("");
            }

            if (data) {
                // Se os dados forem fornecidos na chamada da função, pega eles
                data = JSON.parse(data);
                data = data.sort((a, b) => {
                    return compareClass(a.class, b.class);
                });

                // Verifica se algum objeto não tem a propriedade 'id'
                let hasMissingId = data.some(obj => !obj.hasOwnProperty('id'));

                if (hasMissingId) {
                    let idCounter = 1; // Inicia o contador de IDs
                    data.forEach(obj => {
                        obj.id = idCounter++;
                    });
                }
                allAccounts = data;
                visibleAccounts = [...data];

            } else {
                // Caso contrário, pega da variável global (atualizada em uma chamada anterior dessa mesma função)
                data = allAccounts;
            }

            // Coloca no fragmento os 10 registros com base na página atual
            let output = visibleAccounts.slice((pagePlan - 1) * 10, pagePlan * 10);
            output.forEach(account => {
                let row = createAccountRow(account);
                fragment.appendChild(row);
            });

            // Atualiza paginação
            updateMaxPlanPage();
            updatePlanButtons();
        }
        setTimeout(() => {
            if (!skipTableBuilding) {
                // Esvazia a tabela de contas e a preenche novamente com o fragmento
                $("#plansTbody").empty();
                document.getElementById('plansTbody').appendChild(fragment);
            }
            $("#tbodyOverlay").hide();
            setUpTableLoadingDiv();
            setAccountEvents();
            Loader.stopLoading();
        }, 50);
    }, 50);
}

function appendPlan(plan, show = true) {
    let randomColor = (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
    const id = `plan-${plan.id}`;
    // Troca tab por espaço
    plan.data = plan.data.replace(/\t/g, " ")
    // Escapa as aspas
    plan.data = plan.data.replace(/(?<=(?:class|name|number|id)":").*?(?="[,}])/g, (match) => {
        return match.replace(/"/g, '\\"');
    });
    $("#plansWrapper").last().append(`
        <div id="${id}" class="card m-2 plan-card" style="border-top: 5px solid #${randomColor}; opacity:0">
            <span class="plan-name">${plan.name}</span>
            <span class="lay-name">${findLayName(plan.layout)}</span>
            <span class="acc-qtd" id="acc-qtd-${id}">${JSON.parse(plan.data).length}</span>
            <span class="acc-desc">CONTAS</span>
        </div>
    `)
    $(`#${id}`).on("click", function() {
        showAccountPlan(plan.id, plan.name, plan.layout, plan.data)
    });
    if (show) {
        $(`#${id}`).fadeTo(500, 1);
    }
}

function updatePlano(id, name, lay, arr = allAccounts) {
    const sql = `UPDATE \`AccountPlans\` SET 
        \`data\`='${JSON.stringify(arr)}' WHERE \`id\` = '${id}'`;
    $.ajax({
        type: 'POST',
        url: `https://portal.ssparisi.com.br/prime/app/rest/geral/geral.php`,
        data: JSON.stringify({
            "sql": sql,
            "banco": "D",
            "action": "update"
        }),
        contentType: 'application/json',
        dataType: 'json',
        success: (resp) => {
            $(`#plan-${id}`).off("click");
            $(`#plan-${id}`).on("click", function() {
                showAccountPlan(id, name, lay, JSON.stringify(arr));
            });
            hasChanges = false;
            $('#ModalInfoPlan').modal('toggle');
            $(`#acc-qtd-plan-${id}`).text(arr.length);
            return window.libs.toastPrimary("Sucesso!", "Plano de contas atualizado com sucesso.", "success");
        }
    });
}

function searchAccount() {
    let text = $("#search-input").val()
    visibleAccounts = allAccounts.filter((account) => {
        let accountText = `${account.number} ${account.class} ${account.name}`;
        return formatSearchTextPlan(accountText).includes(formatSearchTextPlan(text))
    })
    pagePlan = 1;
    updateMaxPlanPage();
    rebuildAccountTable();
}

function formatSearchTextPlan(text) {
    text = text.toUpperCase()
    text = text.normalize("NFD").replace(/\p{Diacritic}/gu, "")
    text = text.replace(/-/g, "")
    text = text.replace(/\s+/g, " ")
    text = text.trim()
    return text
}


function updatePlanButtons() {
    // Atualiza o display dos botões de paginação
    pagePlan > 4 ? $(".plan-page-start").show() : $(".plan-page-start").hide();
    pagePlan > 4 ? $(".plan-more-prev").show() : $(".plan-more-prev").hide();
    pagePlan > 3 ? $(".plan-page-prev3").show() : $(".plan-page-prev3").hide();
    pagePlan > 2 ? $(".plan-page-prev2").show() : $(".plan-page-prev2").hide();
    pagePlan > 1 ? $(".plan-page-prev1").show() : $(".plan-page-prev1").hide();
    maxPlanPage - pagePlan >= 1 ? $(".plan-page-next1").show() : $(".plan-page-next1").hide();
    maxPlanPage - pagePlan >= 2 ? $(".plan-page-next2").show() : $(".plan-page-next2").hide();
    maxPlanPage - pagePlan >= 3 ? $(".plan-page-next3").show() : $(".plan-page-next3").hide();
    maxPlanPage - pagePlan >= 4 ? $(".plan-more-next").show() : $(".plan-more-next").hide();
    maxPlanPage - pagePlan >= 4 ? $(".plan-page-end").show() : $(".plan-page-end").hide();

    // Atualiza o onclick dos botões de paginação
    $(".plan-paginate_button").prop("onclick", null).off("click");
    $(".plan-page-start").on("click", () => {
        pagePlan = 1;
        rebuildAccountTable()
    });
    $(".plan-page-prev3").on("click", () => {
        pagePlan -= 3;
        rebuildAccountTable()
    });
    $(".plan-page-prev2").on("click", () => {
        pagePlan -= 2;
        rebuildAccountTable()
    });
    $(".plan-page-prev1").on("click", () => {
        pagePlan--;
        rebuildAccountTable()
    });
    $(".plan-page-next1").on("click", () => {
        pagePlan++;
        rebuildAccountTable()
    });
    $(".plan-page-next2").on("click", () => {
        pagePlan += 2;
        rebuildAccountTable()
    });
    $(".plan-page-next3").on("click", () => {
        pagePlan += 3;
        rebuildAccountTable()
    });
    $(".plan-page-end").on("click", () => {
        pagePlan = maxPlanPage;
        rebuildAccountTable()
    });

    // Atualiza o texto dos botões de paginação
    $(".plan-page-start").text("1");
    $(".plan-page-prev3").text(pagePlan - 3);
    $(".plan-page-prev2").text(pagePlan - 2);
    $(".plan-page-prev1").text(pagePlan - 1);
    $(".plan-current").text(pagePlan);
    $(".plan-page-next1").text(pagePlan + 1);
    $(".plan-page-next2").text(pagePlan + 2);
    $(".plan-page-next3").text(pagePlan + 3);
    $(".plan-page-end").text(maxPlanPage);
}