var Marionette = require('backbone.marionette');

module.exports = Marionette.AppRouter.extend({

    // extend AppRouter to tell the controller
    // when the router is ok
    constructor: function(options) {
        Marionette.AppRouter.prototype.constructor.call(this, options);
        this._getController().triggerMethod('start');
    },


    appRoutes: {
    	'/' : "showHome",
        '' : "showHome",
    	'room': 'showRoom',
        'room/:id': 'showRoom',
    }

});