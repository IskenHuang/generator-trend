require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        underscore: '../components/underscore/underscore',
        backbone: '../components/backbone/backbone',
        text: '../components/requirejs-text/text',
        i18next: '../components/i18next/release/i18next.amd.withJQuery-1.6.3.min'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        i18next: {
            deps: ['jquery']
        }
    }
});

define(['app', 'jquery'], function(App, $) {

    return App.start();
});
