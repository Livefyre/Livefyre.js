    // The return value from here will be assigned to window.Livefyre

    var Livefyre = window.Livefyre || {};

    require(['Livefyre'], function (LivefyreJS) {
        for (var key in LivefyreJS) {
            Livefyre[key] = LivefyreJS[key];
        }
        // woot! LivefyreJS is here!
        LivefyreJS.emit('initialized');
    });

    // We only have an async reference to the Livefyre.js object...
    // But Scout is going to start invoking require as soon as the LivefyreJS script has loaded,
    // so define it here as something special
    Livefyre.require = function () {
        var args = arguments;
        require(['Livefyre'], function (LivefyreJS) {
            LivefyreJS.require.apply(LivefyreJS, args);
        });
    };

    // and on
    Livefyre.on = function () {
        var args = arguments;
        require(['Livefyre'], function (LivefyreJS) {
            LivefyreJS.on.apply(LivefyreJS, args);
        });
    };

    // and define
    Livefyre.define = define;

    return Livefyre;
}));
