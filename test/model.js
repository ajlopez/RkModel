
var rkmodel = require('..');

exports['create model'] = function (test) {
    var model = rkmodel();
    
    test.ok(model);
    test.equal(typeof model, 'object');
}

exports['set and get simple property'] = function (test) {
    var model = rkmodel();
    
    model.set('name', 'Adam');

    test.equal(model.get('name'), 'Adam');
}

