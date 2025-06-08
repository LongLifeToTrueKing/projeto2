<!DOCTYPE html>
						<html lang="pt-br">

							<head>
								<meta charset="utf-8">
								<meta http-equiv="X-UA-Compatible" content="IE=edge">
								<meta name="viewport" content="width=device-width, initial-scale=1">

								<!-- ================= Favicon ================== -->
								<link rel="shortcut icon" href="https://portal.ssparisi.com.br/prime/assets/images/small_ssparisi.png">
								<link rel="apple-touch-icon" sizes="144x144" href="https://placehold.it/144.png/000/fff">
								<link rel="apple-touch-icon" sizes="114x114" href="https://placehold.it/114.png/000/fff">
								<link rel="apple-touch-icon" sizes="72x72" href="https://placehold.it/72.png/000/fff">
								<link rel="apple-touch-icon" sizes="57x57" href="https://placehold.it/57.png/000/fff">

								<!-- Styles -->
								<link href="https://portal.ssparisi.com.br/prime/assets/css/lib/weather-icons.css" rel="stylesheet" />
								<link href="https://portal.ssparisi.com.br/prime/assets/css/lib/owl.carousel.min.css" rel="stylesheet" />
								<link href="https://portal.ssparisi.com.br/prime/assets/css/lib/owl.theme.default.min.css" rel="stylesheet" />
								<link href="https://portal.ssparisi.com.br/prime/assets/css/lib/font-awesome.min.css" rel="stylesheet">
								<link href="https://portal.ssparisi.com.br/prime/assets/css/lib/themify-icons.css" rel="stylesheet">
								<link href="https://portal.ssparisi.com.br/prime/assets/css/lib/menubar/sidebar.css" rel="stylesheet">
								<link href="https://portal.ssparisi.com.br/prime/assets/css/lib/bootstrap.min.css" rel="stylesheet">
								<link href="https://portal.ssparisi.com.br/prime/assets/css/lib/helper.css" rel="stylesheet">
								<link href="https://portal.ssparisi.com.br/prime/assets/css/style.css" rel="stylesheet">
								<link href="https://portal.ssparisi.com.br/prime/assets/css/lib/sweetalert/sweetalert.css" rel="stylesheet">
								<link href="https://portal.ssparisi.com.br/prime/assets/css/lib/toastr/toastr.min.css" rel="stylesheet">

								<!-- Style Geral -->
								<link rel="stylesheet" type="text/css" href="https://portal.ssparisi.com.br/prime/css/layout-geral.css?version=v.0.0.1M" />
								<link rel="stylesheet" type="text/css" href="https://portal.ssparisi.com.br/prime/css/magic-check.css" />

								<!-- Script Geral -->

								<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js" type="text/javascript"></script>
								<script src="https://portal.ssparisi.com.br/prime/js/Person.js" type="text/javascript"></script>

								<!-- Fontes -->
								<link href="https://fonts.googleapis.com/css?family=Play" rel="stylesheet">
								<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

								<script>
									document.addEventListener("DOMContentLoaded", function(){
										window.BASE_URL = "https://portal.ssparisi.com.br/prime/app";
									})
                           window.utils = { }
                           window.components = { }
                           window.libs = { }
                           window.services = { }
                           window.controllers = { }

                           const services = [
                              "Content", "Empresa"
                           ]
                           .map(service => `app/ls/services/${ service }`);

                           const components = [
                              "auditoria/AuditoriaCards", "auditoria/FormulaList",
                              "formula/Accordions", "formula/Listagem", "formula/Tutorial",
                              "formula/FormulaCampo"
                           ]
                           .map(component => `app/ls/components/${ component }`);

                           const utils = [
                              "debounce", "string", "force-reload"
                           ].map(util => `app/ls/utils/${ util }`);

                           const libs = [
                              "toastr/toastr.init", "toastr/toastr.min", "toastr/toastr.person"
                           ].map(lib => `assets/js/lib/${ lib }`);

                           [...components, ...services, ...libs, ...utils]
                              .forEach(dependency => {
                                 const script = document.createElement("script")
                                 script.src = `https://portal.ssparisi.com.br/prime/${ dependency }.js?version=v.0.0.253`
                                 script.async = false
                                 document.getElementsByTagName("head")[0].appendChild(script)
                              });

								</script>

                        <script src="https://portal.ssparisi.com.br/prime/app/ls/components/formula/FormulaModal.js?version=v.0.0.60" type="text/javascript"></script>
                        <script src="https://portal.ssparisi.com.br/prime/app/ls/components/formula/FormulaField.js?version=v.0.0.13" type="text/javascript"></script>

								<script src="https://portal.ssparisi.com.br/prime/app/ls/services/Formula.js?version=0.2" type="text/javascript"></script>

                        <script src="https://portal.ssparisi.com.br/prime/app/ls/components/loader/loader.js?version=2.0.18" type="text/javascript"></script>
                        <script src="https://portal.ssparisi.com.br/prime/app/ls/services/Aba.js?version=1.0.0" type="text/javascript"></script>
                        <title>Conversor - Lance SSimples</title><!-- Styles Nativos -->

<!-- Funcoes Nativas -->

<script src="https://portal.ssparisi.com.br/prime/app/ls/services/Empresa.js?version=0.0.1"></script>
<script src="https://portal.ssparisi.com.br/prime/assets/js/lib/sweetalert2/sweetalert2.all.min.js"></script>

<script>

</script>

<!--Funcao Valida Arquivo -->
<style>
   
.autocomplete {
  background: white;
  z-index: 1000;
  font: 14px/22px "-apple-system", BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  overflow: auto;
  box-sizing: border-box;
  border: 1px solid rgba(50, 50, 50, 0.6);
  max-height: 300px !important;
  z-index: 99999;
}

.autocomplete * {
  font: inherit;
}

.autocomplete > div {
  padding: 0 4px;
}

.autocomplete .group {
  background: #eee;
}

.autocomplete > div:hover:not(.group),
.autocomplete > div.selected {
  background: #e2edff;
  cursor: pointer;
}/*
 * This combined file was created by the DataTables downloader builder:
 *   https://datatables.net/download
 *
 * To rebuild or modify this file with the latest versions of the included
 * software please visit:
 *   https://datatables.net/download/#dt/dt-1.10.22/r-2.2.6
 *
 * Included libraries:
 *   DataTables 1.10.22, Responsive 2.2.6
 */

