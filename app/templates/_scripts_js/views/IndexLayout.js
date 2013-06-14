define([
    'views/BaseView'
], function(BaseView) {

    var IndexLayout = BaseView.extend({
        el: '[data-js=content]',

        initialize: function(options) {
            if (!options) {
                options = {};
            }
        },

        render: function() {
            return this.$el.prepend('<h1>Hello, </h1>');
        }
    });
    return IndexLayout;
});
