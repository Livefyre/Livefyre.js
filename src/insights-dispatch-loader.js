'use strict';

var lfRequire = require('livefyre-require');
var getParam = require('mout/queryString/getParam');

/**
 * Function to load the Insights Dispatch with a supplied
 * configuration from the Cloud Configuration Service. 
 * Additionally, you can alter which dispatch is loaded by
 * providing the 'insightsDispatch' query param argument
 * with a semver version or disable it all together
 * by passing 'disable'.
 */
module.exports = function insightsDispatchLoader() {
    var module = 'insights-dispatch#0';
    var val = getParam(window.location.href, 'insightsDispatch');

    // We found a flag, now we need to process it
    if (val) {
        // Don't load dispatch
        if (val === 'disable') {
            return;
        }

        // Or a semver number? x.x.x(-alpha)
        // If you're using this, you're probably going to a specific build number, so
        // I'm going to leave the patch version constraint on there.
        if (val.search(/[0-9]+\.[0-9]+\.[0-9]+(?:-\w+)?$/) > -1) {
            module = 'insights-dispatch#' + val;
        }
    }

    lfRequire.require([module], function (InsightsDispatch) {
        new InsightsDispatch();
    }, function (e) { console.log(e); });
};