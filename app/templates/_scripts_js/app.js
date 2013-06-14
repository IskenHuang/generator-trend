define([
    'backbone',
    'i18next',
    'views/ContentManager'
], function(Backbone, I18Next, ContentManager) {
    var App;

    App = {
        init: function() {
            return this.contentManager = new ContentManager();
        },
        start: function() {
            var locale;

            locale = 'en-US';
            I18Next.init({
                lng: locale,
                debug: true,
                ns: 'translation',
                resGetPath: './scripts/locales/__lng__/__ns__.json',
                getAsync: true,
                useLocalStorage: true,
                localStorageExpirationTime: 31536000
            }, function(t) {
                return $('[data-i18n]').i18n();
            });

            App.init();

            return Backbone.history.start();
        }
    };
    return App;
});
