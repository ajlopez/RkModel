
var rkmodel = require('..');

exports['create model'] = function (test) {
    var model = rkmodel();
    
    test.ok(model);
    test.equal(typeof model, 'object');
}

