function AuditoriaCards({
    id,
    auditorias,
    onOpenCard,
    mode
}) {
    this.id = id
    this.auditorias = auditorias
    this.mode = mode
    this.onOpenCard = onOpenCard
    window.controllers.AuditoriaCards = this
}
AuditoriaCards.prototype.renderEditButtons = function(auditoria, color) {
    return `
      <div
         class="speed-dial cursor-pointer absolute -bottom-1 -right-4"
         style="position: absolute"
      >
         <button
            type="button"
            class="speed-dial__button--root rounded-full px-3 py-1"
            style="color: ${ color }"
         >
            <svg
                  class="icon icon__plus w-6 h-6 align-middle"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
         </button>
         <div class="speed-dial__action" data-direction="left" data-title="left">
         ${
            this.mode === 'edit'
               ?
               `
                  <div class="speed-dial__item" style="transition-delay: 300ms;">
                     <button
                        type="button"
                        onclick="event.stopPropagation(); onDeleteAuditoria('${ auditoria.Cad_Emp }')"
                        class="speed-dial__button--small shadow-xl rounded-full bg-gray-100 text-yellow-700 hover:text-yellow-700 hover:bg-yellow-100"
                        title="Remover"
                     >
                        <svg title="Processar" class="icon w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                     </button>
                  </div>
                  <div class="speed-dial__item" style="transition-delay: 150ms;">
                     <button
                        type="button"
                        onclick="event.stopPropagation(); onEditAuditoria('${ auditoria.Cad_Emp }')"
                        class="speed-dial__button--small shadow-xl rounded-full bg-gray-100 text-blue-800 hover:text-blue-800 hover:bg-blue-100"
                        title="Editar"
                     >
                        <svg title="Ver fórmulas" class="icon w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                        </svg>
                     </button>
                  </div>
               `
               : `
                  <div class="speed-dial__item" style="transition-delay: 75ms;">
                     <button
                        type="button"
                        onclick="event.stopPropagation(); onProcessaAuditoria('${ auditoria.Cad_Emp }')"
                        class="speed-dial__button--small shadow-xl rounded-full bg-gray-100 text-blue-800 hover:text-blue-800 hover:bg-blue-100"
                        title="Processar"
                        style="color: ${ color }"
                     >
                        <svg title="Processar" class="icon w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                        </svg>
                     </button>
                  </div>
               `
         }
         </div>
      </div>
   `
}
AuditoriaCards.prototype.renderCards = function({
    idCards: id,
    auditorias
}) {
    const element = document.getElementById(id)
    element.innerHTML =
        auditorias.reduce((html, auditoria) => {
            const color = getRandomColor()
            return html +
                `
               <div
                  onclick="window.controllers.AuditoriaCards.onOpenCard('${ auditoria.Cad_Emp }')"
                  class="p-3 m-3 text-center cursor-pointer transform duration-300 hover:-translate-y-2 rounded shadow shadow-lg h-44 w-64" style="border-top: 4px solid ${ color }"
                  title="${ this.mode === 'edit' ? 'Ver fórmulas' : 'Processar arquivo' }"
               >
                  <div class="flex flex-col relative w-full h-full">
                     <span title="${ auditoria.Empresa }" class="text-lg tracking-wide font-bold mx-auto">${ auditoria.Empresa.slice(0, 36) }${ auditoria.Empresa.length > 36 ? '...' : '' }</span>
                     <span class="absolute inset-y-1/2 w-full mx-auto tracking-wider font-medium uppercase -mt-4">
                        <p class="text-4xl">${ auditoria.formulas.length }</p>
                        fórmulas
                     </span>
                     ${
                        this.renderEditButtons(auditoria, color)
                     }
                  </div>
               </div>
            `
        }, '')
}
AuditoriaCards.createCards = function(idParent) {
    document.getElementById(idParent).innerHTML = ''
    const id = `${ idParent }-list`
    const element = document.createElement('div')
    element.id = id
    element.classList.add('flex', 'flex-wrap', 'space-x-4', 'space-y-3', 'text-center', 'justify-content-center')
    return {
        id,
        element
    }
}
AuditoriaCards.prototype.render = function() {
    const element = document.getElementById(this.id)
    const {
        id: idCards,
        element: cardsContainer
    } = AuditoriaCards.createCards(this.id)
    element.appendChild(cardsContainer)
    this.renderCards({
        idCards,
        auditorias: this.auditorias
    })
    setTimeout(() => this.afterRender({
        idCards,
        auditorias: this.auditorias
    }), 1)
}
AuditoriaCards.prototype.afterRender = function({
    idCards,
    auditorias
}) {
    const inputAuditoria = document.getElementById('search-for')
    const iSearchEmpresa = document.getElementById('i-search-for')

    const procurarEmpresa = () => {
        const query = (inputAuditoria.value || '').trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
        const auditoriasFiltered = auditorias.filter(({
            Empresa
        }) => Empresa.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(query))
        this.renderCards({
            idCards,
            auditorias: auditoriasFiltered
        })
    }

    inputAuditoria.onkeyup = window.utils.debounce(() => procurarEmpresa(), 300)
    iSearchEmpresa.onclick = procurarEmpresa
}
window.components = Object.assign(window.components || {}, {
    AuditoriaCards
})