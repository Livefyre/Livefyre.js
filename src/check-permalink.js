var getParam = require('mout/queryString/getParam');
var lfRequire = require('livefyre-require');
var uriInterpreter = require('streamhub-permalink/uri-interpreter');

/**
 * Get permlanked Content info from the URL, if present, else falsy
 */
exports.get = function () {
    return uriInterpreter.getContentPermalink();
};

var defaultVersion = '0';
var packageName = 'streamhub-permalink';

/**
 * Load what you need to show off a permalink
 * @param {*} content
 * @param {string=} opt_href
 */
exports.load = function (content, opt_href) {
    var href = opt_href || window.location.href;
    var version = getParam(href, 'lf-permalinkVersion') || defaultVersion;

    lfRequire.require([packageName + '#' + version], function (PermalinkPackage) {
        console.log('loaded permalink package', PermalinkPackage);
    });
};
