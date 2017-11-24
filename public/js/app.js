$(function() {
    // var a = 5;
    // console.log(a);

    observe('hello', function () {
        console.log('Hey!');
    });
});

$(function () {
    observe('hello', function () {
        console.log('Hey!');
    });
});