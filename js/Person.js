// JavaScript Document
function AccordionIcon(Id) {

    var icone = '#Icon' + Id
    var idCol = '#collapse' + Id

    $(idCol).on('show.bs.collapse', function() {
        $(icone).addClass('ti-minus', 1000);
        $(icone).removeClass('ti-plus', 1000);
    })

    $(idCol).on('hidden.bs.collapse', function() {
        $(icone).removeClass('ti-minus', 1000);
        $(icone).addClass('ti-plus', 1000);
    })

}

function RetornaDataAtual() {
    var dNow = new Date();
    var localdate = dNow.getDate() + '/' + ("0" + (dNow.getMonth() + 1)).slice(-2) + '/' + dNow.getFullYear();
    return localdate;
}