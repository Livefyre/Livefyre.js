var uriInterpreter = require('streamhub-permalink/uri-interpreter');
var lfRequire = require('livefyre-require');

/**
 * Get permlanked Content info from the URL, if present, else falsy
 */
exports.get = function () {
    return uriInterpreter.getContentPermalink();
};

var permalinkPackage = 'streamhub-permalink#0.3.3';

/**
 * Load what you need to show off a permalink
 */
exports.load = function (content) {
    lfRequire.require([permalinkPackage], function (PermalinkPackage) {
        console.log('loaded permalink package', PermalinkPackage);
    });
};
