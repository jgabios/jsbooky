var CONSTANTS = require('constants');

exports.action = require('action').action({
    "skin": "index.html",
    "getContext": function(env){
        return {
            hello: 'Welcome to our service'
        };
    }
});
