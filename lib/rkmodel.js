
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
            return;
        }

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
        
        if (listeners.setp)
            listeners.setp.forEach(function (fn) {
                setImmediate(function () { fn(name, value, oldvalue); });
            });
    };
    
    this.remove = function (name) {
        var p = name.indexOf('.');
        
        if (p >= 0) {
            var subname = name.substring(0, p);
            name = name.substring(p + 1);
            this.get(subname).remove(name);
            return;
        }
        
        var value = values[name];

        delete values[name];

        if (listeners.remove && value !== undefined && listeners.remove[name])
            listeners.remove[name].forEach(function (fn) {
                setImmediate(function () { fn(value); });
            });
    };
    
    this.has = function (name) {
        var p = name.indexOf('.');
        
        if (p >= 0) {
            var subname = name.substring(0, p);
            name = name.substring(p + 1);
            return this.get(subname).has(name);
        }
        
        return values[name] !== undefined;
    };
    
    this.add = function (name, value) {
        var p = name.indexOf('.');
        
        if (p >= 0) {
            var subname = name.substring(0, p);
            name = name.substring(p + 1);
            this.get(subname).add(name, value);
            return;
        }
        
        if (values[name] === undefined)
            values[name] = [];
            
        values[name].push(value);
        
        if (listeners.addi && listeners.addi[name])
            listeners.addi[name].forEach(function (fn) {
                setImmediate(function () { fn(value); });
            });
    }
    
    this.extract = function (name, key) {
        var p = name.indexOf('.');
        
        if (p >= 0) {
            var subname = name.substring(0, p);
            name = name.substring(p + 1);
            this.get(subname).extract(name, key);
            return;
        }

        var value = values[name];
        
        if (values[name] === undefined)
            return;

        var value = values[name][key];
        
        values[name] = values[name].slice(0, key).concat(values[name].slice(key + 1, values[name].length));
        
        if (listeners.extracti && listeners.extracti[name])
            listeners.extracti[name].forEach(function (fn) {
                setImmediate(function () { fn(value); });
            });
    }
    
    this.on = function (evname, propname, fn) {
        if (arguments.length === 2 && typeof propname === 'function') {
            fn = propname;
            propname = null;
        }
        
        if (propname) {
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
        }
        else {
            
            if (!listeners[evname])
                listeners[evname] = [];
                
            listeners[evname].push(fn);
        }
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