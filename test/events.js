
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

exports['on set nested property property using dot notation'] = function (test) {
    test.async();
    
    var model = rkmodel();
    
    model.on('set', 'persons.adam.name', function (newvalue, oldvalue) {
        test.equal(newvalue, 'Adam');
        test.equal(oldvalue, undefined);
        test.done();
    });
    
    model.set('persons.adam.name', 'Adam');
};

exports['on set simple property two listeners'] = function (test) {
    test.async();
    
    var model = rkmodel();
    
    var count = 0;
    
    model.on('set', 'name', function (newvalue, oldvalue) {
        test.equal(newvalue, 'Adam');
        test.equal(oldvalue, undefined);
        count++;
    });
    
    model.on('set', 'name', function (newvalue, oldvalue) {
        test.equal(newvalue, 'Adam');
        test.equal(oldvalue, undefined);
        count++;
        test.equal(count, 2);
        test.done();
    });
    
    model.set('name', 'Adam');
};

exports['set simple property twice'] = function (test) {
    test.async();
    
    var model = rkmodel();
    var count = 0;
    
    model.on('set', 'name', function (newvalue, oldvalue) {
        if (newvalue === 'Adam') {
            test.equal(newvalue, 'Adam');
            test.equal(oldvalue, undefined);
        }
        else {
            test.equal(newvalue, 'Eve');
            test.equal(oldvalue, 'Adam');
        }
        
        count++;
        
        if (count === 2)
            test.done();
    });
    
    model.set('name', 'Adam');
    model.set('name', 'Eve');
};