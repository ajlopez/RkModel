
var rkmodel = require('..');

exports['on set simple property'] = function (test) {
    test.async();
    
    var model = rkmodel();
    
    model.on('set', 'name', function (newvalue, oldvalue) {
        test.equal(newvalue, 'Adam');
        test.equal(oldvalue, undefined);
        test.done();
    });
    
    model.set('name', 'Adam');
};