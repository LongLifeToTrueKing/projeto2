/* -- Sucesso -- */
function SweetAlertaSucesso(LinkRedirect, MensagemAlerta) {
    swal({
            title: "Sucesso!!!",
            text: MensagemAlerta,
            type: "success",
            confirmButtonText: "OK",
            closeOnConfirm: false,
            timer: 3000,
            showLoaderOnConfirm: true,
            confirmButtonColor: "28a745"
        },
        function() {
            setTimeout(function() {
                window.location = LinkRedirect
            }, 500);
        });
};
/* -- Error -- */
function SweetAlertaErro(LinkRedirect, MensagemAlerta, $title = "Oops...") {
    swal({
            title: $title,
            text: MensagemAlerta,
            type: "error",
            confirmButtonText: "OK",
            closeOnConfirm: false
        },
        function() {
            if (LinkRedirect !== '#') {
                window.location = LinkRedirect
            }
        });
};

function SweetAlertaErroPAtual(MensagemAlerta) {
    swal({
        title: "Oops...",
        text: MensagemAlerta,
        type: "error",
        confirmButtonText: "OK",
        closeOnConfirm: false
    });
};
/* -- Confirmacao -- */
function SweetAlertaConfirmacao(SubForm, MensagemAlerta) {
    swal({
            title: "Deseja Excluir??",
            text: MensagemAlerta,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, Excluir !",
            cancelButtonText: "Cancelar !",
            closeOnConfirm: false
        },
        function() {
            document.getElementById(SubForm).submit();
        });
};

function SweetAlertaConfirmacao2(MensagemAlerta) {
    swal({
            title: "Tem certeza?",
            text: MensagemAlerta,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#28a745",
            confirmButtonText: "Sim, Confirmo !!",
            cancelButtonText: "Não Confirmo !!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function(isConfirm) {
            if (isConfirm) {
                swal("Confirmado !!", "Ação Executada !!", "success");
            } else {
                swal("Cancelado !!", "Ação NÃO Executada !!", "error");
            }
        });
};

function SweetAlertaAtencao(LinkRedirect, MensagemAlerta) {
    swal({
            title: "Atenção !!",
            text: MensagemAlerta,
            type: "info",
            showCancelButton: false,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        },
        function() {
            setTimeout(function() {
                window.location = LinkRedirect;
            }, 2000);
        });
};
/* ======= INDIVIDUAIS ======= */

/* -- Confirmacao -- */
function SweetAlertaConfirmacaoP1($link) {
    swal({
            title: "Usuario já cadastrado !!",
            text: "Deseja Vincular os Modulos deste Sistema ??",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, Vincular !",
            cancelButtonText: "Cancelar !",
            closeOnConfirm: false
        },
        function() {
            window.location = $link;
        });
};

function SweetAlertaConfirmacaoP2($link) {
    swal({
            title: "Deseja Ecerrar o Período ?? ",
            text: "Após a Impressão não será mais possivél lançar neste período!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, Imprimir e Encerrar !!",
            cancelButtonText: "Cancelar !!",
            closeOnConfirm: false
        },
        function() {
            window.open($link, '_blank');
        });
};

function SweetAlertaConfirmacaoCtBank(SubForm) {
    swal({
            title: "Aplicar a Conta do Banco para todos Lançamentos?",
            text: "Ao Confirmar o sistema vai aplicar a conta para a Conta de Crédito quando o lançamento contiver um (D) e para a Conta de Débito quando contiver um (C)",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#487fe2",
            confirmButtonText: "Sim, Aplicar !!",
            cancelButtonText: "Cancelar !!",
            closeOnConfirm: false
        },
        function() {
            document.getElementById(SubForm).submit();
        });
};

function SweetAlertaConfirmacaoP3($mensagem) {
    swal({
        title: "Ops..",
        text: $mensagem,
        type: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
        closeOnConfirm: true
    });
};

/* -- Info -- */
function SweetAlertaLayoutCadastrado($mensagem) {
    swal({
        title: "Layout já cadastrado!",
        text: $mensagem,
        type: "info",
        showCancelButton: false,
        confirmButtonText: "OK",
        closeOnConfirm: true
    });
};
/* -- Erro -- */

function SweetAlertaErroLimit(MensagemAlerta) {
    swal({
            title: "Arquivo Não Exportado!",
            text: MensagemAlerta,
            type: "error",
            confirmButtonText: "OK",
            closeOnConfirm: false
        },
        function() {
            window.location = "https://portal.ssparisi.com.br/prime/app/ls/Conversor.php"
        });
};

/** callback */

function sweetAlertaCB(options, callback) {
    return swal({
        closeOnConfirm: true,
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim!",
        cancelButtonText: "Cancelar.",
        ...options
    }, callback)
}

function sweetAlertaDelete(text, callback) {
    const options = {
        text,
        title: "Deseja excluir??",
        type: "warning"
    }
    return sweetAlertaCB(options, callback)
}