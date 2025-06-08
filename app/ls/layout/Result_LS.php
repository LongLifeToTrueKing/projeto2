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

								<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" type="text/javascript"></script>
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
                            <title>Conversor - Lance SSimples</title>
    <link href="Result_LS/style.css?version=0.3.8" rel="stylesheet">
    <link href="../accountPlans/style.css?version=0.3.17" rel="stylesheet">
    <script src="https://portal.ssparisi.com.br/prime/app/ls/utils/empresa-siglas.js?version=0.1.18" type="text/javascript"></script>
    <script src="Result_LS/script.js?version=0.4.114"></script>
    <script src="https://portal.ssparisi.com.br/prime/app/ls/accountPlans/PlanoContas.js?version=0.0.84"></script>
    <script>
        var currentInputAccountPlan;
    </script>
    </head>
    <body>

    <div id="pre-loader-base"></div>
<!-- Side Bar -->
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
								<section id="main-content"><!-- jquery vendor -->
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
						<!-- scripit init-->    <script src="https://portal.ssparisi.com.br/prime/app/ls/components/DataTables/datatable.service.js"></script>
    <script src="https://portal.ssparisi.com.br/prime/app/ls/components/anno/anno.service.js?version=0.0.29"></script>
    <script src="https://portal.ssparisi.com.br/prime/app/ls/components/anno/steps/result.js?version=0.0.49"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
	<script src="https://portal.ssparisi.com.br/prime/assets/js/lib/sweetalert2/sweetalert2.all.min.js"></script>

    <div class="container-fluid">
        <div class="row">
            <div id="Conteudo-abas" class="col-12" style="overflow: hidden;">
                <!-- Linha Header -->
                <div class="row" style="margin-top:15px;">
                    <div class="col">
                        <button type="button" id="new-file" name="processa" class="btn btn-warning" style="float: left; color:white;">
                                <i class="ti-file"></i> &nbsp; Novo Arquivo &nbsp;
                        </button>
                    </div>
                    <div class="col" style="text-align: center;" id="title-imp">
                        <span class="text-lg font-bold tracking-wide">
                        <em>
                            <p class="min-w-max" style="margin-bottom: .1rem;" id="nameAndStats">
                                <span id="empInfo"></span><br>
                            </p>
                            <p class="min-w-max" style="margin-bottom: .1rem;">
                                <span id="layInfo"></span>
                            </p>

                        </em>
                        </span>
                    </div>
                    <div class="col" id="export-wrapper">
                        <button type="button" id="export-data" name="processa" class="btn btn-success" style="float: right;">
                                <i class="ti-export"></i> &nbsp; Exporta Dados &nbsp;
                        </button>
                    </div>
                </div>
                <div class="row items-center">
                    <div class="col-5">
                        <div id="ctOnly-wrapper" style="display: none">
                        Conta Única:
                            <input type="text" name="CtOnly" id="CtOnly" placeholder="Conta Única" style="border: 1px solid #aaa; border-radius: 3px; padding: 5px; background-color: transparent; margin-left: 3px;"/>
                            <button type="button" id="btn-ctOnly" class="btn btn-primary btn-sm mb-1" title="Relacionar">
                                <i class="ti-pin-alt" style="font-weight: bold;"></i>
                            </button>
                            <button type="button" data-toggle="tooltip" id="help-ctOnly" class="btn-info rounded-full text-center relative ml-auto mt-auto mb-auto" style="color:white; width: 30px; height:30px">
                                <i class="ti-help"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col"></div>
                    <div id="ctBank-wrapper" class="col-5 flex justify-end" style="display: none">
                        <form id="FormCtBank" style="padding-right:5px" name="FormCtBank" action="https://portal.ssparisi.com.br/prime/app/ls/layout/Actions.php?tpaction=CtBank" enctype="multipart/form-data" method="POST">
                            <div id="ctBank-wrapper" class="flex gap-x-1">
                                <input type="text" name="CtBank" id="CtBank" placeholder="Conta Banco" style="border: 1px solid #aaa; border-radius: 3px; padding: 5px; background-color: transparent; margin-left: 3px;"/>
                                <button id="btn-ctBank" type="button" class="btn btn-primary btn-sm" title="Relacionar">
                                    <i class="ti-wand" style="font-weight: bold;"></i>
                                </button>
                            </div>
                        </form>
                        <button type="button" data-toggle="tooltip" id="help-contaBanco" class="btn-info rounded-full text-center my-auto" style="color:white; width: 30px; height:30px">
                            <i class="ti-help"></i>
                        </button>
                    </div>
                </div>

                <!-- /Linha Header -->
                <hr class="LinhaPag" style="margin-top: 0px;">
                <div id="fake-div-ano"></div>
            </div>
        </div>
    </div>
    <div class="paging-container d-none">
        <input type="text" id="searchInput" class="form-control" placeholder="Pesquisar...">
        <button type="button" id="searchButton" class="btn btn-primary btn-sm" title="Pesquisar">
            <i class="ti-search" style="font-weight: bold;"></i>
        </button>
        <button type="button" id="filterButton" class="btn btn-primary btn-sm" title="Filtros personalizados">
            <i class="ti-filter" style="font-weight: bold;"></i>
        </button>

        <ul class="d-flex flex-row ml-auto pag-buttons-list align-items-center">
            <li><button class="paginate_button page-start"><</button></li>
            <li><i class="ti-more-alt more-prev"></i></li>
            <li><button class="paginate_button page-prev3"></button></li>
            <li><button class="paginate_button page-prev2"></button></li>
            <li><button class="paginate_button page-prev1"></button></li>
            <li><button class="paginate_button current">1</button></li>
            <li><button class="paginate_button page-next1"></button></li>
            <li><button class="paginate_button page-next2"></button></li>
            <li><button class="paginate_button page-next3"></button></li>
            <li><i class="ti-more-alt more-next"></i></li>
            <li><button class="paginate_button page-end">></button></li>
        </ul>
    </div>
    <table id="result_dataTable" class="display dataTable no-footer">
        <div id="loading" class="absolute z-50">
            <div class="fixed inset-y-1/2 m-auto wrapper hidden">
                <div class="blue ball"></div>
                <div class="red ball"></div>
                <div class="yellow ball"></div>
                <div class="green ball"></div>
            </div>
        </div>
        <thead>
            <tr id="headers-table">
                <th class="no-sorting" sort-by="CodTemp">#</th>
                <th class="no-sorting" sort-by="Data">Data</th>
                <th class="no-sorting text-center" sort-by="NrDoc">Nr. Doc.</th>
                <th class="no-sorting" sort-by="Hist">Histórico</th>
                <th class="no-sorting text-right" sort-by="Valor">Valor</th>
                <th class="accHeader no-sorting text-center" sort-by="Cont"></th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody id="accordion_parent">
        </tbody>
    </table>
    <div class="paging-container d-none">
        <ul class="d-flex flex-row ml-auto pag-buttons-list align-items-center">
            <li><button class="paginate_button page-start"><</button></li>
            <li><i class="ti-more-alt more-prev"></i></li>
            <li><button class="paginate_button page-prev3"></button></li>
            <li><button class="paginate_button page-prev2"></button></li>
            <li><button class="paginate_button page-prev1"></button></li>
            <li><button class="paginate_button current">1</button></li>
            <li><button class="paginate_button page-next1"></button></li>
            <li><button class="paginate_button page-next2"></button></li>
            <li><button class="paginate_button page-next3"></button></li>
            <li><i class="ti-more-alt more-next"></i></li>
            <li><button class="paginate_button page-end">></button></li>
        </ul>
    </div>

