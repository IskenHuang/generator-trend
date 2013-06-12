define [
    'views/BaseView'
], (BaseView) ->
    IndexLayout = BaseView.extend
        el: '[data-js=content]'

        initialize: (options = {})->

        render: ->
            @$el.prepend('<h1>Hello, </h1>')

    return IndexLayout
