
function Model() {
    var values = { };
    
    this.get = function (name) {
        var p = name.indexOf('.');
        
        if (p >= 0) {
            var subname = name.substring(0, p);
            name = name.substring(p + 1);
            return this.get(subname).get(name);
        }
        
        if (values[name] === undefined)
            values[name] = new Model();
            
        return values[name];
    };
    
    this.set = function (name, value) {
        var p = name.indexOf('.');
        
        if (p >= 0) {
            var subname = name.substring(0, p);
            name = name.substring(p + 1);
            this.get(subname).set(name,value);
        }
        else
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
    
    this.toObject = function (obj) {
        var result = { };
        
        for (var key in values) {
            var value = values[key];
            
            if (value instanceof Model)
                result[key] = value.toObject();
            else
                result[key] = value;
        }
        
        return result;
    };
}

function createModel() {
    return new Model();
}

module.exports = createModel;