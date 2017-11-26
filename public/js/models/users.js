$(function () {

    var display = {};

    observe('bind', function () {
        display.tbody = $('#users-table');
    });
    observe('start', function () {

    });
    observe('build-users', function () {
        // observing build-users route created in route middleware
        // then notifies server.js
        notify('server', {
            route: 'Users',
            resource: 'index'
        });
    });
    observe('users-index', function (data) {
        console.log('data', data.users);
        var users = data.users;
        display.tbody.empty().html(templatizer["users"]({
            users:users
        }));

        $('section[data-route="users"]').show();
        setTimeout(function () {
            notify('finish-loading');
        }, 200);
    });
});