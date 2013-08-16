require.config(
    paths:
        jquery         : '../bower_components/jquery/jquery'
        underscore     : '../bower_components/underscore/underscore'
        backbone       : '../bower_components/backbone/backbone'
        text           : '../bower_components/requirejs-text/text'
        i18next        : '../bower_components/i18next/release/i18next.amd.withJQuery-1.6.3.min'

    shim:
        underscore:
            exports: '_'
        backbone:
            deps: ['jquery', 'underscore']
            exports: 'Backbone'
        bootstrap:
            deps: ['jquery']
            exports: 'jquery'
        i18next:
            deps: ['jquery']
)

require ['app', 'jquery'], (App, $) ->
    App.start()
