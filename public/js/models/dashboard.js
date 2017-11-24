$(function () {
    observe('bind', function () {

    });
    observe('start', function () {

    });
    observe('build-dashboard', function () {
        $('section[data-route="dashboard"]').show();
        setTimeout(function () {
            notify('finish-loading');
        }, 200);
    });
});