function toastPrimary(title, message, type = 'success', timeOut = 3500) {
    toastr[type](message, title, {
        "positionClass": "toast-top-right",
        timeOut,
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "tapToDismiss": false
    })
};

function toastBuilder(toastOptions) {
    const {
        type = 'success',
            message,
            title,
            position = 'toast-top-right',
            closeButton = true,
            debug = false,
            newestOnTop = true,
            progressBar = true,
            preventDuplicates = true,
            onclick = function() {},
            showDuration = '300',
            hideDuration = '1000',
            extendedTimeOut = '1000',
            showEasing = 'swing',
            hideEasing = 'linear',
            showMethod = 'fadeIn',
            hideMethod = 'fadeOut',
            tapToDismiss = false,
            timeout = '3500'
    } = toastOptions

    message && toastr[type](message, title, {
        positionClass: position,
        timeOut: timeout,
        closeButton,
        debug,
        newestOnTop,
        progressBar,
        preventDuplicates,
        onclick,
        showDuration,
        hideDuration,
        extendedTimeOut,
        showEasing,
        hideEasing,
        showMethod,
        hideMethod,
        tapToDismiss
    })

    if (position === 'toast-top-center') {
        $('#toast-container').css('margin-top', '1%')
    }
};

window.libs = Object.assign(window.libs || {}, {
    toastPrimary
})