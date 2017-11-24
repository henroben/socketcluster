$(function () {
    observe('bind', function () {
        console.log('bind called');
        var routes = {
            '/dashboard': function () {
                console.log('dashboard');
                $('section').hide();
                $('section[data-route="dashboard"]').show();
            },
            '/about': function () {
                $('section').hide();
                $('section[data-route="about"]').show();
            }
        };
        var router = Router(routes);

        router.init();
    });
});