<!-- Modal desmembramento -->
    <div class="modal fade modal-dialog-scrollable" id="modal-split">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="dialog" aria-labelledby="splitRecordTitle" aria-hidden="true">
            <div class="modal-content">
                <div class="modal-header">
                <div style="width: 29px;"></div>
                <h3 class="modal-title text-center w-100" id="splitRecordTitle" style="font-size: x-large">Desmembrar lançamento</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>

                <div class="modal-body" style="overflow: auto; max-height: 70vh;">
                <div id="simpleMultiple" class="btn-group btn-group-sm d-flex justify-content-end" role="group">
                    <button type="button" name="btn-toggle-record" id="simple" class="btn btn-outline-primary active">Simples</button>
                    <button type="button" name="btn-toggle-record" id="multiple" class="btn btn-outline-primary">Múltiplo</button>
                </div>
                <div class="card" style="font-size: 16px;">
                    <div class="flex flex-row justify-content-between">
                        <div class="mt-auto mb-auto flex-grow-1 text-left">Data: <strong><span id="splitDate"></span></strong></div>
                        <div class="mt-auto mb-auto flex-grow-1 text-center">Número de documento: <input type="text" id="splitNrDoc" style="border:1px gray solid;width:100px"></span></div>
                        <div class="mt-auto mb-auto flex-grow-1 text-right">Valor original: <strong>R$<span id="splitValue"></span></strong></div>
                    </div>
                    <br>
                    <div class="ml-auto mr-auto d-flex flex-row w-100">
                        <div style="width:20%">Histórico original:</div>
                        <div style="width:80%"><span id="splitHist"></span></div>
                    </div>
                    <input type="hidden" id="splitHistRel">
                    <input type="hidden" id="splitCod">
                </div>
                <br>
                <div class="row">
                    <div class="col">
                        <table id="splitTable" class="m-auto">
                            <thead>
                            <tr>
                                <th class="text-center" style="width:55%">Histórico</th>
                                <th class="text-center" style="width:15%">Valor</th>
                                <th class="accHeader text-center" style="width:30%"></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
                </div>
                <div class="modal-footer" style="border-top: none">
                <button type="button" id="btnDeleteDesmembrar" class="btn btn-danger mr-auto" style="display:none">Desfazer desmembramento</button>
                <button type="button" id="btnConfirmDesmembrar" class="btn btn-success">Desmembrar</button>
                <button type="button" id="btnCancelDesmembrar" class="btn btn-secondary" onclick="$('#modal-split').modal('toggle')">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
