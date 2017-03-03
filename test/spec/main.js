var auth = require('livefyre-auth');
var Livefyre = require('Livefyre');
var assert = require('chai').assert;
var sinon = require('sinon');

describe('Livefyre', function () {
    it('is truthy', function (){
        assert(Livefyre);
    });

    it('defines require and requirejs', function () {
        assert(Livefyre.require instanceof Function);
        assert(Livefyre.requirejs instanceof Function);
    });

    it('"hacks" "auth" module loading with the latest bundled livefyre-auth', function (done) {
        Livefyre.require(['auth'], function (module) {
            assert(module === auth);
            Livefyre.require(['auth#v1'], function (module) {
                assert(module === auth);
                done();
            });
        });
        Livefyre.emit('initialized');
    });
});
