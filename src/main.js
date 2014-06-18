debugger;
var auth = require('livefyre-auth');
var eventEmitter = require('event-emitter');
var inherits = require('inherits');
var lfRequire = require('livefyre-require');
var permalink = require('./check-permalink');

// Exports .require, .define, .requirejs
exports = module.exports = lfRequire;
// exports['livefyre-auth'] = auth;
// exports.auth = auth;
inherits(exports, eventEmitter);
exports.define = define("auth", auth); // fingers crossed

// If this is run on a page with a permalink fragment, get streamhub-permalink
var contentPermalink = permalink.get();
if (contentPermalink) {
    permalink.load(contentPermalink);
}
