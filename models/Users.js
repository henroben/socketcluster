var Users = {};
var async = require('async');

Users.index = function (client, pool, data) {
    var results = {
        success: 0,
        message: 'Failed to get user',
        notify: 'users-index'
    };
    function finish() {
        console.log('finish called', results);
        client.emit('response', results);
    }

    async.series([
        function (callback) {
            var getAllUsers = 'SELECT * FROM users';
            pool.query(getAllUsers, function (err, rows) {
                if(err) {
                    console.log(err);
                    console.log('Failed to get users');
                } else {
                    console.log(rows);
                    results.users = rows;
                }
                callback();
            });
        }
    ], finish);

    // Querry db etc. for user
    // Use static data for now
    // results.data = [
    //     {
    //         id: 1,
    //         name: 'Ben'
    //     },
    //     {
    //         id: 2,
    //         name: 'Nuno'
    //     },
    //     {
    //         id: 3,
    //         name: 'Charlotte'
    //     }
    // ];

    // finish();
};

module.exports = Users;