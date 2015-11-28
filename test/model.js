
var rkmodel = require('..');

exports['create model'] = function (test) {
    var model = rkmodel();
    
    test.ok(model);
    test.equal(typeof model, 'object');
}

exports['has on undefined property'] = function (test) {
    var model = rkmodel();

    test.strictEqual(model.has('name'), false);
    test.strictEqual(model.has('age'), false);
}

exports['has defined property'] = function (test) {
    var model = rkmodel();
    
    model.set('name', 'Adam');

    test.strictEqual(model.has('name'), true);
    test.strictEqual(model.has('age'), false);
}

exports['set and get simple property'] = function (test) {
    var model = rkmodel();
    
    model.set('name', 'Adam');

    test.equal(model.get('name'), 'Adam');
}

exports['set and get nested simple property'] = function (test) {
    var model = rkmodel();
    
    model.get('adam').set('name', 'Adam');

    test.equal(model.get('adam').get('name'), 'Adam');
}

exports['load object'] = function (test) {
    var model = rkmodel();
    
    model.loadObject({ persons: {
            adam: { name: 'Adam', age: 800 },
            eve: { name: 'Eve', age: 700 }
        }
    });
    
    test.equal(model.get('persons').get('adam').get('name'), 'Adam');
    test.equal(model.get('persons').get('adam').get('age'), 800);
    test.equal(model.get('persons').get('eve').get('name'), 'Eve');
    test.equal(model.get('persons').get('eve').get('age'), 700);
}


