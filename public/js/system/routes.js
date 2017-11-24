$(function () {
    observe('bind', function () {

        function routerMiddleware() {
            notify('start-loading');
            $('section').hide();
            // get 2nd item from url after hash #/item
            var hash = window.location.hash.slice(2);
            if(isNaN(hash[hash.length-1])) {
                // $('section[data-route="'+hash+'"]').show();
                // setTimeout(function () {
                //     notify('finish-loading');
                // }, 200);
                // notify('finish-loading');

                // send a notify for the hash and have observing function show the correct page
                notify('build-' + hash);

            } else {
                // must be an edit, so use function below
            }
        }

        // Route functions
        var dashboard = function () {
            // $('section').hide();
            // $('section[data-route="dashboard"]').show();
        };
        var about = function () {
            // $('section').hide();
            // $('section[data-route="about"]').show();
        };

        var routes = {
            '/dashboard': dashboard,
            '/about': about
        };

        var router = Router(routes);

        router.configure({
            on: routerMiddleware
        });

        router.init();
    });
    
    observe('start-loading', function () {
        $('.whole-page').hide();
        $('.loading-page').show();
    });

    observe('finish-loading', function () {
        $('.loading-page').hide();
        $('.whole-page').show();
    });
    
});