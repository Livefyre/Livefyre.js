var auth = require('livefyre-auth');
var EventEmitter = require('event-emitter');
var lfRequire = require('livefyre-require');
var permalink = require('./check-permalink');
var PermalinkHub = require('permalink-hub');

// Exports .require, .define, .requirejs
var LivefyreJS = exports = module.exports = new EventEmitter();
// TODO: destroy dis
exports['livefyre-auth'] = auth;
exports.auth = auth;
// This property can be checked to see if Livefyre.js is on the page.
exports._lfjs = true;

// extend to add .require, .define, .requirejs
(function (sub, base) {
    for (var methodName in base) {
        if (base.hasOwnProperty(methodName)) {
            sub[methodName] = base[methodName];
        }
    }
})(LivefyreJS, lfRequire);
//Do not insert code before this

 
var permalinkModalDisabled = false;
 
LivefyreJS.on('_configurationComplete', function () {
    var contentPermalink = permalink.get();
    if (contentPermalink) {
        var permalinkHub = new PermalinkHub({
            bus: window,
            modalDisabled: permalinkModalDisabled
        });
        if (!permalinkModalDisabled) {
            permalink.load(contentPermalink);
        }
    }    
});

LivefyreJS.on('initialized', function () {
    LivefyreJS.emit('beforeLoadPermalinks', {
        disableModal: function () {
            permalinkModalDisabled = true;
        }
    });
 
    LivefyreJS.emit('_configurationComplete');
});


// decorate the require function to return livefyre-auth when "auth" is asked for
LivefyreJS.require = (function (require) {
    return function (deps, callback, errback, env) {
        var authIndex = -1;
        for (var i = 0; i < deps.length; i++) {
            if (/auth$|auth#/.test(deps[i])) {
                authIndex = i;
                break;
            }
        }
        function spliceAuthModule() {
            if (authIndex > -1) {
                Array.prototype.splice.call(arguments, authIndex, 0, auth);
            }
            callback.apply(this, arguments);
        }
        if (authIndex > -1) {
            deps.splice(authIndex, 1);
        }
        if (deps.length === 0) {
            return spliceAuthModule([]);
        }
        return require(deps, spliceAuthModule, errback, env);
    }
})(LivefyreJS.require);