table.dataTable{width:100% !important;margin:0 auto;clear:both;border-collapse:separate;border-spacing:0}table.dataTable thead th,table.dataTable tfoot th{font-weight:bold}table.dataTable thead th,table.dataTable thead td{padding:10px 18px;border-bottom:1px solid #111}table.dataTable thead th:active,table.dataTable thead td:active{outline:none}table.dataTable tfoot th,table.dataTable tfoot td{padding:10px 18px 6px 18px;border-top:1px solid #111}table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled{cursor:pointer;*cursor:hand;background-repeat:no-repeat;background-position:center right}table.dataTable thead .sorting{background-image:url("/prime/app/ls/components/DataTables/sort_both.png")}table.dataTable thead .sorting_asc{background-image:url("/prime/app/ls/components/DataTables/sort_asc.png")}table.dataTable thead .sorting_desc{background-image:url("/prime/app/ls/components/DataTables/sort_desc.png")}table.dataTable thead .sorting_asc_disabled{background-image:url("/prime/app/ls/components/DataTables/sort_asc_disabled.png")}table.dataTable thead .sorting_desc_disabled{background-image:url("/prime/app/ls/components/DataTables/sort_desc_disabled.png")}table.dataTable tbody tr{background-color:#ffffff}table.dataTable tbody tr.selected{background-color:#B0BED9}table.dataTable tbody th,table.dataTable tbody td{padding:8px 10px}table.dataTable.row-border tbody th,table.dataTable.row-border tbody td,table.dataTable.display tbody th,table.dataTable.display tbody td{border-top:1px solid #ddd}table.dataTable.row-border tbody tr:first-child th,table.dataTable.row-border tbody tr:first-child td,table.dataTable.display tbody tr:first-child th,table.dataTable.display tbody tr:first-child td{border-top:none}table.dataTable.cell-border tbody th,table.dataTable.cell-border tbody td{border-top:1px solid #ddd;border-right:1px solid #ddd}table.dataTable.cell-border tbody tr th:first-child,table.dataTable.cell-border tbody tr td:first-child{border-left:1px solid #ddd}table.dataTable.cell-border tbody tr:first-child th,table.dataTable.cell-border tbody tr:first-child td{border-top:none}table.dataTable.stripe tbody tr.odd,table.dataTable.display tbody tr.odd{background-color:#f9f9f9}table.dataTable.stripe tbody tr.odd.selected,table.dataTable.display tbody tr.odd.selected{background-color:#acbad4}table.dataTable.hover tbody tr:hover,table.dataTable.display tbody tr:hover{background-color:#f6f6f6}table.dataTable.hover tbody tr:hover.selected,table.dataTable.display tbody tr:hover.selected{background-color:#aab7d1}table.dataTable.order-column tbody tr>.sorting_1,table.dataTable.order-column tbody tr>.sorting_2,table.dataTable.order-column tbody tr>.sorting_3,table.dataTable.display tbody tr>.sorting_1,table.dataTable.display tbody tr>.sorting_2,table.dataTable.display tbody tr>.sorting_3{background-color:#fafafa}table.dataTable.order-column tbody tr.selected>.sorting_1,table.dataTable.order-column tbody tr.selected>.sorting_2,table.dataTable.order-column tbody tr.selected>.sorting_3,table.dataTable.display tbody tr.selected>.sorting_1,table.dataTable.display tbody tr.selected>.sorting_2,table.dataTable.display tbody tr.selected>.sorting_3{background-color:#acbad5}table.dataTable.display tbody tr.odd>.sorting_1,table.dataTable.order-column.stripe tbody tr.odd>.sorting_1{background-color:#f1f1f1}table.dataTable.display tbody tr.odd>.sorting_2,table.dataTable.order-column.stripe tbody tr.odd>.sorting_2{background-color:#f3f3f3}table.dataTable.display tbody tr.odd>.sorting_3,table.dataTable.order-column.stripe tbody tr.odd>.sorting_3{background-color:whitesmoke}table.dataTable.display tbody tr.odd.selected>.sorting_1,table.dataTable.order-column.stripe tbody tr.odd.selected>.sorting_1{background-color:#a6b4cd}table.dataTable.display tbody tr.odd.selected>.sorting_2,table.dataTable.order-column.stripe tbody tr.odd.selected>.sorting_2{background-color:#a8b5cf}table.dataTable.display tbody tr.odd.selected>.sorting_3,table.dataTable.order-column.stripe tbody tr.odd.selected>.sorting_3{background-color:#a9b7d1}table.dataTable.display tbody tr.even>.sorting_1,table.dataTable.order-column.stripe tbody tr.even>.sorting_1{background-color:#fafafa}table.dataTable.display tbody tr.even>.sorting_2,table.dataTable.order-column.stripe tbody tr.even>.sorting_2{background-color:#fcfcfc}table.dataTable.display tbody tr.even>.sorting_3,table.dataTable.order-column.stripe tbody tr.even>.sorting_3{background-color:#fefefe}table.dataTable.display tbody tr.even.selected>.sorting_1,table.dataTable.order-column.stripe tbody tr.even.selected>.sorting_1{background-color:#acbad5}table.dataTable.display tbody tr.even.selected>.sorting_2,table.dataTable.order-column.stripe tbody tr.even.selected>.sorting_2{background-color:#aebcd6}table.dataTable.display tbody tr.even.selected>.sorting_3,table.dataTable.order-column.stripe tbody tr.even.selected>.sorting_3{background-color:#afbdd8}table.dataTable.display tbody tr:hover>.sorting_1,table.dataTable.order-column.hover tbody tr:hover>.sorting_1{background-color:#eaeaea}table.dataTable.display tbody tr:hover>.sorting_2,table.dataTable.order-column.hover tbody tr:hover>.sorting_2{background-color:#ececec}table.dataTable.display tbody tr:hover>.sorting_3,table.dataTable.order-column.hover tbody tr:hover>.sorting_3{background-color:#efefef}table.dataTable.display tbody tr:hover.selected>.sorting_1,table.dataTable.order-column.hover tbody tr:hover.selected>.sorting_1{background-color:#a2aec7}table.dataTable.display tbody tr:hover.selected>.sorting_2,table.dataTable.order-column.hover tbody tr:hover.selected>.sorting_2{background-color:#a3b0c9}table.dataTable.display tbody tr:hover.selected>.sorting_3,table.dataTable.order-column.hover tbody tr:hover.selected>.sorting_3{background-color:#a5b2cb}table.dataTable.no-footer{border-bottom:1px solid #111}table.dataTable.nowrap th,table.dataTable.nowrap td{white-space:nowrap}table.dataTable.compact thead th,table.dataTable.compact thead td{padding:4px 17px}table.dataTable.compact tfoot th,table.dataTable.compact tfoot td{padding:4px}table.dataTable.compact tbody th,table.dataTable.compact tbody td{padding:4px}table.dataTable th.dt-left,table.dataTable td.dt-left{text-align:left}table.dataTable th.dt-center,table.dataTable td.dt-center,table.dataTable td.dataTables_empty{text-align:center}table.dataTable th.dt-right,table.dataTable td.dt-right{text-align:right}table.dataTable th.dt-justify,table.dataTable td.dt-justify{text-align:justify}table.dataTable th.dt-nowrap,table.dataTable td.dt-nowrap{white-space:nowrap}table.dataTable thead th.dt-head-left,table.dataTable thead td.dt-head-left,table.dataTable tfoot th.dt-head-left,table.dataTable tfoot td.dt-head-left{text-align:left}table.dataTable thead th.dt-head-center,table.dataTable thead td.dt-head-center,table.dataTable tfoot th.dt-head-center,table.dataTable tfoot td.dt-head-center{text-align:center}table.dataTable thead th.dt-head-right,table.dataTable thead td.dt-head-right,table.dataTable tfoot th.dt-head-right,table.dataTable tfoot td.dt-head-right{text-align:right}table.dataTable thead th.dt-head-justify,table.dataTable thead td.dt-head-justify,table.dataTable tfoot th.dt-head-justify,table.dataTable tfoot td.dt-head-justify{text-align:justify}table.dataTable thead th.dt-head-nowrap,table.dataTable thead td.dt-head-nowrap,table.dataTable tfoot th.dt-head-nowrap,table.dataTable tfoot td.dt-head-nowrap{white-space:nowrap}table.dataTable tbody th.dt-body-left,table.dataTable tbody td.dt-body-left{text-align:left}table.dataTable tbody th.dt-body-center,table.dataTable tbody td.dt-body-center{text-align:center}table.dataTable tbody th.dt-body-right,table.dataTable tbody td.dt-body-right{text-align:right}table.dataTable tbody th.dt-body-justify,table.dataTable tbody td.dt-body-justify{text-align:justify}table.dataTable tbody th.dt-body-nowrap,table.dataTable tbody td.dt-body-nowrap{white-space:nowrap}table.dataTable,table.dataTable th,table.dataTable td{box-sizing:content-box}.dataTables_wrapper{position:relative;clear:both;*zoom:1;zoom:1}.dataTables_wrapper .dataTables_length{float:left}.dataTables_wrapper .dataTables_length select{border:1px solid #aaa;border-radius:3px;padding:5px;background-color:transparent;padding:4px}.dataTables_wrapper .dataTables_filter{float:right;text-align:right}.dataTables_wrapper .dataTables_filter input{border:1px solid #aaa;border-radius:3px;padding:5px;background-color:transparent;margin-left:3px}.dataTables_wrapper .dataTables_info{clear:both;float:left;padding-top:0.755em}.dataTables_wrapper .dataTables_paginate{float:right;text-align:right;padding-top:0.25em}.dataTables_wrapper .dataTables_paginate .paginate_button{box-sizing:border-box;display:inline-block;min-width:1.5em;padding:0.5em 1em;margin-left:2px;text-align:center;text-decoration:none !important;cursor:pointer;*cursor:hand;color:#333 !important;border:1px solid transparent;border-radius:2px}.dataTables_wrapper .dataTables_paginate .paginate_button.current,.dataTables_wrapper .dataTables_paginate .paginate_button.current:hover{color: white !important;border:1px solid #5873fe;background-color:#5873fe;}.dataTables_wrapper .dataTables_paginate .paginate_button.disabled,.dataTables_wrapper .dataTables_paginate .paginate_button.disabled:hover,.dataTables_wrapper .dataTables_paginate .paginate_button.disabled:active{cursor:default;color:#666 !important;border:1px solid transparent;background:transparent;box-shadow:none}.dataTables_wrapper .dataTables_paginate .paginate_button:hover:not(.next):not(.previous):not(.current){border:0.2px solid rgba(0,0,0,0.2);background-color:rgba(88, 88, 87, 0.3);}.dataTables_wrapper .dataTables_paginate .paginate_button:active{outline:none;box-shadow:inset 0 0 3px #111}.dataTables_wrapper .dataTables_paginate .ellipsis{padding:0 1em}.dataTables_wrapper .dataTables_processing{position:absolute;top:50%;left:50%;width:100%;height:40px;margin-left:-50%;margin-top:-25px;padding-top:20px;text-align:center;font-size:1.2em;background-color:white;background:-webkit-gradient(linear, left top, right top, color-stop(0%, rgba(255,255,255,0)), color-stop(25%, rgba(255,255,255,0.9)), color-stop(75%, rgba(255,255,255,0.9)), color-stop(100%, rgba(255,255,255,0)));background:-webkit-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 25%, rgba(255,255,255,0.9) 75%, rgba(255,255,255,0) 100%);background:-moz-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 25%, rgba(255,255,255,0.9) 75%, rgba(255,255,255,0) 100%);background:-ms-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 25%, rgba(255,255,255,0.9) 75%, rgba(255,255,255,0) 100%);background:-o-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 25%, rgba(255,255,255,0.9) 75%, rgba(255,255,255,0) 100%);background:linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 25%, rgba(255,255,255,0.9) 75%, rgba(255,255,255,0) 100%)}.dataTables_wrapper .dataTables_length,.dataTables_wrapper .dataTables_filter,.dataTables_wrapper .dataTables_info,.dataTables_wrapper .dataTables_processing,.dataTables_wrapper .dataTables_paginate{color:#333}.dataTables_wrapper .dataTables_scroll{clear:both}.dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody{*margin-top:-1px;-webkit-overflow-scrolling:touch}.dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody>table>thead>tr>th,.dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody>table>thead>tr>td,.dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody>table>tbody>tr>th,.dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody>table>tbody>tr>td{vertical-align:middle}.dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody>table>thead>tr>th>div.dataTables_sizing,.dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody>table>thead>tr>td>div.dataTables_sizing,.dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody>table>tbody>tr>th>div.dataTables_sizing,.dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody>table>tbody>tr>td>div.dataTables_sizing{height:0;overflow:hidden;margin:0 !important;padding:0 !important}.dataTables_wrapper.no-footer .dataTables_scrollBody{border-bottom:1px solid #111}.dataTables_wrapper.no-footer div.dataTables_scrollHead table.dataTable,.dataTables_wrapper.no-footer div.dataTables_scrollBody>table{border-bottom:none}.dataTables_wrapper:after{visibility:hidden;display:block;content:"";clear:both;height:0}@media screen and (max-width: 767px){.dataTables_wrapper .dataTables_info,.dataTables_wrapper .dataTables_paginate{float:none;text-align:center}.dataTables_wrapper .dataTables_paginate{margin-top:0.5em}}@media screen and (max-width: 640px){.dataTables_wrapper .dataTables_length,.dataTables_wrapper .dataTables_filter{float:none;text-align:center}.dataTables_wrapper .dataTables_filter{margin-top:0.5em}}


table.dataTable.dtr-inline.collapsed>tbody>tr>td.child,table.dataTable.dtr-inline.collapsed>tbody>tr>th.child,table.dataTable.dtr-inline.collapsed>tbody>tr>td.dataTables_empty{cursor:default !important}table.dataTable.dtr-inline.collapsed>tbody>tr>td.child:before,table.dataTable.dtr-inline.collapsed>tbody>tr>th.child:before,table.dataTable.dtr-inline.collapsed>tbody>tr>td.dataTables_empty:before{display:none !important}table.dataTable.dtr-inline.collapsed>tbody>tr[role="row"]>td.dtr-control,table.dataTable.dtr-inline.collapsed>tbody>tr[role="row"]>th.dtr-control{position:relative;padding-left:30px;cursor:pointer}table.dataTable.dtr-inline.collapsed>tbody>tr[role="row"]>td.dtr-control:before,table.dataTable.dtr-inline.collapsed>tbody>tr[role="row"]>th.dtr-control:before{top:50%;left:5px;height:1em;width:1em;margin-top:-9px;display:block;position:absolute;color:white;border:0.15em solid white;border-radius:1em;box-shadow:0 0 0.2em #444;box-sizing:content-box;text-align:center;text-indent:0 !important;font-family:'Courier New', Courier, monospace;line-height:1em;content:'+';background-color:#31b131}table.dataTable.dtr-inline.collapsed>tbody>tr.parent>td.dtr-control:before,table.dataTable.dtr-inline.collapsed>tbody>tr.parent>th.dtr-control:before{content:'-';background-color:#d33333}table.dataTable.dtr-inline.collapsed.compact>tbody>tr>td.dtr-control,table.dataTable.dtr-inline.collapsed.compact>tbody>tr>th.dtr-control{padding-left:27px}table.dataTable.dtr-inline.collapsed.compact>tbody>tr>td.dtr-control:before,table.dataTable.dtr-inline.collapsed.compact>tbody>tr>th.dtr-control:before{left:4px;height:14px;width:14px;border-radius:14px;line-height:14px;text-indent:3px}table.dataTable.dtr-column>tbody>tr>td.dtr-control,table.dataTable.dtr-column>tbody>tr>th.dtr-control,table.dataTable.dtr-column>tbody>tr>td.control,table.dataTable.dtr-column>tbody>tr>th.control{position:relative;cursor:pointer}table.dataTable.dtr-column>tbody>tr>td.dtr-control:before,table.dataTable.dtr-column>tbody>tr>th.dtr-control:before,table.dataTable.dtr-column>tbody>tr>td.control:before,table.dataTable.dtr-column>tbody>tr>th.control:before{top:50%;left:50%;height:0.8em;width:0.8em;margin-top:-0.5em;margin-left:-0.5em;display:block;position:absolute;color:white;border:0.15em solid white;border-radius:1em;box-shadow:0 0 0.2em #444;box-sizing:content-box;text-align:center;text-indent:0 !important;font-family:'Courier New', Courier, monospace;line-height:1em;content:'+';background-color:#31b131}table.dataTable.dtr-column>tbody>tr.parent td.dtr-control:before,table.dataTable.dtr-column>tbody>tr.parent th.dtr-control:before,table.dataTable.dtr-column>tbody>tr.parent td.control:before,table.dataTable.dtr-column>tbody>tr.parent th.control:before{content:'-';background-color:#d33333}table.dataTable>tbody>tr.child{padding:0.5em 1em}table.dataTable>tbody>tr.child:hover{background:transparent !important}table.dataTable>tbody>tr.child ul.dtr-details{display:inline-block;list-style-type:none;margin:0;padding:0}table.dataTable>tbody>tr.child ul.dtr-details>li{border-bottom:1px solid #efefef;padding:0.5em 0}table.dataTable>tbody>tr.child ul.dtr-details>li:first-child{padding-top:0}table.dataTable>tbody>tr.child ul.dtr-details>li:last-child{border-bottom:none}table.dataTable>tbody>tr.child span.dtr-title{display:inline-block;min-width:75px;font-weight:bold}div.dtr-modal{position:fixed;box-sizing:border-box;top:0;left:0;height:100%;width:100%;z-index:100;padding:10em 1em}div.dtr-modal div.dtr-modal-display{position:absolute;top:0;left:0;bottom:0;right:0;width:50%;height:50%;overflow:auto;margin:auto;z-index:102;overflow:auto;background-color:#f5f5f7;border:1px solid black;border-radius:0.5em;box-shadow:0 12px 30px rgba(0,0,0,0.6)}div.dtr-modal div.dtr-modal-content{position:relative;padding:1em}div.dtr-modal div.dtr-modal-close{position:absolute;top:6px;right:6px;width:22px;height:22px;border:1px solid #eaeaea;background-color:#f9f9f9;text-align:center;border-radius:3px;cursor:pointer;z-index:12}div.dtr-modal div.dtr-modal-close:hover{background-color:#eaeaea}div.dtr-modal div.dtr-modal-background{position:fixed;top:0;left:0;right:0;bottom:0;z-index:101;background:rgba(0,0,0,0.6)}@media screen and (max-width: 767px){div.dtr-modal div.dtr-modal-display{width:95%}}

tr.highlight-remove, tr.highlight-remove:first-child td {
   background-color: #FA8072 !important;
}

tr.highlight-remove td, tr.highlight-add td, tr.highlight-edit td {
   color: white;
}
tr.highlight-remove td button, tr.highlight-add td button, tr.highlight-edit td button {
   color: white !important;
   border-color: white !important;
}

tr.highlight-add {
   background-color: #88be88!important
}

tr.highlight-edit {
   background-color: #f3d37c !important;
}

</style>
<script>
   /**
 * @license
 * https://github.com/kraaden/autocomplete
 * Lodash (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 * Build: `lodash core -o ./dist/lodash.core.js`
 */
;(function(){function n(n){return H(n)&&pn.call(n,"callee")&&!yn.call(n,"callee")}function t(n,t){return n.push.apply(n,t),n}function r(n){return function(t){return null==t?Z:t[n]}}function e(n,t,r,e,u){return u(n,function(n,u,o){r=e?(e=false,n):t(r,n,u,o)}),r}function u(n,t){return j(t,function(t){return n[t]})}function o(n){return n instanceof i?n:new i(n)}function i(n,t){this.__wrapped__=n,this.__actions__=[],this.__chain__=!!t}function c(n,t,r){if(typeof n!="function")throw new TypeError("Expected a function");
return setTimeout(function(){n.apply(Z,r)},t)}function f(n,t){var r=true;return mn(n,function(n,e,u){return r=!!t(n,e,u)}),r}function a(n,t,r){for(var e=-1,u=n.length;++e<u;){var o=n[e],i=t(o);if(null!=i&&(c===Z?i===i:r(i,c)))var c=i,f=o}return f}function l(n,t){var r=[];return mn(n,function(n,e,u){t(n,e,u)&&r.push(n)}),r}function p(n,r,e,u,o){var i=-1,c=n.length;for(e||(e=R),o||(o=[]);++i<c;){var f=n[i];0<r&&e(f)?1<r?p(f,r-1,e,u,o):t(o,f):u||(o[o.length]=f)}return o}function s(n,t){return n&&On(n,t,Dn);
}function h(n,t){return l(t,function(t){return U(n[t])})}function v(n,t){return n>t}function b(n,t,r,e,u){return n===t||(null==n||null==t||!H(n)&&!H(t)?n!==n&&t!==t:y(n,t,r,e,b,u))}function y(n,t,r,e,u,o){var i=Nn(n),c=Nn(t),f=i?"[object Array]":hn.call(n),a=c?"[object Array]":hn.call(t),f="[object Arguments]"==f?"[object Object]":f,a="[object Arguments]"==a?"[object Object]":a,l="[object Object]"==f,c="[object Object]"==a,a=f==a;o||(o=[]);var p=An(o,function(t){return t[0]==n}),s=An(o,function(n){
return n[0]==t});if(p&&s)return p[1]==t;if(o.push([n,t]),o.push([t,n]),a&&!l){if(i)r=T(n,t,r,e,u,o);else n:{switch(f){case"[object Boolean]":case"[object Date]":case"[object Number]":r=J(+n,+t);break n;case"[object Error]":r=n.name==t.name&&n.message==t.message;break n;case"[object RegExp]":case"[object String]":r=n==t+"";break n}r=false}return o.pop(),r}return 1&r||(i=l&&pn.call(n,"__wrapped__"),f=c&&pn.call(t,"__wrapped__"),!i&&!f)?!!a&&(r=B(n,t,r,e,u,o),o.pop(),r):(i=i?n.value():n,f=f?t.value():t,
r=u(i,f,r,e,o),o.pop(),r)}function g(n){return typeof n=="function"?n:null==n?X:(typeof n=="object"?d:r)(n)}function _(n,t){return n<t}function j(n,t){var r=-1,e=M(n)?Array(n.length):[];return mn(n,function(n,u,o){e[++r]=t(n,u,o)}),e}function d(n){var t=_n(n);return function(r){var e=t.length;if(null==r)return!e;for(r=Object(r);e--;){var u=t[e];if(!(u in r&&b(n[u],r[u],3)))return false}return true}}function m(n,t){return n=Object(n),C(t,function(t,r){return r in n&&(t[r]=n[r]),t},{})}function O(n){return xn(I(n,void 0,X),n+"");
}function x(n,t,r){var e=-1,u=n.length;for(0>t&&(t=-t>u?0:u+t),r=r>u?u:r,0>r&&(r+=u),u=t>r?0:r-t>>>0,t>>>=0,r=Array(u);++e<u;)r[e]=n[e+t];return r}function A(n){return x(n,0,n.length)}function E(n,t){var r;return mn(n,function(n,e,u){return r=t(n,e,u),!r}),!!r}function w(n,r){return C(r,function(n,r){return r.func.apply(r.thisArg,t([n],r.args))},n)}function k(n,t,r){var e=!r;r||(r={});for(var u=-1,o=t.length;++u<o;){var i=t[u],c=Z;if(c===Z&&(c=n[i]),e)r[i]=c;else{var f=r,a=f[i];pn.call(f,i)&&J(a,c)&&(c!==Z||i in f)||(f[i]=c);
}}return r}function N(n){return O(function(t,r){var e=-1,u=r.length,o=1<u?r[u-1]:Z,o=3<n.length&&typeof o=="function"?(u--,o):Z;for(t=Object(t);++e<u;){var i=r[e];i&&n(t,i,e,o)}return t})}function F(n){return function(){var t=arguments,r=dn(n.prototype),t=n.apply(r,t);return V(t)?t:r}}function S(n,t,r){function e(){for(var o=-1,i=arguments.length,c=-1,f=r.length,a=Array(f+i),l=this&&this!==on&&this instanceof e?u:n;++c<f;)a[c]=r[c];for(;i--;)a[c++]=arguments[++o];return l.apply(t,a)}if(typeof n!="function")throw new TypeError("Expected a function");
var u=F(n);return e}function T(n,t,r,e,u,o){var i=n.length,c=t.length;if(i!=c&&!(1&r&&c>i))return false;for(var c=-1,f=true,a=2&r?[]:Z;++c<i;){var l=n[c],p=t[c];if(void 0!==Z){f=false;break}if(a){if(!E(t,function(n,t){if(!P(a,t)&&(l===n||u(l,n,r,e,o)))return a.push(t)})){f=false;break}}else if(l!==p&&!u(l,p,r,e,o)){f=false;break}}return f}function B(n,t,r,e,u,o){var i=1&r,c=Dn(n),f=c.length,a=Dn(t).length;if(f!=a&&!i)return false;for(var l=f;l--;){var p=c[l];if(!(i?p in t:pn.call(t,p)))return false}for(a=true;++l<f;){var p=c[l],s=n[p],h=t[p];
if(void 0!==Z||s!==h&&!u(s,h,r,e,o)){a=false;break}i||(i="constructor"==p)}return a&&!i&&(r=n.constructor,e=t.constructor,r!=e&&"constructor"in n&&"constructor"in t&&!(typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)&&(a=false)),a}function R(t){return Nn(t)||n(t)}function D(n){var t=[];if(null!=n)for(var r in Object(n))t.push(r);return t}function I(n,t,r){return t=jn(t===Z?n.length-1:t,0),function(){for(var e=arguments,u=-1,o=jn(e.length-t,0),i=Array(o);++u<o;)i[u]=e[t+u];for(u=-1,
o=Array(t+1);++u<t;)o[u]=e[u];return o[t]=r(i),n.apply(this,o)}}function $(n){return(null==n?0:n.length)?p(n,1):[]}function q(n){return n&&n.length?n[0]:Z}function P(n,t,r){var e=null==n?0:n.length;r=typeof r=="number"?0>r?jn(e+r,0):r:0,r=(r||0)-1;for(var u=t===t;++r<e;){var o=n[r];if(u?o===t:o!==o)return r}return-1}function z(n,t){return mn(n,g(t))}function C(n,t,r){return e(n,g(t),r,3>arguments.length,mn)}function G(n,t){var r;if(typeof t!="function")throw new TypeError("Expected a function");return n=Fn(n),
function(){return 0<--n&&(r=t.apply(this,arguments)),1>=n&&(t=Z),r}}function J(n,t){return n===t||n!==n&&t!==t}function M(n){var t;return(t=null!=n)&&(t=n.length,t=typeof t=="number"&&-1<t&&0==t%1&&9007199254740991>=t),t&&!U(n)}function U(n){return!!V(n)&&(n=hn.call(n),"[object Function]"==n||"[object GeneratorFunction]"==n||"[object AsyncFunction]"==n||"[object Proxy]"==n)}function V(n){var t=typeof n;return null!=n&&("object"==t||"function"==t)}function H(n){return null!=n&&typeof n=="object"}function K(n){
return typeof n=="number"||H(n)&&"[object Number]"==hn.call(n)}function L(n){return typeof n=="string"||!Nn(n)&&H(n)&&"[object String]"==hn.call(n)}function Q(n){return typeof n=="string"?n:null==n?"":n+""}function W(n){return null==n?[]:u(n,Dn(n))}function X(n){return n}function Y(n,r,e){var u=Dn(r),o=h(r,u);null!=e||V(r)&&(o.length||!u.length)||(e=r,r=n,n=this,o=h(r,Dn(r)));var i=!(V(e)&&"chain"in e&&!e.chain),c=U(n);return mn(o,function(e){var u=r[e];n[e]=u,c&&(n.prototype[e]=function(){var r=this.__chain__;
if(i||r){var e=n(this.__wrapped__);return(e.__actions__=A(this.__actions__)).push({func:u,args:arguments,thisArg:n}),e.__chain__=r,e}return u.apply(n,t([this.value()],arguments))})}),n}var Z,nn=1/0,tn=/[&<>"']/g,rn=RegExp(tn.source),en=/^(?:0|[1-9]\d*)$/,un=typeof self=="object"&&self&&self.Object===Object&&self,on=typeof global=="object"&&global&&global.Object===Object&&global||un||Function("return this")(),cn=(un=typeof exports=="object"&&exports&&!exports.nodeType&&exports)&&typeof module=="object"&&module&&!module.nodeType&&module,fn=function(n){
return function(t){return null==n?Z:n[t]}}({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}),an=Array.prototype,ln=Object.prototype,pn=ln.hasOwnProperty,sn=0,hn=ln.toString,vn=on._,bn=Object.create,yn=ln.propertyIsEnumerable,gn=on.isFinite,_n=function(n,t){return function(r){return n(t(r))}}(Object.keys,Object),jn=Math.max,dn=function(){function n(){}return function(t){return V(t)?bn?bn(t):(n.prototype=t,t=new n,n.prototype=Z,t):{}}}();i.prototype=dn(o.prototype),i.prototype.constructor=i;
var mn=function(n,t){return function(r,e){if(null==r)return r;if(!M(r))return n(r,e);for(var u=r.length,o=t?u:-1,i=Object(r);(t?o--:++o<u)&&false!==e(i[o],o,i););return r}}(s),On=function(n){return function(t,r,e){var u=-1,o=Object(t);e=e(t);for(var i=e.length;i--;){var c=e[n?i:++u];if(false===r(o[c],c,o))break}return t}}(),xn=X,An=function(n){return function(t,r,e){var u=Object(t);if(!M(t)){var o=g(r);t=Dn(t),r=function(n){return o(u[n],n,u)}}return r=n(t,r,e),-1<r?u[o?t[r]:r]:Z}}(function(n,t,r){var e=null==n?0:n.length;
if(!e)return-1;r=null==r?0:Fn(r),0>r&&(r=jn(e+r,0));n:{for(t=g(t),e=n.length,r+=-1;++r<e;)if(t(n[r],r,n)){n=r;break n}n=-1}return n}),En=O(function(n,t,r){return S(n,t,r)}),wn=O(function(n,t){return c(n,1,t)}),kn=O(function(n,t,r){return c(n,Sn(t)||0,r)}),Nn=Array.isArray,Fn=Number,Sn=Number,Tn=N(function(n,t){k(t,_n(t),n)}),Bn=N(function(n,t){k(t,D(t),n)}),Rn=O(function(n,t){n=Object(n);var r,e=-1,u=t.length,o=2<u?t[2]:Z;if(r=o){r=t[0];var i=t[1];if(V(o)){var c=typeof i;if("number"==c){if(c=M(o))var c=o.length,f=typeof i,c=null==c?9007199254740991:c,c=!!c&&("number"==f||"symbol"!=f&&en.test(i))&&-1<i&&0==i%1&&i<c;
}else c="string"==c&&i in o;r=!!c&&J(o[i],r)}else r=false}for(r&&(u=1);++e<u;)for(o=t[e],r=In(o),i=-1,c=r.length;++i<c;){var f=r[i],a=n[f];(a===Z||J(a,ln[f])&&!pn.call(n,f))&&(n[f]=o[f])}return n}),Dn=_n,In=D,$n=function(n){return xn(I(n,Z,$),n+"")}(function(n,t){return null==n?{}:m(n,t)});o.assignIn=Bn,o.before=G,o.bind=En,o.chain=function(n){return n=o(n),n.__chain__=true,n},o.compact=function(n){return l(n,Boolean)},o.concat=function(){var n=arguments.length;if(!n)return[];for(var r=Array(n-1),e=arguments[0];n--;)r[n-1]=arguments[n];
return t(Nn(e)?A(e):[e],p(r,1))},o.create=function(n,t){var r=dn(n);return null==t?r:Tn(r,t)},o.defaults=Rn,o.defer=wn,o.delay=kn,o.filter=function(n,t){return l(n,g(t))},o.flatten=$,o.flattenDeep=function(n){return(null==n?0:n.length)?p(n,nn):[]},o.iteratee=g,o.keys=Dn,o.map=function(n,t){return j(n,g(t))},o.matches=function(n){return d(Tn({},n))},o.mixin=Y,o.negate=function(n){if(typeof n!="function")throw new TypeError("Expected a function");return function(){return!n.apply(this,arguments)}},o.once=function(n){
return G(2,n)},o.pick=$n,o.slice=function(n,t,r){var e=null==n?0:n.length;return r=r===Z?e:+r,e?x(n,null==t?0:+t,r):[]},o.sortBy=function(n,t){var e=0;return t=g(t),j(j(n,function(n,r,u){return{value:n,index:e++,criteria:t(n,r,u)}}).sort(function(n,t){var r;n:{r=n.criteria;var e=t.criteria;if(r!==e){var u=r!==Z,o=null===r,i=r===r,c=e!==Z,f=null===e,a=e===e;if(!f&&r>e||o&&c&&a||!u&&a||!i){r=1;break n}if(!o&&r<e||f&&u&&i||!c&&i||!a){r=-1;break n}}r=0}return r||n.index-t.index}),r("value"))},o.tap=function(n,t){
return t(n),n},o.thru=function(n,t){return t(n)},o.toArray=function(n){return M(n)?n.length?A(n):[]:W(n)},o.values=W,o.extend=Bn,Y(o,o),o.clone=function(n){return V(n)?Nn(n)?A(n):k(n,_n(n)):n},o.escape=function(n){return(n=Q(n))&&rn.test(n)?n.replace(tn,fn):n},o.every=function(n,t,r){return t=r?Z:t,f(n,g(t))},o.find=An,o.forEach=z,o.has=function(n,t){return null!=n&&pn.call(n,t)},o.head=q,o.identity=X,o.indexOf=P,o.isArguments=n,o.isArray=Nn,o.isBoolean=function(n){return true===n||false===n||H(n)&&"[object Boolean]"==hn.call(n);
},o.isDate=function(n){return H(n)&&"[object Date]"==hn.call(n)},o.isEmpty=function(t){return M(t)&&(Nn(t)||L(t)||U(t.splice)||n(t))?!t.length:!_n(t).length},o.isEqual=function(n,t){return b(n,t)},o.isFinite=function(n){return typeof n=="number"&&gn(n)},o.isFunction=U,o.isNaN=function(n){return K(n)&&n!=+n},o.isNull=function(n){return null===n},o.isNumber=K,o.isObject=V,o.isRegExp=function(n){return H(n)&&"[object RegExp]"==hn.call(n)},o.isString=L,o.isUndefined=function(n){return n===Z},o.last=function(n){
var t=null==n?0:n.length;return t?n[t-1]:Z},o.max=function(n){return n&&n.length?a(n,X,v):Z},o.min=function(n){return n&&n.length?a(n,X,_):Z},o.noConflict=function(){return on._===this&&(on._=vn),this},o.noop=function(){},o.reduce=C,o.result=function(n,t,r){return t=null==n?Z:n[t],t===Z&&(t=r),U(t)?t.call(n):t},o.size=function(n){return null==n?0:(n=M(n)?n:_n(n),n.length)},o.some=function(n,t,r){return t=r?Z:t,E(n,g(t))},o.uniqueId=function(n){var t=++sn;return Q(n)+t},o.each=z,o.first=q,Y(o,function(){
var n={};return s(o,function(t,r){pn.call(o.prototype,r)||(n[r]=t)}),n}(),{chain:false}),o.VERSION="4.17.15",mn("pop join replace reverse split push shift sort splice unshift".split(" "),function(n){var t=(/^(?:replace|split)$/.test(n)?String.prototype:an)[n],r=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",e=/^(?:pop|join|replace|shift)$/.test(n);o.prototype[n]=function(){var n=arguments;if(e&&!this.__chain__){var u=this.value();return t.apply(Nn(u)?u:[],n)}return this[r](function(r){return t.apply(Nn(r)?r:[],n);
})}}),o.prototype.toJSON=o.prototype.valueOf=o.prototype.value=function(){return w(this.__wrapped__,this.__actions__)},typeof define=="function"&&typeof define.amd=="object"&&define.amd?(on._=o, define(function(){return o})):cn?((cn.exports=o)._=o,un._=o):on._=o}).call(this);
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).autocomplete=t()}(this,(function(){"use strict";return function(e){var t,n,o=document,i=o.createElement("div"),r=i.style,f=navigator.userAgent,l=-1!==f.indexOf("Firefox")&&-1!==f.indexOf("Mobile"),u=e.debounceWaitMs||0,a=e.preventSubmit||!1,s=l?"input":"keyup",d=[],c="",p=2,v=e.showOnFocus,m=0;if(void 0!==e.minLength&&(p=e.minLength),!e.input)throw new Error("input undefined");var g=e.input;function h(){n&&window.clearTimeout(n)}function E(){return!!i.parentNode}function w(){var e;m++,d=[],c="",t=void 0,(e=i.parentNode)&&e.removeChild(i)}function L(){for(;i.firstChild;)i.removeChild(i.firstChild);var n=function(e,t){var n=o.createElement("div");return n.textContent=e.label||"",n};e.render&&(n=e.render);var f=function(e,t){var n=o.createElement("div");return n.textContent=e,n};e.renderGroup&&(f=e.renderGroup);var l=o.createDocumentFragment(),u="#9?$";if(d.forEach((function(o){if(o.group&&o.group!==u){u=o.group;var i=f(o.group,c);i&&(i.className+=" group",l.appendChild(i))}var r=n(o,c);r&&(r.addEventListener("click",(function(t){e.onSelect(o,g),w(),t.preventDefault(),t.stopPropagation()})),o===t&&(r.className+=" selected"),l.appendChild(r))})),i.appendChild(l),d.length<1){if(!e.emptyMsg)return void w();var a=o.createElement("div");a.className="empty",a.textContent=e.emptyMsg,i.appendChild(a)}i.parentNode||o.body.appendChild(i),function(){if(E()){r.height="auto",r.width=g.offsetWidth+"px";var t,n=0;f(),f(),e.customize&&t&&e.customize(g,t,i,n)}function f(){var e=o.documentElement,i=e.clientTop||o.body.clientTop||0,f=e.clientLeft||o.body.clientLeft||0,l=window.pageYOffset||e.scrollTop,u=window.pageXOffset||e.scrollLeft,a=(t=g.getBoundingClientRect()).top+g.offsetHeight+l-i,s=t.left+u-f;r.top=a+"px",r.left=s+"px",(n=window.innerHeight-(t.top+g.offsetHeight))<0&&(n=0),r.top=a+"px",r.bottom="",r.left=s+"px",r.maxHeight=n+"px"}}(),function(){var e=i.getElementsByClassName("selected");if(e.length>0){var t=e[0],n=t.previousElementSibling;if(n&&-1!==n.className.indexOf("group")&&!n.previousElementSibling&&(t=n),t.offsetTop<i.scrollTop)i.scrollTop=t.offsetTop;else{var o=t.offsetTop+t.offsetHeight,r=i.scrollTop+i.offsetHeight;o>r&&(i.scrollTop+=o-r)}}}()}function b(){E()&&L()}function y(){b()}function x(e){e.target!==i?b():e.preventDefault()}function C(e){for(var t=e.which||e.keyCode||0,n=0,o=[38,13,27,39,37,16,17,18,20,91,9];n<o.length;n++){if(t===o[n])return}t>=112&&t<=123||40===t&&E()||k(0)}function T(n){var o=n.which||n.keyCode||0;if(38===o||40===o||27===o){var i=E();if(27===o)w();else{if(!i||d.length<1)return;38===o?function(){if(d.length<1)t=void 0;else if(t===d[0])t=d[d.length-1];else for(var e=d.length-1;e>0;e--)if(t===d[e]||1===e){t=d[e-1];break}}():function(){if(d.length<1&&(t=void 0),t&&t!==d[d.length-1]){for(var e=0;e<d.length-1;e++)if(t===d[e]){t=d[e+1];break}}else t=d[0]}(),L()}return n.preventDefault(),void(i&&n.stopPropagation())}13===o&&(t&&(e.onSelect(t,g),w()),a&&n.preventDefault())}function N(){v&&k(1)}function k(o){var i=++m,r=g.value;r.length>=p||1===o?(h(),n=window.setTimeout((function(){e.fetch(r,(function(e){m===i&&e&&(c=r,t=(d=e).length>0?d[0]:void 0,L())}),o)}),0===o?u:0)):w()}function D(){setTimeout((function(){o.activeElement!==g&&w()}),200)}return i.className="autocomplete "+(e.className||""),r.position="absolute",i.addEventListener("mousedown",(function(e){e.stopPropagation(),e.preventDefault()})),i.addEventListener("focus",(function(){return g.focus()})),g.addEventListener("keydown",T),g.addEventListener(s,C),g.addEventListener("blur",D),g.addEventListener("focus",N),window.addEventListener("resize",y),o.addEventListener("scroll",x,!0),{destroy:function(){g.removeEventListener("focus",N),g.removeEventListener("keydown",T),g.removeEventListener(s,C),g.removeEventListener("blur",D),window.removeEventListener("resize",y),o.removeEventListener("scroll",x,!0),h(),w()}}}}));
function createAutocompleter(
  completerOptions
) {
  let isBlur = true
  const {
    id,
    placeholder,
    emptyMsg,
    invalidMsg,
    options,
    allowEmpty,
    onFetch,
    onSelect,
    onBlur,
    required,
    customize,
    render,
    blurOnSelect,
    allowMatch
  }  = _.defaults(completerOptions, {
    id: 'autocompleter-container',
    placeholder: 'Selecione uma opção',
    emptyMsg: 'Não encontrado',
    invalidMsg: 'Por favor, selecione.',
    options: [],
    allowEmpty: true,
    required: true,
    onFetch: function(options, update) { return update(options) },
    onSelect: function() { },
    onBlur: null,
    customize: null,
    render: null,
    blurOnSelect: true,
    allowMatch: true,
  })
  const element = document.getElementById(id)
  if (!element) return

  let selectedOption = null
  element.innerHTML = required ? `
    <input
      type="text"
      name="${id}-autocomplete"
      id="${id}-autocomplete"
      placeholder="${placeholder}"
      class="custom-select col-10"
      autocomplete="off"
      required
    />
  ` : `
  <input
    type="text"
    name="${id}-autocomplete"
    id="${id}-autocomplete"
    placeholder="${placeholder}"
    class="custom-select col-10"
    autocomplete="off"
  />
`
  const input = document.getElementById(`${id}-autocomplete`)
  input.onblur = function() {
    isBlur = true
    // console.log('on blur', selectedOption)
    if (onBlur)
      onBlur(input.value)
    if (!selectedOption && !allowEmpty) {
      input.setCustomValidity(`${invalidMsg}.`)
      input.reportValidity()
    }
  }
  const onSelectOption = function(option) {
    isBlur = false
    selectedOption = option
    const previousValue = input.value
    if(allowMatch){
      input.value = option.label
    }
    if(blurOnSelect){
      input.blur()
    }
    if (typeof input.setCustomValidity === 'function') {
      input.setCustomValidity('')
      input.reportValidity()
    }
    return onSelect(option)
  }

  const matchWithText = (match, text, considerBlur = true, strict = false) =>
    ( considerBlur && isBlur ) || (
      strict
        ? text.normalize("NFD").replace(/\p{Diacritic}/gu, "") === match.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
        : ( !text || match.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(text.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")) )
    )

  const matchLabelWithText = (text, considerBlur, strict) =>
    ({ label }) => matchWithText(label, text, considerBlur, strict)

  autocomplete({
    input,
    showOnFocus: true,
    minLength: 0,
    emptyMsg,
    fetch: function(text, update) {
      text = text.normalize("NFD").replace(/\p{Diacritic}/gu, "")
      text = text.toLowerCase().trim()
      if (!text || (selectedOption && selectedOption.label.toLowerCase() !== text))
        selectedOption = null

      const filteredOptions = options
        // matches com o novo text
        .filter(matchLabelWithText(text))
        /**
         * sort com novo text, sem considerar estar blur
         * isso serve para trazer como primeira opção o último match antes do blur
         *  */
        .sort((a, b) => matchLabelWithText(text, false)(b) - matchLabelWithText(text, false)(a))

      // matches com texto strict ( match === text )
      setTimeout(() => {
         const sameOptionStrict = filteredOptions.filter(matchLabelWithText(text, true, true))
         if (sameOptionStrict.length === 1 && filteredOptions.length === sameOptionStrict.length && !!text)
           onSelectOption(sameOptionStrict[0])
      }, 500);

      onFetch(filteredOptions, update)
      isBlur = false
    },
    onSelect: onSelectOption,
    customize,
    render
  });

}
</script>

</head>
    <body><!-- Side Bar -->
                        <div class="sidebar sidebar-hide-to-small sidebar-shrink sidebar-gestures">
                            <div class="nano">
                                <div class="nano-content">
                                    <div class="logo"><a href="https://portal.ssparisi.com.br/prime/home.php"><img src="https://portal.ssparisi.com.br/prime/assets/images/small_ssparisi.png" alt="" style="width: 50px;"/><span></span></a></div>
                                    <ul><li><a href="https://portal.ssparisi.com.br/prime/app/ls/news/Tutoriais.php"><i class="ti-dropbox-alt" title="Novidades"></i>Novidades da Versão</a></li>
                            <li class="label">Aplicações</li>
                            <li><a class="sidebar-sub-toggle"><i class="ti-control-shuffle" title="Lance SSimples"></i>Lance SSimples<span class="sidebar-collapse-icon ti-angle-down"></span></a>
                                <ul>
                                    <li><a href="https://portal.ssparisi.com.br/prime/app/ls/Conversor.php?sist=LSCont">Lançamentos Contábeis</a></li><li><a href="https://portal.ssparisi.com.br/prime/app/ls/Conversor.php?sist=LSConc">Conciliação de Extratos</a></li><li><a href="https://portal.ssparisi.com.br/prime/app/ls/Conversor.php?sist=LSFisc">Duplicatas Fiscais</a></li>
                                    <li><a href="https://portal.ssparisi.com.br/prime/app/ls/Conversor.php?sist=LSDep">Dep. Pessoal</a></li>
                                    <li><a href="https://portal.ssparisi.com.br/prime/app/ls/Conversor.php?sist=LSErp">ERP/Ponto</a></li></ul>
                            </li>
                            <li><a class="sidebar-sub-toggle"><i class="ti-check-box" title="Auditoria"></i>Auditoria<span class="sidebar-collapse-icon ti-angle-down"></span></a>
                                <ul>
                                    <li><a href="https://portal.ssparisi.com.br/prime/app/ls/Auditoria.php?sist=LSAnl&mode=edit">Cadastrar</a></li>
                                    <li><a href="https://portal.ssparisi.com.br/prime/app/ls/Auditoria.php?sist=LSAnl&mode=process">Auditar</a></li>
                                </ul>
                            </li><li><a class="sidebar-sub-toggle"><i class="ti-plus" title="Cadastros"></i>Cadastros<span class="sidebar-collapse-icon ti-angle-down"></span></a>
                                <ul>
                                    <li><a href="https://portal.ssparisi.com.br/prime/app/ls/Relacionamento.php">Relacionamentos</a></li>
                                    <li><a href="https://portal.ssparisi.com.br/prime/app/ls/Empresa.php">Empresas</a></li><li><a href="https://portal.ssparisi.com.br/prime/app/ctrl/RelCol.php">Usuários</a></li></ul>
                            </li><li class="label">Recursos</li><li><a href="https://portal.ssparisi.com.br/prime/app/ctrl/RelLayKeywords.php"><i class="ti-direction-alt"></i>Layouts</a></li><li><a href="https://portal.ssparisi.com.br/prime/app/ls/analyze.php"><i class="ti-wand" title="SSmart Layout"></i>SSmart Layout</a></li><li><a href="https://portal.ssparisi.com.br/prime/app/ctrl/RelGestaoEsclarecimento.php"><i class="ti-comment-alt"></i>Esclarecimento<span class="badge badge-light ml-2" style="color: #393459;font-size: 11px; padding: 5px 10px; font-weight: 700; border-radius: 10px;background-color: #ffffff73; position: unset;">
        0</span></a></li><li class="label">Extra</li><li><a target="_blank" href="https://widget.karoo.com.br/c/6843"><i class="ti-headphone-alt" title="Site"></i>Suporte Online</a></li>
						   <li><a target="_blank" href="https://ssparisi.com.br/"><i class="ti-world" title="Site"></i>Site </a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- /# sidebar --><!-- Header -->
						<div class="header">
							<div class="container-fluid">
								<div class="row" style="height:5vh">
									<div class="col-lg-12 d-flex align-items-center justify-content-between h-100">
										<div>
											<div style="top:4px" class="hamburger sidebar-toggle" id="menubar-toggler">
												<span class="line"></span>
												<span class="line"></span>
												<span class="line"></span>
											</div>
										</div>

										<div>
											<ul>
												<li class="header-icon dib"><i class="ti-bell"></i>
													<div class="drop-down">
														<div class="dropdown-content-heading">
															<span class="text-left">Notificações Recentes</span>
														</div>
														<div class="dropdown-content-body">
															<ul>
																<li>
																	<a href="#">
																		<img class="pull-left m-r-10 avatar-img" src="https://portal.ssparisi.com.br/alpha/assets/images/avatar/3.jpg" alt="" />
																		<div class="notification-content">
																			<small class="notification-timestamp pull-right">01:37 PM</small>
																			<div class="notification-heading">Allan Sander</div>
																			<div class="notification-text">Nenhuma Notificação </div>
																		</div>
																	</a>
																</li>
																<li class="text-center">
																	<a href="#" class="more-link" disabled>Ver Todas</a>
																</li>
															</ul>
														</div>
													</div>
												</li>

												<li class="header-icon dib"><span class="user-avatar">Allan Sander <i class="ti-angle-down f-s-10"></i></span>
													<div class="drop-down dropdown-profile">
														<div class="dropdown-content-body">
															<ul>
																<li><a href="https://portal.ssparisi.com.br/prime/profile.php"><i class="ti-user"></i> <span>Perfil</span></a></li>
																
																<li><a href="https://portal.ssparisi.com.br/prime/pph/lgu.php"><i class="ti-power-off"></i> <span>Sair</span></a></li>
															</ul>
														</div>
													</div>
												</li>
											</ul>
										</div>

									</div>
								</div>
							</div>
						</div>
						<!-- /# Header --><div class="content-wrap" style="min-height: 400px;">
						<div class="main">
							<div class="container-fluid">
								<section id="main-content"><script language="javascript">
   $(document).ready(function() {
      $('#datepicker').mask('99/99/9999');
      return false;

      function validateDate(id) {
         var RegExPattern =
            /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])      [\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;
         if (!((id.value.match(RegExPattern)) && (id.value != ''))) {
            alert('Data inválida.');
            $('#datepicker').focus();
         } else
            alert('Data válida.');
      };
   });
</script>

<div class="row">
   <div id="Conteudo-abas" class="col-12">
      <!-- Linha Header -->
      <div class="row mt-4" id="companyFilter" style="display:none">
         <div class="col-12">
            <div class="form-group row justify-content-center">
               <label class="col-2 col-form-label text-right"><strong>Filtrar por:</strong></label>
               <div class="col-10">
                  <div class="btn-group" role="group" style="justify-content: center;width: 83.333%;">
                     <button type="button" id="button-multi" class="filterOption btn btn-outline-primary" value="multi">Utilizados por mais de um cliente</button>
                     <button type="button" id="button-one" class="filterOption btn btn-outline-primary" value="one">Utilizados individualmente</button>
                     <button type="button" id="button-none" class="filterOption btn btn-outline-primary" value="none">Não utilizados</button>
                     <button type="button" id="button-new" class="filterOption btn btn-outline-primary" value="new">Novos</button>
                     <button type="button" id="button-all" class="filterOption btn btn-outline-primary" value="all">Todos</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="row">
         <form id="cadastro" name="cadastro" class="col-12" method="post" action="layout/processa.php" enctype="multipart/form-data" method="POST" style="margin-top: 15px;" autocomplete="off">
            <div class="form-group row justify-content-center">
               <label for="Empresa" class="col-2 col-form-label" style="text-align: right;"><strong>Empresa:
                  </strong></label>
               <div class="col-10">
                  <div class="input-group">
                     <input type="text" style="display: none" name="Empresa" id="Empresa" />
                     <input type="text" id="empresa-autocomplete" placeholder="Digite ou escolha a empresa..." class="custom-select col-10" autocomplete="off" />
                     </select>
                  </div>
               </div>
            </div>
            <div id="lastImportDiv" class="form-group row justify-content-center" style="display: none">
               <label class="col-2 col-form-label" style="text-align: right;"><strong>Última importação
                     salva:</strong> </label>

               <div class="col-10">
                  <div style="margin-right: 16.6%; position: relative;">

                     <span id="lastImportDate" style="position: absolute; top: 7px;">00/00/0000 - 0 dias
                        atrás</span>
                     <button id="lastImportButton" type="button" class="btn btn-info float-right">Carregar Última
                        Importação</button>
                  </div>
               </div>
            </div>
            <div id="GpUpload" class="form-group row justify-content-center mb-0">
               <label for="upload" id="LbUp" name="LbUp" class="col-2 col-form-label" style="text-align: right;"><strong>Arquivo:</strong> </label>
               <div class="col-10">
                  <div class="input-group">
                     <div class="custom-file col-10 custom-select ">
                        <label class="custom-file-label" for="upload" style="text-align: left;">
                           <span id="NomeArq">Escolher arquivo...</span>
                        </label>
                        <input type="file" name="upload" id="upload" class="custom-file-input" aria-describedby="upload" accept='*' onChange="return EscreveArq(); return false;" value="" required>
                     </div>
                  </div>
               </div>
               <div id="GpData" class="form-group row justify-content-center col-12 mt-2" style="margin-bottom: 0; text-align: right; display: none">
                  <label for="upload" class="col-2 col-form-label">
                     <strong>Contabilização:</strong>
                  </label>
                  <div class="col-10" style="padding-left: 5px; text-align: left">
                     <input id="datepicker" name="datepicker" width="150" maxlength="10" onBlur="javascript: validateDate();" />
                     <p id="GpDataAviso">
                     <p>
                  </div>
               </div>
               <div id="GpDay" class="form-group row justify-content-center col-12 mt-2" style="margin-bottom: 0; text-align: right; display:none;">
                  <label for="upload" class="col-2 col-form-label">
                     <strong>Dia:</strong>
                  </label>
                  <div class="col-10" style="padding-left: 5px; text-align: left">
                     <input class="form-control" type="number" id="dayReg" name="dayReg" style="width: 120px" />
                     <p id="GpDayAviso">* Os arquivos desse layout não possuem o dia dos lançamentos. Por favor,
                        informe o dia que o layout deve considerar para importação.
                     <p>

                  </div>
               </div>

               <div id="GpAno" class="form-group row justify-content-center col-12 mt-2" style="margin-top: 30px; text-align: right; display: none">
                  <label for="yearReg" class="col-2 col-form-label"><strong>Ano dos Lançamentos:</strong> </label>
                  <div class="col-10" style="padding-left: 5px; text-align: left">
                     <input type="number" id="yearReg" name="yearReg" style="width: 70px" />
                     <p id="GpAnoAviso">
                     <p>
                  </div>
               </div>
               <div id="GpAccount" class="form-group row justify-content-center col-12 mt-2 mt-2" style="text-align: right; display: none">
                  <label for="upload" class="col-2 col-form-label">
                     <strong id="GpAccountLabel">Conta:</strong>
                  </label>
                  <div class="col-10" style="padding-left: 5px; text-align: left">
                     <input class="form-control" id="accInput" name="accInput" style="width: 120px" />
                  </div>
               </div>
               <div id="GpInitialValue" class="form-group row justify-content-center col-12 mt-2" style="text-align: right; display: none">
                  <label for="initialValue" class="col-2 col-form-label">
                     <strong>Valor Inicial:</strong>
                  </label>
                  <div class="col-10" style="padding-left: 5px; text-align: left">
                     <input class="form-control" step="0.01" type="text" id="initialValue" name="initialValue" style="width: 120px" />
                  </div>
               </div>
               <div id="GpCtBankExp" class="form-group row justify-content-center col-12" style="text-align: right;">
                  <label for="GpCtBankExp" class="col-2 col-form-label">
                     <strong>Conta Banco Exportação:</strong>
                  </label>
                  <div class="col-10" style="padding-left: 5px; text-align: left">
                     <input class="form-control" type="text" id="ctBankExp" name="ctBankExp" style="width: 120px" />
                  </div>
               </div>
               <div id="GpLanc" class="form-group row justify-content-center col-12 mt-2" style="margin-top: 30px; text-align: right; display: none">
                  <label for="lancReg" class="col-2 col-form-label"><strong>Lançamento:</strong> </label>
                  <div class="col-10" style="padding-left: 5px; text-align: left">
                     <input type="number" id="lancReg" name="lancReg" style="width: 120px" />
                  </div>
               </div>
               <div id="TpExportacao" class="form-group row justify-content-center col-12 mb-0 mt-2" style="margin-top: 30px; text-align: right; display: none">
                  <label for="yearReg" class="col-2 col-form-label"><strong>Tipo de exportação:</strong> </label>
                  <div class="col-10 d-flex align-items-center" style="padding-left: 5px; text-align: left">
                     <div class="form-check form-check-inline mb-0 ml-3">
                        <input class="form-check-input" type="radio" name="TpE" id="TpExp1" value="entrada" checked>
                        <label class="form-check-label p-0" for="inlineRadio1">Entrada</label>
                     </div>
                     <div class="form-check form-check-inline ml-5 mb-0">
                        <input class="form-check-input" type="radio" name="TpE" id="TpExp2" value="saida">
                        <label class="form-check-label p-0" for="inlineRadio2">Saida</label>
                     </div>
                  </div>
               </div>
               <div id="exceptionWXL" class="form-group row justify-content-center col-12 mb-0 mt-2" style="margin-top: 30px; text-align: right; display: none">
                  <label for="yearReg" class="col-2 col-form-label"><strong>Tipo de exportação Prosoft:</strong> </label>
                  <div class="col-10 d-flex align-items-center" style="padding-left: 5px; text-align: left">
                     <div class="form-check form-check-inline mb-0 ml-3">
                        <input class="form-check-input" type="radio" name="excWXL" id="entSai" value="false" checked>
                        <label class="form-check-label p-0" for="entSai">Entrada/Saída</label>
                     </div>
                     <div class="form-check form-check-inline ml-5 mb-0">
                        <input class="form-check-input" type="radio" name="excWXL" id="Trans" value="true">
                        <label class="form-check-label p-0" for="Trans">Transferência</label>
                     </div>
                  </div>
               </div>
               <div id="infoBanco" class="form-group row justify-content-center col-12 mt-2" style="margin-top: 30px;margin-bottom: 0px;text-align: right; display: none">
                  <label class="col-2 col-form-label">
                     <strong>Banco:</strong>
                  </label>
                  <div class="col-10" style="padding-left: 5px; text-align: left">
                     <input class="form-control" name="banco" style="width: 120px" />
                  </div>
                  <label class="col-2 col-form-label">
                     <strong>Agência:</strong>
                  </label>
                  <div class="col-10" style="padding-left: 5px; text-align: left">
                     <input class="form-control" name="agencia" style="width: 120px" />
                  </div>
                  <label class="col-2 col-form-label">
                     <strong>Conta:</strong>
                  </label>
                  <div class="col-10" style="padding-left: 5px; text-align: left">
                     <input class="form-control" name="conta" style="width: 120px" />
                  </div>
               </div>
               <div id="exceptionPOP" class="form-group row justify-content-center col-12 mt-2" style="text-align: right; display: none">
                  <label class="col-2 col-form-label">
                     <strong>Saldo Inicial:</strong>
                  </label>
                  <div class="col-10" style="padding-left: 5px; text-align: left">
                     <input class="form-control" name="saldoInicial" style="width: 120px" />
                  </div>
                  <label class="col-2 col-form-label">
                     <strong>Saldo Final:</strong>
                  </label>
                  <div class="col-10" style="padding-left: 5px; text-align: left">
                     <input class="form-control" name="saldoFinal" style="width: 120px" />
                  </div>
                  <label class="col-2 col-form-label"><strong>Tipo:</strong> </label>
                  <div class="col-10 d-flex align-items-center" style="padding-left: 5px; text-align: left">
                     <div class="form-check form-check-inline mb-0 ml-3">
                        <input class="form-check-input" type="radio" name="tipo_conta" id="corrente" value="CORRENTE" checked>
                        <label class="form-check-label p-0">Corrente</label>
                     </div>
                     <div class="form-check form-check-inline ml-5 mb-0">
                        <input class="form-check-input" type="radio" name="tipo_conta" id="aplic" value="APLICACAO">
                        <label class="form-check-label p-0">Aplicação</label>
                     </div>
                     <div class="form-check form-check-inline ml-5 mb-0">
                        <input class="form-check-input" type="radio" name="tipo_conta" id="invest" value="INVESTIMENTO">
                        <label class="form-check-label p-0">Investimento</label>
                     </div>
                  </div>
               </div>
               <div id="exceptionDF3" class="form-group row justify-content-center col-12 mt-2" style="text-align: right; display: none">
                  <label class="col-2 col-form-label">
                     <strong>Espécie da nota:</strong>
                  </label>
                  <div class="col-10" style="padding-left: 5px; text-align: left">
                     <input class="form-control" name="especieNota" style="width: 120px" />
                  </div>
                  <label class="col-2 col-form-label">
                     <strong>Série da nota:</strong>
                  </label>
                  <div class="col-10" style="padding-left: 5px; text-align: left">
                     <input class="form-control" name="serieNota" style="width: 120px" />
                  </div>
                  <div class="col-10" style="padding-left: 5px; text-align: left">
                     <p>* Caso não sejam informadas as numerações, serão considerados 36 para espécie e 4 para série da nota.</p>
                  </div>
               </div>
               <div id="exceptionKWZ" class="form-group row justify-content-center col-12 mt-2" style="text-align: right; display: none">
                  <label class="col-2 col-form-label">
                     <strong>Número do lote:</strong>
                  </label>
                  <div class="col-10" style="padding-left: 5px; text-align: left">
                     <input class="form-control" name="lote" style="width: 120px" />
                  </div>
                  <label class="col-2 col-form-label">
                     <strong>Descrição do lote:</strong>
                  </label>
                  <div class="col-10" style="padding-left: 5px; text-align: left">
                     <input class="form-control" name="descLote" style="width: 120px" />
                  </div>
               </div>
               <div id="exceptionRGV" class="form-group row justify-content-center col-12 mt-2" style="text-align: right;">
                  <label class="col-2 col-form-label">
                     <strong>Bandeira:</strong>
                  </label>
                  <div class="col-10" style="padding-left: 5px; text-align: left">
                     <input class="form-control" name="bandeira" style="width: 120px" />
                  </div>
                  <label class="col-2 col-form-label">
                     <strong>Nro Cartão:</strong>
                  </label>
                  <div class="col-10" style="padding-left: 5px; text-align: left">
                     <input class="form-control" name="nro_cartao" style="width: 120px" />
                  </div>
                  <label class="col-2 col-form-label">
                     <strong>Mês/Ano Fatura:</strong>
                  </label>
                  <div class="col-10" style="padding-left: 5px; text-align: left">
                     <input class="form-control" name="fatura" style="width: 120px" />
                  </div>
                  <label class="col-2 col-form-label"><strong>Tipo:</strong> </label>
                  <div class="col-10 d-flex align-items-center" style="padding-left: 5px; text-align: left">
                     <div class="form-check form-check-inline mb-0 ml-3">
                        <input class="form-check-input" type="radio" name="tipo_conta" id="tipoCre" value="CREDITO" checked>
                        <label class="form-check-label p-0">Crédito</label>
                     </div>
                     <div class="form-check form-check-inline ml-5 mb-0">
                        <input class="form-check-input" type="radio" name="tipo_conta" id="tipoDeb" value="DEBITO">
                        <label class="form-check-label p-0">Débito</label>
                     </div>
                  </div>
               </div>
               <div id="exceptionRWM" class="form-group row justify-content-center col-12 mt-2" style="text-align: right; display: none;">
                  <label class="col-2 col-form-label">
                     <strong>Filial:</strong>
                  </label>
                  <div class="col-10" style="padding-left: 5px; text-align: left">
                     <input class="form-control" name="Ls_ExceptionRWM" style="width: 120px" />
                     <p class="mb-0">* Se não for preenchido, será considerada a filial informada no cadastro da empresa.</p>
                  </div>
               </div>

               <table id="GpDates" class="w-100 mt-2">
                  <tr>
                     <td class="text-right" style="width: 16.666667%; padding-right: 15px;"><strong>Filtrar data*</strong></td>
                     <td>
                        <div class="card flex-row justify-content-center col-10" style="    padding: 0.5rem .75rem .5rem .75rem;">
                           <div class="d-flex align-items-center" style="margin-right: 15px;">
                              <label for="datepicker2" class="mb-0 mr-1"><strong>Inicial:</strong></label></strong>
                              <input id="datepicker2" name="datepicker2" width="150" maxlength="10" onBlur="javascript: validateDate();" />
                           </div>
                           <div class="d-flex align-items-center">
                              <label for="datepicker3" class="mb-0 mr-1"><strong>Final:</strong></label>
                              <input id="datepicker3" name="datepicker3" width="150" maxlength="10" onBlur="javascript: validateDate();" />
                           </div>
                        </div>
                     </td>
                  </tr>
                  <tr>
                     <td colspan="5" class="text-center">
                        <p id="GpDatesAviso" class="mb-0">* Ao selecionar as datas somente serão importados os registros do período informado. Caso deixe vazio, serão importados todos os lançamentos presentes no arquivo.</p>
                     </td>
                  </tr>
               </table>
               <div>
                  <input name="lastImport" id="lastImport" style="display:none">
                  <input name="lastImportTable" id="lastImportTable" style="display:none">
                  <input name="SistPrinc" id="SistPrinc" style="display:none">
                  <input name="updateLastImport" id="updateLastImport" style="display:none">
               </div>
               <div class="form-group row justify-content-center col-10" style="margin-top: 30px;">
                  <button type="button" id="processa" name="processa" onClick="return ProcessaForm(); return false;" class="btn btn-outline-primary" style="display: none">
                     <i class="ti-reload"></i> &nbsp; Processar Lançamentos &nbsp;
                  </button>
               </div>
         </form>
      </div>
      <table id="tableNFS" style="display: none">
         <thead>
         </thead>
         <tbody>
         </tbody>
      </table>
   </div>
</div>

<!-- Search -->
						<div id="search">
							<button type="button" class="close">×</button>
							<form>
								<input type="search" value="" placeholder="type keyword(s) here" />
								<button type="submit" class="btn btn-primary">Search</button>
							</form>
						</div>
						<!-- /Search --><!-- jquery vendor -->
						<script src="https://portal.ssparisi.com.br/prime/assets/js/lib/jquery.min.js"></script>
						<script src="https://portal.ssparisi.com.br/prime/assets/js/lib/jquery.nanoscroller.min.js"></script>
						<!-- nano scroller -->
						<script src="https://portal.ssparisi.com.br/prime/assets/js/lib/menubar/sidebar.js"></script>
						<script src="https://portal.ssparisi.com.br/prime/assets/js/lib/preloader/pace.min.js"></script>
						<!-- sidebar -->
						<script src="https://portal.ssparisi.com.br/prime/assets/js/lib/bootstrap.min.js"></script>
						<!-- bootstrap -->
						<script src="https://portal.ssparisi.com.br/prime/assets/js/lib/circle-progress/circle-progress.min.js"></script>
						<script src="https://portal.ssparisi.com.br/prime/assets/js/lib/circle-progress/circle-progress-init.js"></script>

						<script src="https://portal.ssparisi.com.br/prime/assets/js/lib/weather/jquery.simpleWeather.min.js"></script>
						<script src="https://portal.ssparisi.com.br/prime/assets/js/lib/weather/weather-init.js"></script>
						<script src="https://portal.ssparisi.com.br/prime/assets/js/lib/owl-carousel/owl.carousel.min.js"></script>
						<script src="https://portal.ssparisi.com.br/prime/assets/js/lib/owl-carousel/owl.carousel-init.js"></script>
						<script src="https://portal.ssparisi.com.br/prime/assets/js/lib/sweetalert/sweetalert.min.js"></script>
						<script src="https://portal.ssparisi.com.br/prime/assets/js/lib/sweetalert/sweetalert.person.js"></script>
						<script src="https://portal.ssparisi.com.br/prime/assets/js/lib/toastr/toastr.min.js"></script>
						<script src="https://portal.ssparisi.com.br/prime/assets/js/lib/toastr/toastr.person.js"></script>
						<script src="https://portal.ssparisi.com.br/prime/assets/js/scripts.js?version=1.0.1"></script>
						<script src="https://portal.ssparisi.com.br/prime/js/highlight.js" type="text/javascript"></script>
						<script src="https://portal.ssparisi.com.br/prime/js/main.js" type="text/javascript"></script>
						<script src="https://portal.ssparisi.com.br/prime/app/ls/services/Content.js"></script>
						<script>
							document.addEventListener("DOMContentLoaded", function(){
								window.BASE_URL = "https://portal.ssparisi.com.br/prime/app";
                        if(getMenuBarSession() === "closed")
                           closeMenuBar()
                        else
                           openMenuBar()
                        if(/^.*(Result_).*$/.test(window.location.pathname))
                           closeMenuBar(false)
							})
						</script>
						<!-- scripit init--><script src="https://unpkg.com/gijgo@1.9.11/js/gijgo.min.js" type="text/javascript"></script>
<link href="https://unpkg.com/gijgo@1.9.11/css/gijgo.min.css" rel="stylesheet" type="text/css" />
<link href="Conversor.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.css">
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.js"></script>

<script src="https://portal.ssparisi.com.br/prime/app/ls/Conversor.js?version=0.0.106"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js"></script>
<script src="https://cdn.datatables.net/plug-ins/1.10.22/sorting/datetime-moment.js"></script>
<script src="https://cdn.datatables.net/plug-ins/2.1.8/filtering/type-based/accent-neutralise.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.maskedinput/1.4.1/jquery.maskedinput.min.js"></script>
<script>
   $('#datepicker').datepicker({
      uiLibrary: 'bootstrap4',
      format: 'dd/mm/yyyy',
   });
   $('#datepicker2').datepicker({
      uiLibrary: 'bootstrap4',
      format: 'dd/mm/yyyy',
   });
   $('#datepicker3').datepicker({
      uiLibrary: 'bootstrap4',
      format: 'dd/mm/yyyy',
   });
</script>
</body>
			</html>