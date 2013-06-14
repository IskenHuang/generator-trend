define([
    'backbone',
    'i18next',
    'EventChannel'
], function(Backbone, I18Next, EventChannel) {

    var BaseView = Backbone.View.extend({

        initialize: function(options) {
            if (!options) {
                options = {};
            }

            return this.$el.i18n();
        }
    });

    return BaseView;
});
