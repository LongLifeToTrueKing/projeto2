function Tutorial() {}

Tutorial.initializeTutorial = function(tutorialOptions) {
    const {
        id = '',
            steps = [],
            precondition = false,
            onClickOutside,
            onDone = function() {},
            allowSave = true,
            allowBackButton = false,
            preventClose = false,
            cancelButton = {},
            nextTutorials = []
    } = tutorialOptions

    let onCloseAnno = function() {}

    if (!steps.length || !id) return

    if (!precondition)
        return nextTutorials.length && nextTutorials[0](nextTutorials.slice(1))

    steps.forEach((step, index) => {
        step.buttons = [].concat(step.buttons)
        isLastStep = index == steps.length - 1
        const onShow = step.onShow || function() {}

        if (index == 0) { // Primeiro step
            if (cancelButton && cancelButton.allow)
                step.buttons.push(getCancelButton(cancelButton.handler))
        } else {
            if (allowBackButton)
                step.buttons.push(AnnoButton.BackButton)
        }

        step.buttons = step.buttons.reverse()

        step.onShow = function(anno, target, annoElem) {
            onShow(anno, target, annoElem)
            preventClose && preventCloseOutside()
            onClickOutside && registerEventClickOutside(onClickOutside)
        }

        if (isLastStep) {
            step.buttons.push({
                text: 'Finalizar',
                click: function(anno, evt) {
                    anno.hide()
                    onDone()
                    if (allowSave)
                        Tutorial.saveTutorial(id)
                }
            })
            step.buttons = step.buttons.filter(btn => !!btn)
        }
    })

    if (nextTutorials.length)
        onCloseAnno = () => nextTutorials[0](nextTutorials.slice(1))

    return new Anno(steps, {
        onCloseAnno
    }).show()
}

Tutorial.saveTutorial = function(id) {
    return $.ajax({
        type: 'POST',
        url: `${ BASE_URL }/rest/tutorial/create.php`,
        data: JSON.stringify({
            name: id
        }),
        contentType: 'application/json',
        dataType: 'json'
    })
}

function getCancelButton(fn) {
    return {
        text: 'Não desejo ver mais',
        className: 'anno-btn-rel-cancel',
        click: function(anno, evt) {
            anno.hide()
            isFunction(fn) && fn()
        }
    }
}

function registerEventClickOutside(fn) {
    return $('.anno-overlay').on('click', () => {
        isFunction(fn) && fn()
    })
}

function preventCloseOutside() {
    return $('.anno-overlay').off('click')
}

function isFunction(fn) {
    return typeof fn === 'function'
}