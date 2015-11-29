
function Model() {
    var values = { };
    var listeners = { };
    
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
        else {
            var oldvalue = values[name];
            values[name] = value;
            
            if (listeners.create && oldvalue === undefined && listeners.create[name])
                listeners.create[name].forEach(function (fn) {
                    setImmediate(function () { fn(value); });
                });
            
            if (listeners.set && listeners.set[name])
                listeners.set[name].forEach(function (fn) {
                    setImmediate(function () { fn(value, oldvalue); });
                });
        }
    };
    
    this.remove = function (name) {
        delete values[name];
    };
    
    this.has = function (name) {
        return values[name] !== undefined;
    };
    
    this.on = function (evname, propname, fn) {
        var p = propname.indexOf('.');
        
        if (p >= 0) {
            var subname = propname.substring(0, p);
            propname = propname.substring(p + 1);
            this.get(subname).on(evname, propname, fn);
            return;
        }
        
        if (!listeners[evname])
            listeners[evname] = { };
            
        if (!listeners[evname][propname])
            listeners[evname][propname] = [];
            
        listeners[evname][propname].push(fn);
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