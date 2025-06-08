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
                        <title>SSparisi</title>
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
						<!-- scripit init-->
<style>
.vertical-alignment-helper {
  display:table;
  height: 100%;
  width: 100%;
  pointer-events:none;
}

.vertical-align-center {
  /* To center vertically */
  display: table-cell;
  vertical-align: middle;
  pointer-events:none;
}

.vertical-alignment-helper .modal-content {
  /* Bootstrap sets the size of the modal in the modal-dialog class, we need to inherit it */
  width:inherit;
  max-width:inherit; /* For Bootstrap 4 - to avoid the modal window stretching 
  full width */
  height:inherit;
  /* To center horizontally */
  margin: 0 auto;
  pointer-events:all;
}

.carousel-fade .carousel-item {
	opacity: 0;
	transition-duration: .9s;
	transition-property: opacity;
  }

  .carousel-fade .carousel-item.active,
  .carousel-fade .carousel-item-next.carousel-item-left,
  .carousel-fade .carousel-item-prev.carousel-item-right {
    opacity: 1;
  }

  .carousel-fade .active.carousel-item-left,
  .carousel-fade .active.carousel-item-right {
    opacity: 0;
  }

  .carousel-fade .carousel-item-next,
  .carousel-fade .carousel-item-prev,
  .carousel-fade .carousel-item.active,
  .carousel-fade .active.carousel-item-left,
  .carousel-fade .active.carousel-item-prev {
    transform: translateX(0);
    transform: translate3d(0, 0, 0);
  }

  #popover div:hover {
      background-color: lightgrey; 
  }

  #popover .btn-link h6 {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    color: #868e96;
  }

  .custom-indicator {
    color: #343957;
  }

  .news-description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-height: 21px;
    max-height:45px; 
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
    font-size: 1.3em;
  }

  .transparent-bg {
    background: transparent;
    border: none;
  }

  .card-wrapper {
    min-width: 200px; /* 200 */
    min-height: 170px;
  }

  #carouselNovidades {
    min-height: 25vh;
  }

  .card-info:hover {
    cursor: pointer;
  }

  .info-icon {
    position: absolute;
    right: 0.5em;
    top: 0.3em;
    cursor: auto;
  }

  .card-effect {
    transition: transform .5s ease;
  }

  .card-effect:hover {
    transform: translateY(-8px);
  }

  #inner-cards {
    display: flex;
  }

  .btn-rank {
    position: absolute;
    right: 0;
    top: .1em;
  }
  
  .btn-raise {
    white-space:normal !important;
    /* max-width:200px; */
    /* max-height: 55px; */
  }

  .layout-table {
    max-width: 350px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media(max-width: 1440px) {
    .btn-rank {
      position: relative;
      top: initial;
      right: initial;
      min-width: 150px;
    }
  }</style>

<style>
	.avisoLink{
		color: #007bff;
		text-decoration: underline!important;
	}
	.custom-border-bottom{
      border-bottom: 4px solid #8897f1;
      transition: transform 0.5s ease;
   }
</style>

<script>
const base = ("170358")
const user = ("5678")

const contentHtmlPopover = `
	<div class="row" id="popover">
	<div class="col-12">
		<button class="btn btn-link" onclick="handleButtonRemember('7')">
		<h6 class="m-0"> 7 dias </h6>
		</button>
	</div>
	<div class="col-12">
		<button class="btn btn-link" onclick="handleButtonRemember('14')">
		<h6 class="m-0"> 14 dias </h6>
		</button>
	</div>
	<div class="col-12">
		<button class="btn btn-link" onclick="handleButtonRemember('30')">
		<h6 class="m-0"> 30 dias </h6>
		</button>
	</div>
	<div class="col-12">
		<button class="btn btn-link" onclick="handleButtonRemember('nunca')">
		<h6 class="m-0"> Nunca mais </h6>
		</button>
	</div>
	</div>
`

function openModal(tipo) {
	const tbody = document.getElementById('tbody')
	const elementEmpty = document.getElementById('empty')
	tbody.innerHTML = ''
	elementEmpty.innerHTML = ''

	const layoutsAtual = null;const layoutsPassados = null;
	const arr = tipo == 'atual' ? layoutsAtual : layoutsPassados

	if(!arr.length) {
	elementEmpty.insertAdjacentHTML('afterbegin', `
		<div class="text-center mt-4 mb-3">
		<h5>Sem exportações até o momento</h5>
		</div>
	`)
	}

	arr.forEach((value) => {
	value.quantidade <= 0 ? '' :
	tbody.innerHTML += `
		<tr>
		<td class="layout-table">${value.layout}</td>
		<td style="text-align: center">${new Intl.NumberFormat().format(value.quantidade)}</td>
		<td>${value.tempoSalvo} Hrs.</td>
		</tr>
	`
	})

	$('#modal-info').modal('show')
}

function openModalRanking() {
	const tbody = document.querySelector('#modal-ranking tbody')
	const myRank = document.getElementById('my-rank')
	tbody.innerHTML = ''

	const rankingArr = null;	rankingArr.rankingGeral.forEach((value, index) => {
		isMyRank = !value.descricao.match(/Empresa - \d/)
	tbody.innerHTML += `
		<tr ${isMyRank ? 'style="background:#343957"' : ''}>
		<td class="${isMyRank ? 'text-white' : ''}">${index + 1}</td>
		<td class="${isMyRank ? 'text-white' : ''}">${value.descricao}</td>
		<td class="${isMyRank ? 'text-white' : ''}">${value.quantidade}</td>
		</tr>
	`
	})

	if(rankingArr.meuRank.posicao > 5) {
	tbody.insertAdjacentHTML('beforeend', `
	<tr style="background:#343957"}>
		<td class="text-white">${rankingArr.meuRank.posicao}</td>
		<td class="text-white">${rankingArr.meuRank.empresa}</td>
		<td class="text-white">${rankingArr.meuRank.quantidade}</td>
		</tr>
	`)
	}

	$('#modal-ranking').modal('show')
}

function openModalProdutividade() {
	const link = 'https://www.karoo.com.br/chat/#/entrada?conta=6843'

	swal({
		title: "Layouts Bancários",
		text:  `
		<h6 style="font-weight: 400;">
			Temos os Layouts de quase todos os Bancos prontos e disponibilizamos estes <b>SEM CUSTO!!!</b>
		</h6>
		Você já utiliza todos para seus Clientes?
	`,
		type: "info",
		showCancelButton: true,
		closeOnConfirm: false,
		showLoaderOnConfirm: true,
		confirmButtonText: 'FALE CONOSCO',
		cancelButtonText: 'FECHAR',
		confirmButtonColor: '#343957',
		html: true
		},
		function(){
			setTimeout(function() {
				window.location = link;
			}, 2000);
		});
}

function cancelModalEsclarecimento(){
	$('#esclarecimento').modal('hide')
	insertNewRel('esclarecimento', 'nunca', 'nunca')
}


function cancelModalNovoLayout(layouts){
	$('#novoLayout').modal('hide')
		layouts.forEach(function (layout){
		insertNewRel(layout.id, 'nunca', 'nunca')
	});
}

function cancelModalSuporte(suportes){
	$('#suporte').modal('hide')
		suportes.forEach(function (suporte){
		insertNewRel(suporte.id, 'nunca', 'nunca')
	});
}

function cancelBoKeywords(){
	$('#boKeywords').modal('hide')
	insertNewRel('boKeywords', 'nunca', 'nunca')
}

function openModalSuporte(){
	const suporte = ([])
	const textSuporte = `<p>Olá! Sua Empresa solicitou alterações e nós viemos te informar que elas foram realizadas:</p>
	<table id="tabelaSuportes" class="table table-striped text-center" style="margin: 20px 0; border-radius: 6px; border: 1px solid #e7e7e7; box-shadow: 0 5px 20px rgb(0 0 0 / 10%);">
		<th class="text-center" style="font-weight: bold">Nome do layout</th>
		<th class="text-center" style="font-weight: bold">Arquivo</th>
		<th class="text-center" style="font-weight: bold">Colaborador que solicitou</th>
		<th class="text-center" style="font-weight: bold">Descrição</th>
	</table>`;

	const html = `
	<div id="suporte" class="modal modal-dialog-centered" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document" style="max-width:1000px">
			<div class="modal-content" style="bottom: 1.5em">
			<div class="modal-header" style="background: #343957;">
				<h5 class="modal-title text-white"><i class="fa fa-info-circle mr-2"></i>
				${suporte.length === 1 ? "ALTERAÇÃO REALIZADA!" : "ALTERAÇÕES REALIZADAS!"}
				</h5>
				<button type="button" class="close text-white" style="cursor: pointer" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true" style="font-size: 1.4rem">&times;</span>
				</button>
			</div>
			<div class="modal-body" style="overflow: auto; max-height: 70vh">
				${textSuporte}
				<p>Caso tenha alguma dúvida, entre em contato com o suporte através do chat.</p>
			</div>

			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" onclick="$('#suporte').modal('hide')">Mostrar depois</button>
				<button type="button" class="btn btn-danger" onclick='cancelModalSuporte(${JSON.stringify(suporte)})'>Não mostrar mais</button>
			</div>
			</div>
		</div>
	</div>
	`

	if(suporte.length >0){
		document.getElementsByTagName('body')[0].insertAdjacentHTML('afterend', html)
		suporte.forEach(function (sup){
		$("#tabelaSuportes").append(`
		<tr>
		<td style="width: 300px;">${sup.layout}</td>
		<td style="max-width: 250px; word-wrap: break-word;">${sup.file}</td>
		<td>${sup.user}</td>
		<td>${sup.description}</td>
		</tr>
		`)
		})
		$('#suporte').modal({ backdrop: 'static' })
	}
}

function openModalNovoLayout() {
	const newLayouts = ([])
	const textNewLayouts = `
	${newLayouts.length === 1 ? "<p>Olá! Sua Empresa solicitou um novo layout":"Sua Empresa solicitou novos layouts"} e nós viemos te informar que eles já estão disponíveis para uso e vão ajudar a equipe a ganhar ainda mais produtividade no trabalho.<br><br>Para eliminar também estas digitações, basta criar a configuração na opção empresas e, em seguida, acessar a opção Lance Ssimples, lançamentos contábeis, e começar a agilizar.</p>
	<table id="tabelaNovosLayouts" class="table table-striped text-center" style="margin: 20px 0; border-radius: 6px; border: 1px solid #e7e7e7; box-shadow: 0 5px 20px rgb(0 0 0 / 10%);">
		<th class="text-center" style="font-weight: bold">Nome do layout</th>
		<th class="text-center" style="font-weight: bold">Arquivo</th>
		<th class="text-center" style="font-weight: bold">Colaborador que solicitou</th>
	</table>`;

	const html = `
	<div id="novoLayout" class="modal modal-dialog-centered" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document" style="max-width:800px">
			<div class="modal-content" style="bottom: 1.5em">
			<div class="modal-header" style="background: #343957;">
				<h5 class="modal-title text-white"><i class="fa fa-info-circle mr-2"></i>
				${newLayouts.length === 1 ? "LAYOUT LIBERADO!" : "LAYOUTS LIBERADOS!"}
				</h5>
				<button type="button" class="close text-white" style="cursor: pointer" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true" style="font-size: 1.4rem">&times;</span>
				</button>
			</div>
			<div class="modal-body" style="overflow: auto; max-height: 70vh">
				${textNewLayouts}
				<p>Caso tenha alguma dúvida, entre em contato com o suporte através do chat.</p>
			</div>

			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" onclick="$('#novoLayout').modal('hide')">Mostrar depois</button>
				<button type="button" class="btn btn-danger" onclick='cancelModalNovoLayout(${JSON.stringify(newLayouts)})'>Não mostrar mais</button>
			</div>
			</div>
		</div>
	</div>
	`
	if(newLayouts.length >0){
		document.getElementsByTagName('body')[0].insertAdjacentHTML('afterend', html)
		newLayouts.forEach(function (layout){
		$("#tabelaNovosLayouts").append(`
			<tr>
				<td style="width: 300px;">${layout.layout}</td>
				<td style="max-width: 250px; word-wrap: break-word;">${layout.file}</td>
				<td>${layout.user}</td>
			</tr>
			`)
		});
		$('#novoLayout').modal({ backdrop: 'static' });
	}

}

function setPermissions(){

	const html = `
	<div id="setPermissions" class="modal modal-dialog-centered" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document" style="max-width:800px">
			<div class="modal-content" style="bottom: 1.5em">
			<div class="modal-header" style="background: #343957;">
				<h5 class="modal-title text-white"><i class="fa fa-info-circle mr-2"></i>
					Gerencie os usuários da sua base!
				</h5>
				<button type="button" class="close text-white" style="cursor: pointer" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true" style="font-size: 1.4rem">&times;</span>
				</button>
			</div>
			<div class="modal-body" style="overflow: auto; max-height: 70vh; text-align: center; font-size: 20px;">
				<h2 style="font-weight: bold; font-size: 50px;"><i class="fa fa-warning" style="margin-bottom: 20px; font-size:50px; color:#343957;"></i> Atenção!</h2>
				<div style="text-align: justify; margin: 30px 30px 0 30px;">
					<p>Defina permissões: escolha quais usuários podem realizar ações específicas.</p>
					<p>Inative ex-funcionários: remova o acesso de usuários que saíram da empresa e controle quem pode acessar o cadastro da empresa.</p>
					<p>Comece agora: configure nas opções abaixo.</p>
				</div>
			</div>

			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" onclick="$('#setPermissions').modal('hide')">Mostrar depois</button>
				<button type="button" class="btn btn-info" onclick="setAllPermissions()">Liberar permissão para todos</button>
				<button type="button" class="btn btn-primary" onclick="redirectPermission()">Configurar permissões</button>
			</div>
			</div>
		</div>
	</div>
	`

	document.getElementsByTagName('body')[0].insertAdjacentHTML('afterend', html)
	$('#setPermissions').modal({ backdrop: 'static' });
}

function redirectPermission(){
	data = ({"logged_in":true,"user_id":"5678","user_name":"Allan Sander","user_email":"allan.sander@prestacon.com.br","user_access":"[1],[27],[45],[46]","dh_acesso":"20250514|221405","BasesAcesso":[{"BaseAcesso":"170358","Base":"PRESTACON CONTABILIDADE"}],"user_base":"170358","LAST":1747271697,"Ls_LayImp":"\"ExP_48\",\"DxW_1\",\"HuL_1\",\"DvL_1\",\"SiB_1\",\"OoO_3\",\"ExI_6\",\"BrD_7\",\"EeY_1\",\"SfA_1\",\"ExP_1\",\"MmJ_4\",\"ExBB_13\",\"EbS_1\",\"TtC_1\",\"CaX_2\",\"JpM_1\",\"OfX_2\",\"ExC_5\",\"StN_2\",\"CaX_3\",\"ExI_10\",\"IoC_1\",\"RjI_1\",\"ExI_1\",\"SIC_19\",\"SiC_22\",\"ExI_9\",\"JoT_1\",\"OwO_1\",\"ExT_1\",\"ZcK_2\",\"RiO_1\",\"CeF_1\",\"QrQ_1\",\"ExBB_6\",\"AlG_1\",\"EnB_2\",\"CmT_2\",\"SiC_24\",\"BbQ_1\",\"OfY_1\",\"NtW_1\",\"BrD_12\",\"QsA_1\",\"EzM_1\",\"BxS_1\",\"SIC_3\",\"ExI_8\",\"NyV_1\",\"MmJ_5\",\"ExBB_11\",\"ItZ_1\",\"ExBB_17\",\"ExI_4\",\"ExI_3\",\"NmA_1\",\"QrP_1\",\"ExU_1\",\"UoU_1\",\"DcN_1\",\"JtS_1\",\"IhX_1\",\"HnT_1\",\"KaQ_1\",\"BdV_1\",\"TrB_1\"","Ls_LayExp":"\"TKS\",\"DO5\",\"ANL\"","hasBank":false,"hasAccountPlan":false,"hasCustomPDF":false,"hasPayment":false,"hasEcontador":false,"hasNFS":false,"hasIntegrations":false,"user_menu":"<!-- Side Bar -->\r\n                        <div class=\"sidebar sidebar-hide-to-small sidebar-shrink sidebar-gestures\">\r\n                            <div class=\"nano\">\r\n                                <div class=\"nano-content\">\r\n                                    <div class=\"logo\"><a href=\"https:\/\/portal.ssparisi.com.br\/prime\/home.php\"><img src=\"https:\/\/portal.ssparisi.com.br\/prime\/assets\/images\/small_ssparisi.png\" alt=\"\" style=\"width: 50px;\"\/><span><\/span><\/a><\/div>\r\n                                    <ul><li><a href=\"https:\/\/portal.ssparisi.com.br\/prime\/app\/ls\/news\/Tutoriais.php\"><i class=\"ti-dropbox-alt\" title=\"Novidades\"><\/i>Novidades da Vers\u00e3o<\/a><\/li>\r\n                            <li class=\"label\">Aplica\u00e7\u00f5es<\/li>\r\n                            <li><a class=\"sidebar-sub-toggle\"><i class=\"ti-control-shuffle\" title=\"Lance SSimples\"><\/i>Lance SSimples<span class=\"sidebar-collapse-icon ti-angle-down\"><\/span><\/a>\r\n                                <ul>\r\n                                    <li><a href=\"https:\/\/portal.ssparisi.com.br\/prime\/app\/ls\/Conversor.php?sist=LSCont\">Lan\u00e7amentos Cont\u00e1beis<\/a><\/li><li><a href=\"https:\/\/portal.ssparisi.com.br\/prime\/app\/ls\/Conversor.php?sist=LSConc\">Concilia\u00e7\u00e3o de Extratos<\/a><\/li><li><a href=\"https:\/\/portal.ssparisi.com.br\/prime\/app\/ls\/Conversor.php?sist=LSFisc\">Duplicatas Fiscais<\/a><\/li>\r\n                                    <li><a href=\"https:\/\/portal.ssparisi.com.br\/prime\/app\/ls\/Conversor.php?sist=LSDep\">Dep. Pessoal<\/a><\/li>\r\n                                    <li><a href=\"https:\/\/portal.ssparisi.com.br\/prime\/app\/ls\/Conversor.php?sist=LSErp\">ERP\/Ponto<\/a><\/li><\/ul>\r\n                            <\/li>\r\n                            <li><a class=\"sidebar-sub-toggle\"><i class=\"ti-check-box\" title=\"Auditoria\"><\/i>Auditoria<span class=\"sidebar-collapse-icon ti-angle-down\"><\/span><\/a>\r\n                                <ul>\r\n                                    <li><a href=\"https:\/\/portal.ssparisi.com.br\/prime\/app\/ls\/Auditoria.php?sist=LSAnl&mode=edit\">Cadastrar<\/a><\/li>\r\n                                    <li><a href=\"https:\/\/portal.ssparisi.com.br\/prime\/app\/ls\/Auditoria.php?sist=LSAnl&mode=process\">Auditar<\/a><\/li>\r\n                                <\/ul>\r\n                            <\/li><li><a class=\"sidebar-sub-toggle\"><i class=\"ti-plus\" title=\"Cadastros\"><\/i>Cadastros<span class=\"sidebar-collapse-icon ti-angle-down\"><\/span><\/a>\r\n                                <ul>\r\n                                    <li><a href=\"https:\/\/portal.ssparisi.com.br\/prime\/app\/ls\/Relacionamento.php\">Relacionamentos<\/a><\/li>\r\n                                    <li><a href=\"https:\/\/portal.ssparisi.com.br\/prime\/app\/ls\/Empresa.php\">Empresas<\/a><\/li><li><a href=\"https:\/\/portal.ssparisi.com.br\/prime\/app\/ctrl\/RelCol.php\">Usu\u00e1rios<\/a><\/li><\/ul>\r\n                            <\/li><li class=\"label\">Recursos<\/li><li><a href=\"https:\/\/portal.ssparisi.com.br\/prime\/app\/ctrl\/RelLayKeywords.php\"><i class=\"ti-direction-alt\"><\/i>Layouts<\/a><\/li><li><a href=\"https:\/\/portal.ssparisi.com.br\/prime\/app\/ls\/analyze.php\"><i class=\"ti-wand\" title=\"SSmart Layout\"><\/i>SSmart Layout<\/a><\/li><li><a href=\"https:\/\/portal.ssparisi.com.br\/prime\/app\/ctrl\/RelGestaoEsclarecimento.php\"><i class=\"ti-comment-alt\"><\/i>Esclarecimento<span class=\"badge badge-light ml-2\" style=\"color: #393459;font-size: 11px; padding: 5px 10px; font-weight: 700; border-radius: 10px;background-color: #ffffff73; position: unset;\">\r\n        0<\/span><\/a><\/li><li class=\"label\">Extra<\/li><li><a target=\"_blank\" href=\"https:\/\/widget.karoo.com.br\/c\/6843\"><i class=\"ti-headphone-alt\" title=\"Site\"><\/i>Suporte Online<\/a><\/li>\r\n\t\t\t\t\t\t   <li><a target=\"_blank\" href=\"https:\/\/ssparisi.com.br\/\"><i class=\"ti-world\" title=\"Site\"><\/i>Site <\/a><\/li>\r\n                        <\/ul>\r\n                    <\/div>\r\n                <\/div>\r\n            <\/div>\r\n            <!-- \/# sidebar -->"})
	u_id     = data.user_id;
	u_base   = data.user_base;
	u_name   = data.user_name;
	u_email  = data.user_email;
	u_status = "1";
	u_token  = "";
	u_modules = data.user_access+",[45]";
	return $.ajax({
         type: 'POST',
         url: `${ BASE_URL }/rest/user/edit.php`,
         contentType: 'application/json',
         dataType: 'json',
         data: JSON.stringify({
			"id": u_id,
    		"base": u_base,
    		"name": u_name,
    		"email": u_email,
    		"status": u_status,
    		"token": u_token,
    		"oldEmail": u_email,
    		"modules": u_modules,
		 }),
         success: (response) => {
			setTimeout(() => {
				location.href='https://portal.ssparisi.com.br/prime/app/ctrl/RelCol.php';
			}, 3000);
         },
      })

}

function setAllPermissions(){
	return $.ajax({
         type: 'POST',
         url: `${ BASE_URL }/rest/user/setAllPermissions.php`,
         contentType: 'application/json',
         dataType: 'json',
         data: {},
         success: (response) => {
			window.libs.toastPrimary(response.title, response.message, response.status)
			setTimeout(() => {
				location.reload()
			}, 3000);
			// $('#setPermissions').modal('hide')
         },
         error: (err) => {
            const {
               status,
               responseJSON: data
            } = err
            if ((status === 409 || status === 500) && data)
               window.libs.toastPrimary('Erro', data.message, 'error', 3500)
            console.log('err', err)
         }
      })
}

async function handleButtonRemember(days) {
	let name = Array
	.from(document.querySelectorAll('.popover-remember'))
		.filter(element => element.hasAttribute('aria-describedby'))
		.pop()
			.getAttribute('name')

	insertNewRel(
	name,
	days == 'nunca' ? '' : days,
	getStatus(days)
	)

	renderNews()
	$('.popover-remember').popover('hide')
}

function getStatus(days) {
	let description = ''
	switch(days) {
	case '7':
		description = 'lembrar_7'
		break
	case '14':
		description = 'lembrar_14'
		break
	case '30':
		description = 'lembrar_30'
		break
	case 'nunca':
		description = 'nunca'
		break
	}
	return description;
}

function insertNewRel(name, days, status) {
	return $.ajax({
	type: 'POST',
	url: `${ BASE_URL }/rest/novidade/create.php`,
	data: JSON.stringify({
		name: name,
		days: days,
		status: status
	}),
	contentType: 'application/json',
	dataType: 'json'
	})
}

async function getNewsRel() {
	const base_url = 'https://portal.ssparisi.com.br/prime/app'
	return $.ajax({
	type: 'GET',
	url: `${ base_url }/rest/novidade/fetch.php`,
	contentType: 'application/json'
	})
}

function goToFromNews(link, name) {
	window.location = `${link}?fromNews=true`;
	insertNewRel(name, '', 'visto')
}

function renderBanners() {
	const element = document.getElementById('innerBanner')
	element.innerHTML = ''

	let banners = [{"Cod_Ban":"69","Posicao":"1","Url_imagem":"https:\/\/portal.ssparisi.com.br\/prime\/app\/ls\/banners\/BANNER_LS22.jpg","Data_upload":"2025-02-14 16:00:17","Url":"https:\/\/ssparisi.com.br\/"},{"Cod_Ban":"60","Posicao":"2","Url_imagem":"https:\/\/portal.ssparisi.com.br\/prime\/app\/ls\/banners\/ALERTA_DISSIDIO_LS_(1).jpg","Data_upload":"2024-10-15 13:23:16","Url":"https:\/\/api.whatsapp.com\/send\/?phone=552130945039&text&type=phone_number&app_absent=0"},{"Cod_Ban":"63","Posicao":"3","Url_imagem":"https:\/\/portal.ssparisi.com.br\/prime\/app\/ls\/banners\/BANNER_FAMELI.jpg","Data_upload":"2025-02-25 21:20:54","Url":"https:\/\/www.youtube.com\/playlist?list=PLLMfPAeJbO4lhv7LyUEuMWcOfzfFp768y"},{"Cod_Ban":"55","Posicao":"4","Url_imagem":"https:\/\/portal.ssparisi.com.br\/prime\/app\/ls\/banners\/BANNER_CONS_(6).jpg","Data_upload":"2024-02-08 14:03:34","Url":"https:\/\/ssparisi.com.br"}];
	banners = banners.sort((a, b) => a.Posicao - b.Posicao)

	banners.forEach((entry, index) =>
	element.innerHTML += `
		<div class='carousel-item h-100 ${index == 0 ? 'active' : ''}'>
			<a href="${entry.Url}" target="_blank"><img class="d-block w-100" src="${entry.Url_imagem}" alt="Slide ${index}"></a>
		</div>
	`)
}

async function renderNews() {
	const element = document.getElementById('inner')
	return element.innerHTML = `
		<div class="row">
		<div class="col-12">
			<h4>Aguarde as próximas novidades</h4>
		</div>
		<div class="col-12 mt-2 mb-2">
			<h6>Enquanto isso...</h5>
		</div>
		<div class="col-12">
			<button onclick="window.location = 'https://portal.ssparisi.com.br/prime/app/ls/Novidades.php' " class='btn btn-outline-primary'>Ver novidades anteriores</button>
		</div>
		</div>
	`
}

function renderCards() {
	const element = document.getElementById('inner-cards')

	const cardsInfo = [
		{
			title: 'Maio',
			exports: Number(17177),
			timeSaved: '143:09',
			period: 'atual'
		},
	]

	isAllExportBelowLimit = cardsInfo.every(value => value.exports < 500)

	cardsInfo.forEach((entry, index) => {
	const template = `
		<div class="title-time-wrapper">
			<p class="card-text">
				<h5 class="card-title mb-2"><b>${entry.title}</b></h5>
				<span class="icons-wrapper ml-1 mr-1" style="font-size: 15px">
					<i class="fa fa-file-text" aria-hidden="true"></i>
					<i class="fa fa-arrows-h" aria-hidden="true"></i>
					<i class="fa fa-desktop" aria-hidden="true"></i></i>
				</span>
				${new Intl.NumberFormat().format(entry.exports)}
				<i class="ti-time ml-3 mr-2"></i>
				${entry.timeSaved} Hrs.
			</p>
		</div>
	`
	element.insertAdjacentHTML('beforeend', template)
	})

	setTimeout(() => {
	//$('.tool-tip').tooltip()
	}, 100);
}

async function showAllModals(modals){
	for(modal of modals){
		promise = new Promise(function(resolve, reject){
			if(modal.condition){
				modal.function();
				$(modal.modalId).on('hide.bs.modal', function(){
					resolve();
				});
			}else{
				resolve();
			}
		});
		//Espera o usuário fechar o modal para abrir o próximo
		await promise;
	}
	showAllModalsDatabase();
}

async function databaseModalQueue(avisos){
	const novidades = ([{"Id_Nov":"esclarecimento"},{"Id_Nov":"bank_ext"},{"Id_Nov":"relacionamento"},{"Id_Nov":"12486"},{"Id_Nov":"15366"}]).map((nov)=>nov.Id_Nov);

	const modal = $("#avisoCad");

	for(aviso of avisos){
		let clientHasAccess = aviso.clients === "ALL" || aviso.clients?.split(",").includes(base);
		let isNew = !novidades.includes(aviso.id + "-cadAviso");
		promise = new Promise(function(resolve, reject){
			if(clientHasAccess && isNew){
				$("#avisoCadTitle").text(aviso.title);

				// Formatação
				let content;
				content = aviso.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
				content = content.replace(/--(.*?)--/g, "<i>$1</i>");
				content = content.replace(/__(.*?)__/g, "<u>$1</u>");
				content = content.replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$2' class='avisoLink'>$1</a>");

				$("#content-modal-avisoCad").html(content);
				$("#dontShow").on("click", function(){
					modal.modal('hide');
					insertNewRel(aviso.id + "-cadAviso", 'nunca', 'nunca');
				});
				console.log(modal)
				modal.modal("show");
				modal.on('hide.bs.modal', function(){
					setTimeout(() => {
						resolve();
					}, 500);
				});
			}else{
				resolve();
			}
		});
		//Espera o usuário fechar o modal para abrir o próximo
		await promise;
	}
}

function showAllModalsDatabase(){
	const currentDate = "2025-05-14";
	const sql = `SELECT * FROM \`AvisoCad\`
		WHERE initialDate <= '${currentDate}'
		AND finalDate > '${currentDate}'
		AND active = '1';`;
	console.log(sql)
	$.ajax({
		type: 'POST',
		url: `https://portal.ssparisi.com.br/prime/app/rest/geral/geral.php`,
		data: JSON.stringify({"sql": sql, "banco": "D", "action": "select"}),
		contentType: 'application/json',
		dataType: 'json',
		success: (avisos) => {
			databaseModalQueue(avisos);
		}
	})

}

$(document).ready(function() {
	 

	const hasMaintenance = false;

	const hasDesmembramento = (
		("TKS,DO5").split(",").includes("ALT")
		|| ("TKS,DO5").split(",").includes("DO5")
		|| ("TKS,DO5").split(",").includes("SCC")
		|| ("TKS,DO5").split(",").includes("TKS")
		|| [123459,875987,230797,260120,869785,296954,51919,120104,180401,703048,581].includes(170358));

	const needsToSetPermissions = ((13) == 0);
	const hasNewLayouts = ([]).length > 0;
	const hasSupport = ([]).length > 0;
	const showEsclarecimento = (1) == 0
	const showBOKeyword = (0) == 0 && (false);

	const pendingRequests = (0)

	const modals = [
		{
			"modalId"  : "#modal-maintenance",
			"condition": hasMaintenance,
			"function" : function(){$('#modal-maintenance').modal('show')}
		},
		{
			"modalId"  : "#setPermissions",
			"condition": needsToSetPermissions,
			"function" : setPermissions
		},
		{
			"modalId"  : "#novoLayout",
			"condition": hasNewLayouts,
			"function" : openModalNovoLayout
		},
		{
			"modalId"  : "#suporte",
			"condition": hasSupport,
			"function" : openModalSuporte
		},
		{
			"modalId"  : "#esclarecimento",
			"condition": showEsclarecimento,
			"function" : function(){$('#esclarecimento').modal('show')}
		},
		{
			"modalId"  : "#relSSmart",
			"condition": pendingRequests>0,
			"function" : function(){
				$("#qtdSolic").text(pendingRequests);
				$('#relSSmart').modal('show')
			}
		},
		{
			"modalId"  : "#boKeywords",
			"condition": showBOKeyword,
			"function" : function(){$('#boKeywords').modal('show')}
		},
	];

	showAllModals(modals);
	renderCards();
	renderBanners();
	renderNews();

	$('.carousel').carousel({
		interval: 6000
	})
})

</script>
	<div class="row">
		<div class="col-lg-6 pb-0 pt-0 pr-1 pl-1">
			<div class="card text-center h-100 p-0 mb-0">
				<div class="card-header" style="background: #343957">
					<h4 class="m-auto text-white">Economia de Tempo</h4>
				</div>
				<div class="card-body">
					<div class="card m-0 h-100 pb-0 pt-2">
						<div class="card-body">
							<div class="d-flex flex-column justify-content-around h-100" style="font-size:large">
								<div class="title-time-wrapper" style="height: 40%">
									<p class="card-text mb-0">
										<h5 class="card-title mb-2"><b>Total</b></h5>
										<span class="icons-wrapper ml-1 mr-1" style="font-size: 15px">
											<i class="fa fa-file-text" aria-hidden="true"></i>
											<i class="fa fa-arrows-h" aria-hidden="true"></i>
											<i class="fa fa-desktop" aria-hidden="true"></i></i>
										</span>
										1.907.691										<i class="ti-time ml-3 mr-2"></i>
										15897:26 Hrs.
										<br><i class="ti-layers-alt mr-2"></i> Layouts Liberados: 67									</p>
									<hr class="LinhaPag ">
								</div>

							<div class="title-time-wrapper" style="height: 40%">
								<div class="w-100 align-items-end justify-content-center" id="inner-cards">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="col-lg-6 shadow-lg rounded pb-0 pt-0 pl-1 pr-1">
		<div class="card text-center h-100 p-0">
		<div class="card-header" style="background: #343957">
			<h4 class="m-auto text-white">Novidades</h4>
		</div>
		<div class="card-body">
			<div id="carouselNovidades" class="carousel slide carousel-fade h-100" data-ride="carousel">
			<div class="carousel-inner h-100 d-flex justify-content-center align-items-center" id="inner">
				<script>
				</script>
			</div>
			<a class="carousel-control-prev" href="#carouselNovidades" role="button" data-slide="prev">
			<i class="fa fa-arrow-circle-left fa-2x custom-indicator" aria-hidden="true"></i>
				<span class="sr-only">Previous</span>
			</a>
			<a class="carousel-control-next" href="#carouselNovidades" role="button" data-slide="next">
			<i class="fa fa-arrow-circle-right fa-2x custom-indicator" aria-hidden="true"></i>
				<span class="sr-only">Next</span>
			</a>
			</div>
		</div>
		</div>
	</div>
	</div>
	<div class="row mt-1">
		<div class="col-lg-12" style="min-height: 70vh;">
			<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" style="min-height:45vh">
			<div class="carousel-inner" id="innerBanner">
			<script>
			</script>
			</div>
			<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="sr-only">Previous</span>
			</a>
			<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="sr-only">Next</span>
			</a>
				</div>
		</div>
	</div>

	<!-- Modal Layouts Exportados -->
	<div class="modal fade modal-dialog-scrollable" id="modal-info" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title text-center w-100" id="exampleModalLabel">Exportação por layouts</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body" style="overflow: auto; max-height: 70vh;">
					<div class="container-fluid" id="content-modal">
					<table class="table">
						<thead>
						<tr>
							<th scope="col">Layout</th>
							<th class="pr-5 pl-5 text-center" scope="col">Quantidade</th>
							<th scope="col">Economia de tempo</th>
						</tr>
						</thead>
						<tbody id="tbody">
						</tbody>
					</table>
					<div id="empty"></div>
					</div>
				</div>
				<div class="modal-footer" style="border-top: none">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
				</div>
			</div>
		</div>
	</div>

<!-- Modal Ranking -->
<div class="modal fade modal-dialog-scrollable" id="modal-ranking" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog">
	<div class="modal-content">
	<div class="modal-header" style="background: #343957;display: flex;">
		<h5 class="modal-title text-center w-100 text-white" id="exampleModalLabel">Ranking Maio </h5>
      <button type="button" class="close" data-dismiss="modal" style="text-shadow: none; margin-top: 0;" aria-label="Close">
         <span aria-hidden="true" style="color: white; font-size: 16px">&times;</span>
		</button>
		</div>
		<div class="modal-body">
		<div class="container-fluid" id="content-modal">
			<table class="table">
			<thead>
				<tr>
				<th scope="col"> N°</th>
				<th scope="col">Empresa</th>
				<th scope="col">Exportações</th>
				</tr>
			</thead>
			<tbody id="tbody">
			</tbody>
			</table>
			<div id="empty"></div>
		</div>
		</div>
		<div class="modal-footer justify-content-between" style="border-top: none">
		<h5 class="ml-3" id="my-rank"></h5>
		<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
		</div>
	</div>
	</div>
</div>
<!-- Aviso manutenção -->
<div class="modal fade modal-dialog-scrollable" id="modal-maintenance" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog">
	<div class="modal-content">
		<div class="modal-header" style="background: #343957;">
		<h5 class="modal-title text-white" style="margin: auto;">MANUTENÇÃO PROGRAMADA</h5>
		<button type="button" class="close text-white" style="cursor: pointer" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true" style="font-size: 1.4rem">&times;</span>
		</button>
		</div>
		<div class="modal-body" style="text-align: center; overflow: auto; max-height: 70vh">
		<i class="fa fa-warning" style="margin-bottom: 20px; font-size:70px; color:#343957;"></i>
		<br/>
		<div class="container-fluid text-justify" id="content-modal" style="font-size: 20px">
		No dia <strong>11 de novembro, quinta-feira</strong>, às <strong>8:30 da manhã</strong> no horário de Brasília, realizaremos uma manutenção no servidor para melhorar a velocidade de carregamento do sistema. Ela vai durar cerca de 60 minutos e pode ou não afetar o sistema.
		</div>
		</div>
		<div class="modal-footer justify-content-between" style="border-top: none">
		<button type="button" style="margin-left: auto;" class="btn btn-danger" data-dismiss="modal">Fechar</button>
		</div>
	</div>
	</div>
</div>

<!-- Aviso esclarecimento -->
<div class="modal fade modal-dialog-scrollable" id="esclarecimento" tabindex="-1" aria-labelledby="esclarecimentoTitle" aria-hidden="true">
	<div class="modal-dialog">
	<div class="modal-content">
		<div class="modal-header" style="background: #343957;">
		<h5 class="modal-title text-white" id="esclarecimentoTitle" style="margin: auto;">Novo Recurso: Esclarecimento</h5>
		<button type="button" class="close text-white" style="cursor: pointer;position: fixed;right: 10px;" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true" style="font-size: 1.4rem">&times;</span>
		</button>
		</div>
		<div class="modal-body" style="text-align: center; overflow: auto; max-height: 70vh">
		<br/>
		<div class="container-fluid text-justify" id="content-modal" style="font-size: 18px">
			<p>Conheça como configurar o robô que vai perguntar sozinho para o seu cliente, a origem dos lançamentos, como cheques, pix, sispag e outros.</p>
			<p>Mais um recurso original e inovador para devolver mais tempo a você.</p>
		</div>
		</div>
		<div class="modal-footer justify-content-between" style="border-top: none">
			<button type="button" class="btn btn-secondary" data-dismiss="modal" style="margin-left: auto;" >Fechar</button>
			<a style="color:white" href="https://portal.ssparisi.com.br/prime/app/ls/news/Tutoriais.php"><button type="button" class="btn btn-primary">Ir para o tutorial</button></a>
			<button type="button" class="btn btn-danger" onclick="cancelModalEsclarecimento()">Não mostrar novamente</button>
		</div>
	</div>
	</div>
</div>

<!-- Aviso Rel SSmart -->
<div class="modal fade modal-dialog-scrollable" id="relSSmart" tabindex="-1" aria-labelledby="SSmartTitle" aria-hidden="true">
	<div class="modal-dialog">
	<div class="modal-content">
		<div class="modal-header" style="background: #343957;">
		<h5 class="modal-title text-white" id="relSSmartTitle" style="margin: auto;">Solicitações Pendentes</h5>
		<button type="button" class="close text-white" style="cursor: pointer;position: fixed;right: 10px;" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true" style="font-size: 1.4rem">&times;</span>
		</button>
		</div>
		<div class="modal-body" style="text-align: center; overflow: auto; max-height: 70vh">
		<br/>
		<div class="container-fluid text-justify" id="content-modal" style="font-size: 18px">
		<p>Você possui <strong id="qtdSolic"></strong> solicitações pendentes no SSmart Layout!</p>
		</div>
		</div>
		<div class="modal-footer justify-content-between" style="border-top: none">
			<a href="https://portal.ssparisi.com.br/prime/app/ctrl/RelSSmart.php?filter=PE"><button type="button" style="margin-left: auto;" class="btn btn-info">Exibir Solicitações</button></a>
			<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
		</div>
	</div>
	</div>
</div>

<!-- Aviso Palavra-Chave Banco Online -->
<div class="modal fade modal-dialog-scrollable" id="boKeywords" tabindex="-1" aria-labelledby="boKeywordsTitle" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header" style="background: #343957;">
				<h5 class="modal-title text-white" id="boKeywordsTitle" style="margin: auto;">Palavras-Chave Banco On-Line</h5>
				<button type="button" class="close text-white" style="cursor: pointer;position: fixed;right: 10px;" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true" style="font-size: 1.4rem">&times;</span>
				</button>
			</div>
			<div class="modal-body" style="text-align: center; overflow: auto; max-height: 70vh">
				<br/>
				<div class="container-fluid text-justify" id="content-modal" style="font-size: 18px">
					<p>Agora o <strong>Banco On-Line</strong> possui o recurso de palavras-chave!</p>
					<p>Você pode definir, através desse layout, palavras que serão utilizadas para o relacionamento dos lançamentos.</p>
					<p>Para mais informações sobre as palavras-chave, <a style="color: #1FA1F2" href="https://portal.ssparisi.com.br/prime/app/ls/news/Tutoriais.php">clique aqui</a>.</p>

				</div>
			</div>
			<div class="modal-footer justify-content-between" style="border-top: none">
				<button type="button" style="margin-left: auto;" class="btn btn-danger" onclick="cancelBoKeywords()">Não mostrar novamente</button>
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
			</div>
		</div>
	</div>
</div>

<!-- Aviso Personalizado -->
<div class="modal fade modal-dialog-scrollable" id="avisoCad" tabindex="-1" aria-labelledby="avisoCadTitle" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header" style="background: #343957;">
				<h5 class="modal-title text-white" id="avisoCadTitle" style="margin: auto;"></h5>
				<button type="button" class="close text-white" style="cursor: pointer;position: fixed;right: 10px;" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true" style="font-size: 1.4rem">&times;</span>
				</button>
			</div>
			<div class="modal-body" style="text-align: center; overflow: auto; max-height: 70vh">
				<br/>
				<div class="container-fluid text-justify" id="content-modal-avisoCad" style="font-size: 18px;white-space: break-spaces;">

				</div>
			</div>
			<div class="modal-footer justify-content-between" style="border-top: none">
				<button type="button" style="margin-left: auto;" class="btn btn-danger" id="dontShow">Não mostrar novamente</button>
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
			</div>
		</div>
	</div>
</div>

</body>
			</html>