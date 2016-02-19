'use strict';

var lfRequire = require('livefyre-require');
var forEach = require('mout/array/forEach');
var getParam = require('mout/queryString/getParam');

/**
 * Loads a domain whitelist from a specified URL. If the current
 * domain is in the fetched list, it proceeds onto the next step
 * and provides the configUrl to the supplied callback function.
 *
 * @param  {String} url A fully qualified url to fetch
 * @param  {Function} callback Function to feed the config url
 */
function whitelistLoader(url, callback) {
    lfRequire.require(['json!' + url], function (whitelist) {
        var configUrl = whitelist[window.location.hostname];
        if (configUrl) {
            callback(configUrl);
        }
    }, function (e) { console.log(e); });
}

/**
 * Loads supplied dependent modules with the eventual
 * fetched config. In addition, it provides some additional
 * query param capabilities for testing and/or flexibility.
 *
 * @param  {Array} dependents Array of functions that will be called
 * once we fetch the configuration back
 * @param  {String} url URL of the config we're supposed to fetch
 */
function dependentsLoader(dependents, url) {
    dependents = dependents || [];
    // Set a default for the CCS once it's up and running and I know where
    // to look. For now, we'll just error and log out the message when requesting
    // a blank url.
    //url = url || '//bootstrap.livefyre.com/ccs/?tld=[FQDN]'

    var val = getParam(window.location.href, 'ccs');
    if (val) {
        // Do not load CCS
        if (val === 'disabled') {
            return;
        }

        if (val.search(/https?:\/\//) > -1
            && val.indexOf('livefyre-cdn') > -1) {
            url = val;
        }
    }

    lfRequire.require(['json!' + url], function (config) {
        forEach(dependents, function (module) {
            if (typeof module === 'function') {
                module(config);
            }
        });
    }, function (e) { console.log(e); });
}

module.exports = function cloudConfigurationService(dependents) {
    // Hardcoded whitelist for now until we get a real CCS which should do this for us
    var url = 'http://livefyre-cdn-dev.s3.amazonaws.com/foo/ccs/domain-whitelist.json';
    whitelistLoader(url, dependentsLoader.bind(this, dependents));
};