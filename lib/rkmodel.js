
function Model() {
    var values = { };
    
    this.get = function (name) {
        return values[name];
    };
    
    this.set = function (name, value) {
        values[name] = value;
    };
}

function createModel() {
    return new Model();
}

module.exports = createModel;