<!-- /Modal desmembramento -->

<!-- Modal esclarecimento -->
    <div class="modal fade modal-dialog-scrollable h-100" id="modal-esclarecimento">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="dialog" aria-labelledby="esclarecimentoTitle" aria-hidden="true">
            <div class="modal-content" style="margin-bottom: 3.5rem;">
                <div class="modal-header">
                    <div style="width: 29px;"></div>
                    <h3 class="modal-title text-center w-100" id="esclarecimentoTitle" style="font-size: x-large">Solicitar Esclarecimento</h3>
                    <button id="btnCancelEsclarecerX">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body" style="overflow: auto; max-height: 70vh;">
                    <div class="card" style="font-size: 16px;">
                    <div class="flex flex-row justify-content-between">
                        <div class="mt-auto mb-auto flex-grow-1">Data: <strong><span id="escDate"></span></strong></div>
                        <div class="mt-auto mb-auto flex-grow-1">Número de documento: <span id="escNrDoc"></span></div>
                        <div class="mt-auto mb-auto flex-grow-1">Valor: <strong>R$<span id="escValue"></span></strong></div>
                    </div>
                    <br>
                    <div class="ml-auto mr-auto d-flex flex-row w-100">
                        <div style="width:10%">Histórico:</div>
                        <div style="width:90%"><span id="escHist"></span></div>
                    </div>
                    <br>
                    <div>
                        <input type="checkbox" id="recordRel" name="recordRel">
                        <label id="recordRelLabel" for="recordRel">Ativar Robô?</label><br>
                        <small id="relDescription"></small>
                    </div>

                    </div>
                    <input type="hidden" id="escCod">
                    <input type="hidden" id="escHistRel">
                    <h1 class="accHeader text-center" style="font-size: large;"></h1>
                    <h3 class="text-center m-3">Informe as contas caso queira fazer um lançamento transitório.</h3>
                    <div id="esclarecimento-accounts" class="d-flex flex-row" style="padding: 1% 5%;">
                    </div>
                    <h1 class="text-center" style="font-size: large;">Observação</h1>
                    <h3 class="text-center m-3">Caso deseje, escreva uma observação sobre o lançamento.</h3>
                    <div id="esclarecimento-obs" class="d-flex flex-row" style="padding: 1% 5%;">
                    <textarea id="obsEsc" row="5" col="15" class="w-100 esclarecimentoInput" style="height:100px;border: 1px lightgray solid;"></textarea>
                    </div>
                </div>
                <p class="mx-4 text-justify">Será enviado um email para <span id="nomeFin" class="d-contents"></span> (<span id="emailFin" class="d-contents"></span>) solicitando esclarecimento sobre este lançamento.</p>
                <div class="modal-footer" style="border-top: none">
                    <button type="button" id="btnDeleteEsclarecer" class="btn btn-danger mr-auto" style="display:none">Desfazer esclarecimento</button>
                    <button type="button" id="btnConfirmEsclarecer" class="btn btn-success">Agendar Envio</button>
                    <button type="button" id="btnCancelEsclarecer" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
        </div>
