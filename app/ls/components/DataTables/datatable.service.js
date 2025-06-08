function Datatable(id, columns, options = {}) {
    this.dataTable = null
    this.id = id
    this.columns = columns
    this.options = options
    $.fn.dataTable.moment('DD/MM/YYYY');
}
Datatable.prototype.refreshData = function(data) {
    if (!$(`#${this.id}`)) return

    const defaultOptions = {
        pageLength: 50,
        data,
        columns: this.columns,
        searchDelay: 350,
        "pagingType": "numbers",
        "sDom": '<"#dataTableHeader.flex flex-row w-full justify-between"lfp><t>ip',
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Pesquisar...",
            "emptyTable": "Nenhum registro encontrado",
            "info": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "infoEmpty": "Mostrando 0 até 0 de 0 registros",
            "infoFiltered": "(Filtrados de _MAX_ registros)",
            "infoThousands": ".",
            "lengthMenu": "_MENU_ por página",
            "loadingRecords": "Carregando...",
            "processing": "Processando...",
            "zeroRecords": "Nenhum registro encontrado",
            "aria": {
                "sortAscending": ": Ordenar colunas de forma ascendente",
                "sortDescending": ": Ordenar colunas de forma descendente"
            },
            "select": {
                "rows": {
                    "_": "Selecionado %d linhas",
                    "0": "Nenhuma linha selecionada",
                    "1": "Selecionado 1 linha"
                }
            },
            "buttons": {
                "copy": "Copiar para a área de transferência",
                "copyTitle": "Cópia bem sucedida",
                "copySuccess": {
                    "1": "Uma linha copiada com sucesso",
                    "_": "%d linhas copiadas com sucesso"
                }
            }
        }
    }
    const options = Object.assign({}, defaultOptions, this.options)

    if (!this.dataTable && $.fn.dataTable.isDataTable(`#${ this.id }`))
        this.dataTable = $(`#${ this.id }`).DataTable(options)
    if (this.dataTable)
        this.dataTable.destroy()

    this.dataTable = $(`#${ this.id }`).DataTable(options)
    this.columns.forEach((column, index) => {
        if (column.css)
            $(`#${this.id} thead`).find(`th:eq(${index})`).css(column.css)
    })
}
//a