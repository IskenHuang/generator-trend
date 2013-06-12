define [
    'backbone'
    'i18next'
    'EventChannel'
], (Backbone, I18Next, EventChannel) ->
    BaseView = Backbone.View.extend
        initialize: (options = {})->
            # load i18n
            @$el.i18n()

    return BaseView

