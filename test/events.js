
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

exports['on create simple property'] = function (test) {
    test.async();
    
    var model = rkmodel();
    
    model.on('create', 'name', function (value) {
        test.equal(value, 'Adam');
        test.done();
    });
    
    model.set('name', 'Adam');
};

exports['on create simple property using dot notation'] = function (test) {
    test.async();
    
    var model = rkmodel();
    
    model.on('create', 'persons.adam.name', function (value) {
        test.equal(value, 'Adam');
        test.done();
    });
    
    model.set('persons.adam.name', 'Adam');
};

exports['on remove simple property'] = function (test) {
    test.async();
    
    var model = rkmodel();
    
    model.on('remove', 'name', function (value) {
        test.equal(value, 'Adam');
        test.done();
    });
    
    model.set('name', 'Adam');
    model.remove('name');
};

exports['on remove simple property using dot notation'] = function (test) {
    test.async();
    
    var model = rkmodel();
    
    model.on('remove', 'persons.adam.name', function (value) {
        test.equal(value, 'Adam');
        test.done();
    });
    
    model.set('persons.adam.name', 'Adam');
    model.remove('persons.adam.name');
};

exports['on add item to array'] = function (test) {
    test.async();
    
    var model = rkmodel();
    
    var count = 0;
    
    model.on('addi', 'values', function (item) {
        count += item;
        
        if (count == 6)
            test.done();
    });
    
    model.add('values', 1);
    model.add('values', 2);
    model.add('values', 3);
};

exports['on add item to array using dot notation'] = function (test) {
    test.async();
    
    var model = rkmodel();
    
    var count = 0;
    
    model.on('addi', 'magnitude.values', function (item) {
        count += item;
        
        if (count == 6)
            test.done();
    });
    
    model.add('magnitude.values', 1);
    model.add('magnitude.values', 2);
    model.add('magnitude.values', 3);
};

exports['on extract item from array'] = function (test) {
    test.async();
    
    var model = rkmodel();
    
    var count = 0;
    
    model.on('extracti', 'values', function (item) {
        test.equal(item, 2);
        test.done();
    });
    
    model.add('values', 1);
    model.add('values', 2);
    model.add('values', 3);
    
    model.extract('values', 1);
};

exports['on extract item from array using dot notation'] = function (test) {
    test.async();
    
    var model = rkmodel();
    
    var count = 0;
    
    model.on('extracti', 'magnitude.values', function (item) {
        test.equal(item, 2);
        test.done();
    });
    
    model.add('magnitude.values', 1);
    model.add('magnitude.values', 2);
    model.add('magnitude.values', 3);

    model.extract('magnitude.values', 1);
};

