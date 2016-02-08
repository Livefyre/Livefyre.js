var Livefyre = window.Livefyre = require('Livefyre');

// This is necessary to try out Livefyre.require in this non-built demo.
window.Livefyre = Livefyre;

Livefyre.require(['auth', 'auth-contrib#0.0.0-pre'], function (auth, authContrib) {
    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOiJTaXRlIFVzZXIiLCJkb21haW4iOiJhZHZhbmNlZGlnaXRhbC1pbnQtMC5meXJlLmNvIiwiZXhwaXJlcyI6MTQ1NjIwNjg2Ni4wLCJ1c2VyX2lkIjoiM2M0MGMzNmM2NGRiNGFkYWFmNzNiNzEyZjBmYjU1ZDUifQ.bVCSwFmYh2iu4MdASUguM4QJM8xdSFCwnc4udblveBI';
    auth.delegate({
        login: function (loginCallback) {
            var goLogin = confirm("Log in?"); 
            if (goLogin) {
                loginCallback(null, { 'livefyre': token });
            }
        },
        logout: function (logoutCallback) {
            logoutCallback(null);
        }
    });

    var authLog = authContrib.createLog(auth, document.getElementById('auth-log'));
    authContrib.createButton(auth, document.getElementById('auth-button'), authLog);
});

Livefyre.require(['streamhub-input#v0.2'], function (Input) {
    console.log('Haz Input module:', Input);
});
