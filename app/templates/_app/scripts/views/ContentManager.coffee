define [
    'views/BaseView'
    'views/indexLayout'
], (BaseView, IndexLayout) ->
    ContentManager = BaseView.extend
        el: '[data-js=content]'

        initialize: (options = {})->
        	@render()

        render: ->
        	@reRender()

        reRender: (view = 'index')->
        	@layouts[view]().render()

        layouts:
        	index: ->
        		return new IndexLayout()


    return ContentManager