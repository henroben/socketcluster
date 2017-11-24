$(function () {

    observe('bind', function () {

    });

});

$(document).ready(function () {
    // notify bind, which will call func in startup
    notify('bind');
});