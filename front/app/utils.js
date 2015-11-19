// -----------------------------
// Vendors

var $           = require('jquery');
var _           = require('underscore');

var Api = {
    dev: {
        api_host: 'http://localhost:3000/',
    },
    staging: {
        //api_host: 'http://staging.clintagency.com:3000/',
    },
    prod: {
        // api_host: 'http://www.clintagency.com:3003/',
    }
};

var Utils = {

     routing: {
        navigate: function(route, options) {
            options || (options = {});
            return Backbone.history.navigate(route, options);
        }
    },
    
}

var getConf = function() {
    var local = document.URL.indexOf('127') === -1;
    var localhost = document.URL.indexOf('local') === -1;
    var dev = document.URL.indexOf('.dev') === -1;
    var staging = document.URL.indexOf('staging') === -1;
    var prod = document.URL.indexOf('www.clintagency.com') === -1;

    var config;

    if (!local || !localhost || !dev) {
        config = Api.dev;
    }
    else if(!staging) {
        config = Api.staging;
    }else{
        config = Api.prod;
    }

    config = Api.dev;

    // Merge common config
    config = $.extend({}, config, Utils)

    return config;
}

module.exports = getConf;
