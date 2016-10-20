console.log('Livefyre.js:', Livefyre);

// TODO: I should be able to require 'auth' without going through the resolver
Livefyre.require(['livefyre-auth#0.1.0', 'auth-contrib#0.0.0-pre'], function (auth, authContrib) {
    auth.delegate(auth.createDelegate('http://livefyre.com'));
    var authLog = authContrib.createLog(auth, document.getElementById('auth-log'));
    authContrib.createButton(auth, document.getElementById('auth-button'), authLog);
});


Livefyre.require(['streamhub-input#v0.2'], function (Input) {
    console.log('Haz Input module:', Input);
});

Livefyre.require(['app-embed#1'], function(appEmbed) {
    console.log('App embed', appEmbed)
}, function(){},  'qa');
