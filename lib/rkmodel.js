
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
}

function createModel() {
    return new Model();
}

module.exports = createModel;