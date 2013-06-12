define [
    'backbone'
    'i18next'
    'views/ContentManager'
], (Backbone, I18Next, ContentManager) ->
    App =
        init: () ->
            # initialize router, views, data and layouts
            @contentManager = new ContentManager()

        start: () ->
            # i18n default and init
            locale = 'en-US';
            I18Next.init(
                lng: locale
                debug: true
                ns: 'translation'
                resGetPath: './scripts/locales/__lng__/__ns__.json'
                getAsync: true
                # local cache disable for debug
                useLocalStorage: true
                # 1 year
                localStorageExpirationTime: 31536000
            , (t)->
                $('[data-i18n]').i18n()
            )

            App.init()

            Backbone.history.start()

        # Views: {}
        # Models: {}
        # Collections: {}

    return App;
