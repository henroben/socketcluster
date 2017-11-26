var Users = {};

Users.index = function (client, data) {
    var results = {
        success: 0,
        message: 'Failed to get user',
        notify: 'users-index'
    };
    function finish() {
        client.emit('response', results);
    }

    // Querry db etc. for user
    // Use static data for now
    results.data = [
        {
            id: 1,
            name: 'Ben'
        },
        {
            id: 2,
            name: 'Nuno'
        },
        {
            id: 3,
            name: 'Charlotte'
        }
    ];

    finish();
};

module.exports = Users;