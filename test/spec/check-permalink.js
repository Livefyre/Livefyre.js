var Livefyre = require('livefyre-require');
var permalink = require('Livefyre/check-permalink');
var expect = require('chai').expect;
var sinon = require('sinon');

describe.only('src/check-permalink', function () {
    it('gets the dynamic version from a query param', function () {
        var spy = sinon.spy(Livefyre, 'require');
        permalink.load(null, 'http://abc.com/?lf-permalinkVersion=0.1.2');
        expect(spy.callCount).to.equal(1);
        expect(spy.lastCall.args[0][0]).to.equal('//cdn.livefyre.com/libs/streamhub-permalink/v0.1.2/streamhub-permalink.min.js');
        spy.restore();
    });

    it('defaults to `0` as the major version', function () {
        var spy = sinon.spy(Livefyre, 'require');
        permalink.load();
        expect(spy.callCount).to.equal(1);
        expect(spy.lastCall.args[0][0]).to.match(/^\/\/cdn\.livefyre\.com\/libs\/streamhub-permalink\/v0\.\d\.\d\/streamhub-permalink\.min\.js/);
        spy.restore();
    });

    it('returns a callback when done', function () {
        var spy = sinon.spy(Livefyre, 'require');
        var done = function () {};
        permalink.load(null, null, done);
        expect(spy.callCount).to.equal(1);
        expect(spy.lastCall.args[1]).to.equal(done);
    });
});
