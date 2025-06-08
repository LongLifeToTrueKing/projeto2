function Loader() {}

/**
 *
 * @param { number } circles - Quantidade de círculos
 * @param { boolean } allowOverflow - Indica se o loader irá travar o scroll
 * @param { number } base - Tamanho do loader [ Default: 0.6 ]
 * @param { boolean } overlay - Adiciona um overlay no background
 */
Loader.startLoading = function({
    circles = 3,
    allowOverflow = false,
    base = 0.6,
    overlay = true,
    type = 'squares'
} = {}) {

    const alreadyExists = document.getElementById("loader-div")
    if (alreadyExists) return

    const body = document.getElementsByTagName('body')[0]
    const head = document.getElementsByTagName('head')[0]

    const styleElement = document.createElement('link')
    styleElement.rel = 'stylesheet'
    styleElement.type = 'text/css'
    styleElement.href = 'https://portal.ssparisi.com.br/prime/css/jquery-loading.css?version=1.0.33'

    const scriptElement = document.createElement('script')
    scriptElement.src = 'https://portal.ssparisi.com.br/prime/js/jquery-loading.js'
    scriptElement.async = true

    head.appendChild(styleElement)
    head.appendChild(scriptElement)

    return new Promise((resolve) => {
        scriptElement.onload = () => {
            if (allowOverflow === false) {
                body.style.overflow = 'hidden'
            }

            const extraOptions = Loader.getOptions(type)
            const div = document.createElement('div')
            div.id = 'loader-div'
            div.className = 'card card-inverse text-xs-center'
            body.insertBefore(div, body.firstChild)
            $(div).loading({
                circles,
                overlay,
                base,
                ...extraOptions
            });
            setTimeout(() => resolve(true), 300);
        }
    })
}

Loader.stopLoading = function() {
    const body = document.getElementsByTagName('body')[0]
    body.style.overflow = 'auto'
    const scriptElem = Loader.getElementByTag('js')
    const styleElem = Loader.getElementByTag('css')
    scriptElem ? .remove()
    styleElem ? .remove()
    document.getElementById("loader-div") ? .remove()
}

/**
 *
 * @param { string } type  Tipo indicador loader ['squares', 'default da lib' ]
 * @returns { Object }  Opções do loader
 */
Loader.getOptions = function(typeLoader) {
    switch (typeLoader) {
        case 'squares':
            return ({
                indicatorHtml: `
               <div class="loader-square">
                  <div class="css-square square1"></div>
                  <div class="css-square square2"></div>
                  <div class="css-square square3"></div>
                  <div class="css-square square4"></div>
                  <div class="css-square square5"></div>
                  <div class="css-square square6"></div>
                  <div class="css-square square7"></div>
                  <div class="css-square square8"></div>
               </div>
            `,
                left: '45%',
                top: '0'
            })
        case 'squaresTop':
            return ({
                indicatorHtml: `
               <div class="loader-square">
                  <div class="css-square square1"></div>
                  <div class="css-square square2"></div>
                  <div class="css-square square3"></div>
                  <div class="css-square square4"></div>
                  <div class="css-square square5"></div>
                  <div class="css-square square6"></div>
                  <div class="css-square square7"></div>
                  <div class="css-square square8"></div>
               </div>
            `,
                left: '45%',
                top: '-45%'
            })


        default:
            return {}
    }
}

Loader.getElementByTag = function(type) {
    const head = document.getElementsByTagName('head')[0]
    return Array.from(head.getElementsByTagName(`${type === 'js' ? 'script' : 'link'}`))
        .filter(tag => tag[type === 'js' ? 'src' : 'href'].includes(`jquery-loading.${type}`)).pop()
}