<!-- /Modal esclarecimento -->

<!-- Modal filtro personalizado -->
<div class="modal fade modal-dialog-scrollable" id="modal-customFilter">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="dialog" aria-labelledby="customFilterTitle" aria-hidden="true">
            <div class="modal-content">
                <div class="modal-header">
                    <div style="width: 29px;"></div>
                    <h3 class="modal-title text-center w-100" id="customFilterTitle" style="font-size: x-large">Filtro personalizado</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style="overflow: auto; max-height: 70vh;">
                    <table class="w-100">
                        <tr class="d-flex align-items-center">
                            <td style="width: 20%"><label for="dateFilterType">Data</label></td>
                            <td style="width: 40%">
                                <select id="dateFilterType" name="dateFilterType" class="form-control custom-select" style="height:35px !important">
                                    <option value="">Sem filtro</option>
                                    <option value="before">é antes de</option>
                                    <option value="is_equal">é igual a</option>
                                    <option value="after">é depois de</option>
							    </select>
                            </td>
                            <td style="width: 40%"><input id="dateFilterValue" class="form-control" type="date"></td>
                        </tr>
                        <tr class="d-flex align-items-center">
                            <td style="width: 20%"><label for="docFilterType">Número de Documento</label></td>
                            <td style="width: 40%">
                                <select id="docFilterType" name="docFilterType" class="form-control custom-select" style="height:35px !important">
                                    <option value="">Sem filtro</option>
                                    <option value="contains">contém</option>
                                    <option value="doesnt_contain">não contém</option>
                                    <option value="is_equal">é igual a</option>
                                    <option value="is_different">é diferente de</option>
                                </select>
                            </td>
                            <td style="width: 40%"><input id="docFilterValue" class="form-control" type="text"></td>
                        </tr>
                        <tr class="d-flex align-items-center">
                            <td style="width: 20%"><label for="histFilterType">Histórico</label></td>
                            <td style="width: 40%">
                                <select id="histFilterType" name="histFilterType" class="form-control custom-select" style="height:35px !important">
                                    <option value="">Sem filtro</option>
                                    <option value="contains">contém</option>
                                    <option value="doesnt_contain">não contém</option>
                                    <option value="is_equal">é igual a</option>
                                    <option value="is_different">é diferente de</option>
							    </select>
                            </td>
                            <td style="width: 40%"><input id="histFilterValue" class="form-control" type="text"></td>
                        </tr>
                        <tr class="d-flex align-items-center">
                            <td style="width: 20%"><label for="valueFilterType">Valor</label></td>
                            <td style="width: 40%">
                                <select id="valueFilterType" name="valueFilterType" class="form-control custom-select" style="height:35px !important">
                                    <option value="">Sem filtro</option>
                                    <option value="higher_than">maior que</option>
                                    <option value="lower_than">menor que</option>
                                    <option value="is_equal">é igual a</option>
                                    <option value="is_different">é diferente de</option>
							    </select>
                            </td>
                            <td style="width: 40%"><input id="valueFilterValue" class="form-control" type="text"></td>
                        </tr>
                        <tr class="d-flex align-items-center" id="hpFilterRow">
                            <td style="width: 20%"><label for="hpFilterType" id="hpLabel">Histórico Padrão</label></td>
                            <td style="width: 40%">
                                <select id="hpFilterType" name="hpFilterType" class="form-control custom-select" style="height:35px !important">
                                    <option value="">Sem filtro</option>
                                    <option value="is_equal">é igual a</option>
                                    <option value="is_different">é diferente de</option>
                                </select>
                            </td>
                            <td style="width: 40%"><input id="hpFilterValue" class="form-control" type="text"></td>
                        </tr>
                        <tr class="d-flex align-items-center" id="debFilterRow">
                            <td style="width: 20%"><label for="debFilterType" id="debLabel">Conta Débito</label></td>
                            <td style="width: 40%">
                                <select id="debFilterType" name="debFilterType" class="form-control custom-select" style="height:35px !important">
                                    <option value="">Sem filtro</option>
                                    <option value="is_equal">é igual a</option>
                                    <option value="is_different">é diferente de</option>
							    </select>
                            </td>
                            <td style="width: 40%"><input id="debFilterValue" class="form-control" type="text"></td>
                        </tr>
                        <tr class="d-flex align-items-center" id="credFilterRow">
                            <td style="width: 20%"><label for="credFilterType" id="credLabel">Conta Crédito</label></td>
                            <td style="width: 40%">
                                <select id="credFilterType" name="credFilterType" class="form-control custom-select" style="height:35px !important">
                                    <option value="">Sem filtro</option>
                                    <option value="is_equal">é igual a</option>
                                    <option value="is_different">é diferente de</option>
							    </select>
                            </td>
                            <td style="width: 40%"><input id="credFilterValue" class="form-control" type="text"></td>
                        </tr>
                    </table>
                </div>
                <div class="modal-footer" style="border-top: none">
                    <button type="button" id="btnDeleteCustomFilter" class="btn btn-danger mr-auto">Desfazer filtro</button>
                    <button type="button" id="btnConfirmCustomFilter" class="btn btn-success">Confirmar</button>
                    <button type="button" id="btnCancelCustomFilter" class="btn btn-secondary" onclick="$('#modal-customFilter').modal('toggle')">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
