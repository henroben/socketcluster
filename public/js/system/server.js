$(function() {
    var socket = socketCluster.connect();

    // socket.on('connect', function() {
    //     console.log(socket);
    //
    //     // send data to server
    //     socket.emit('messages', {
    //         id: 1,
    //         name: 'ben'
    //     });
    // });

    observe('server', function (data) {
        // observing server notify by build-users in users.js
        // emits msg to ws sever
        socket.emit('messages', data);
    });

    socket.on('response', function (data) {
        // console.log(data);
        // When response comes back from Users model, notify will contain the channel to send to
        notify(data.notify, data);
    });
});