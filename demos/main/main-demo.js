var Livefyre = window.Livefyre = require('Livefyre');

// This is necessary to try out Livefyre.require in this non-built demo.
window.Livefyre = Livefyre;

var livefyreAuthDelegate = require('livefyre-auth/livefyre-auth-delegate');

// var auth = require('auth');

auth.delegate(livefyreAuthDelegate('http://livefyre.com'));

// Livefyre.require(['auth', 'auth-contrib#0.0.0-pre'], function (auth, authContrib) {
//     auth.delegate(auth.createDelegate('http://livefyre.com'));
//     var authLog = authContrib.createLog(auth, document.getElementById('auth-log'));
//     authContrib.createButton(auth, document.getElementById('auth-button'), authLog);
// });


// Livefyre.require(['streamhub-input#v0.2'], function (Input) {
//     console.log('Haz Input module:', Input);
// });