<!-- /Modal filtro personalizado -->

<!-- Modal Mostrar Plano de contas-->
	<div class="modal fade" id="ModalInfoPlan" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-lg modal-dialog-centered" role="document" style="margin-top: 0px;">
            <div class="modal-content">

                <!--Header-->
                <div class="modal-header" style="background: #343957;">
                    <h5 class="modal-title text-lg text-white" style="font-weight: 400;" id="title-show-plan"></h5>
                    <button type="button" class="close" onclick="$('#ModalInfoPlan').modal('toggle')" style="text-shadow: none; margin-top: 0;" aria-label="Close">
                        <span class="text-xl" aria-hidden="true" style="color: white;">&times;</span>
                    </button>
				</div>

                <!--Body-->
                <div class="modal-body">
                    <input id="search-input" type="text" class="form-control" placeholder="Pesquisar..." style="width: 300px; margin: 0 auto 10px;">
                    <div id="planListCard" style="position: relative">
                        <table id="dataTablePlanos" class="display dataTable no-footer">
                            <thead>
                                <tr>
                                    <th style="width: 12%">Conta</th>
                                    <th style="width: 25%">Classificação</th>
                                    <th>Nome</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="plansTbody">
                                <div id="tbodyOverlay" style="display: none">Carregando...</div>
                            </tbody>
                        </table>
                        <ul class="d-flex flex-row ml-auto pag-buttons-list align-items-center">
                            <li><button class="plan-paginate_button plan-page-start"><</button></li>
                            <li><i class="ti-more-alt plan-more-prev"></i></li>
                            <li><button class="plan-paginate_button plan-page-prev3"></button></li>
                            <li><button class="plan-paginate_button plan-page-prev2"></button></li>
                            <li><button class="plan-paginate_button plan-page-prev1"></button></li>
                            <li><button class="plan-paginate_button plan-current">1</button></li>
                            <li><button class="plan-paginate_button plan-page-next1"></button></li>
                            <li><button class="plan-paginate_button plan-page-next2"></button></li>
                            <li><button class="plan-paginate_button plan-page-next3"></button></li>
                            <li><i class="ti-more-alt plan-more-next"></i></li>
                            <li><button class="plan-paginate_button plan-page-end">></button></li>
                        </ul>
                    </div>
                </div>

                <!--Footer-->
                <div class="modal-footer">
                    <input type="hidden" id="id-plan">
                    <input type="hidden" id="lay-plan">
                    <form id="reimport-form" class="d-none">
                        <input type="file" name="upload" id="reimport-file">
                    </form>
                    <button class="btn btn-primary" onclick="$('#ModalInfoPlan').modal('toggle')"><i class="ti-close"></i> Ok</button>
                </div>
            </div>
        </div>
	</div>
<!-- /Modal Mostrar Plano -->

<!-- Footer -->
							<div class="row">
								<div class="col-lg-12">
									<div class="footer">
										<p></p>
									</div>
								</div>
							</div>
							<!-- Footer -->
						</section>
					</div>
				</div>
			</div><!-- Search -->
						<div id="search">
							<button type="button" class="close">×</button>
							<form>
								<input type="search" value="" placeholder="type keyword(s) here" />
								<button type="submit" class="btn btn-primary">Search</button>
							</form>
						</div>
						<!-- /Search -->   </body>
   <div id="pre-loader-base"></div>
</html>
