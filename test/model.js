
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

exports['has defined property using dot notation'] = function (test) {
    var model = rkmodel();
    
    model.set('persons.adam.name', 'Adam');

    test.strictEqual(model.has('persons.adam.name'), true);
    test.strictEqual(model.has('persons.adam.age'), false);
}

exports['remove defined property'] = function (test) {
    var model = rkmodel();
    
    model.set('name', 'Adam');
    model.remove('name');

    test.strictEqual(model.has('name'), false);
}

exports['remove defined property using dot notation'] = function (test) {
    var model = rkmodel();
    
    model.set('persons.adam.name', 'Adam');
    model.remove('persons.adam.name');

    test.strictEqual(model.has('persons.adam.name'), false);
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

exports['set and get nested simple property using dot notation'] = function (test) {
    var model = rkmodel();
    
    model.set('persons.adam.name', 'Adam');
    test.equal(model.get('persons.adam.name'), 'Adam');
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

exports['to object'] = function (test) {
    var model = rkmodel();

    var obj = { persons: {
            adam: { name: 'Adam', age: 800 },
            eve: { name: 'Eve', age: 700 }
        }
    };
    
    model.loadObject(obj);
    
    var result = model.toObject();
    
    test.deepEqual(result, obj);
}

exports['add items to array'] = function (test) {
    var model = rkmodel();
    
    model.add('values', 1);
    model.add('values', 2);
    model.add('values', 3);
    
    var result = model.get('values');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 3);
    test.deepEqual(result, [ 1, 2, 3 ]);
}

exports['add items to array using dot notation'] = function (test) {
    var model = rkmodel();
    
    model.add('magnitude.values', 1);
    model.add('magnitude.values', 2);
    model.add('magnitude.values', 3);
    
    var result = model.get('magnitude.values');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 3);
    test.deepEqual(result, [ 1, 2, 3 ]);
}
