var Livefyre = require('livefyre-require');
var permalink = require('Livefyre/check-permalink');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('src/check-permalink', function () {
    it('gets the dynamic version from a query param', function () {
        var spy = sinon.spy(Livefyre, 'require');
        permalink.load(null, 'http://abc.com/?lf-permalinkVersion=0.1.2');
        expect(spy.callCount).to.equal(1); 
        expect(spy.lastCall.args[0][0]).to.equal('//cdn.livefyre.com/libs/streamhub-permalink/v0.1.2/streamhub-permalink.min.js');
        spy.restore();
    });

    it('gets the dynamic package path from a query param', function () {
        var spy = sinon.spy(Livefyre, 'require');
        permalink.load(null, 'http://abc.com/?lf-permalinkPath=https%3A%2F%2Flivefyre-cdn-dev.s3.amazonaws.com%2Fblah%2Fv6.6.6%2Fstreamhub-permalink.min.js');
        expect(spy.callCount).to.equal(1); 
        expect(spy.lastCall.args[0][0]).to.equal('https://livefyre-cdn-dev.s3.amazonaws.com/blah/v6.6.6/streamhub-permalink.min.js');
        spy.restore();
    });

    it('defaults to `0` as the major version', function () {
        var spy = sinon.spy(Livefyre, 'require');
        permalink.load();
        expect(spy.callCount).to.equal(1);
        expect(spy.lastCall.args[0][0]).to.match(/^\/\/cdn\.livefyre\.com\/libs\/streamhub-permalink\/v0\.\d\.\d\/streamhub-permalink\.min\.js/);
        spy.restore();
    });
});
