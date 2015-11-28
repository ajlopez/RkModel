
function Model() {
    var values = { };
    
    this.get = function (name) {
        if (values[name] === undefined)
            values[name] = new Model();
            
        return values[name];
    };
    
    this.set = function (name, value) {
        values[name] = value;
    };
    
    this.has = function (name) {
        return values[name] !== undefined;
    };
    
    this.loadObject = function (obj) {
        for (var key in obj) {
            var value = obj[key];
            
            if (typeof value === 'object')
                this.get(key).loadObject(value);
            else
                values[key] = value;
        }
    };
}

function createModel() {
    return new Model();
}

module.exports = createModel;