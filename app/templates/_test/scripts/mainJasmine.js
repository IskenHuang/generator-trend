/**
 * setup modules path and dependent
 *
 * @module TestMain
 */
require.config({
    baseUrl: './scripts/',
    paths: {
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        text: '../bower_components/requirejs-text/text',
        i18next: '../bower_components/i18next/release/i18next.amd.withJQuery-1.6.3.min'
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
    },
    deps: [],
    callback: function(){
        require([
            'jquery',
            '/spec/index.js',
        ], function($, index) {
            'use strict';

            var jasmineEnv = jasmine.getEnv();

            $(function() {
                require(index.specs, function() {
                    jasmineEnv.execute();
                });
            });
        });
    }
});
