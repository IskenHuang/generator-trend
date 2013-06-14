define([
    'views/BaseView',
    'views/indexLayout'
], function(BaseView, IndexLayout) {
    var ContentManager = BaseView.extend({

        el: '[data-js=content]',

        initialize: function(options) {
            if (!options) {
                options = {};
            }

            return this.render();
        },

        render: function() {
            return this.reRender();
        },

        reRender: function(view) {
            if (!view) {
                view = 'index';
            }

            return this.layouts[view]().render();
        },

        layouts: {
            index: function() {
                return new IndexLayout();
            }
        }
    });

    return ContentManager;
});
