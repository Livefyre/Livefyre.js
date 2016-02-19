'use strict';

var lfRequire = require('livefyre-require');
var getParam = require('mout/queryString/getParam');

/**
 * Function to load the Insights Dispatch with a supplied
 * configuration from the Cloud Configuration Service. 
 * Additionally, you can alter which dispatch is loaded by
 * providing the 'insightsDispatch' query param argument
 * with a semver version, url, or disable it all together
 * by passing 'disabled'.
 *
 * @param {Object} config Configuration object
 * @param {Object} config['insights-dispatch'] The configuration specifically for the dispatch.
 */
module.exports = function insightsDispatchLoader(config) {
    // No config? No dispatch for you!
    if (!config || !config['insights-dispatch']) {
        return;
    }

    var cfg = config['insights-dispatch'];
    var module = cfg.module || 'insights-dispatch#0';
    var val = getParam(window.location.href, 'insightsDispatch');

    // We found a flag, now we need to process it
    if (val) {
        // Don't load dispatch
        if (val === 'disabled') {
            return;
        }

        // Is URL? Load it.
        // TODO: Make fetch-able URL logic smarter? Or is just checking
        // that it's a URL and on livefyre-cdn enough?
        if (val.search(/https?:\/\//) > -1
            && val.indexOf('livefyre-cdn') > -1) {
            module = val;
        }

        // Or a semver number? x.x.x(-alpha)
        // If you're using this, you're probably going to a specific build number, so
        // I'm going to leave the patch version constraint on there.
        if (val.search(/[0-9]+\.[0-9]+\.[0-9]+(?:-\w+)?$/) > -1) {
            module = 'insights-dispatch#' + val;
        }
    }

    lfRequire.require([module], function (InsightsDispatch) {
        new InsightsDispatch(cfg);
    }, function (e) { console.log(e); });
};