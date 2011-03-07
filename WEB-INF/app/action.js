
/**
 * @fileOverview provides {@link action} function that is used
 * in all actions used in the site.
 * settings and defaultContext, that all actions use, are declared and initialized
 * 
 */

var {Response} = require('ringo/webapp/response');
var Skin = require('ringo/skin');
var CONSTANTS = require('constants');
var ObjectUtil = require('ringo/utils/objects');

var defaultContext = {
    page: {
        title: CONSTANTS.TITLE
    }
};

/**
 * @param config - it is an object that has 2 items: a skin file and a function
 *                  that returns a context object
 * @return a function that acts as an action
 * 
 * action function is meant to be used in an action file, to reduce code
 * and have a central place where defaultContext can be passed to the skin,
 * where render plugins can be called, response status can be handled and so on.
 * 
 * Internally, it creates an object env [Environment] that is passed to the context
 * in order for the actual action to have access to the environment [request, response, settings]
 *
 *
 */
exports.action = function(config){
    var skin = 'skins/'+config.skin;
    var html;
    return function(req,url){
        var initialContext = ObjectUtil.clone(defaultContext);
        var resp = new Response();
        var env = {
            req: req,
            resp: resp,
            url: url
        }
        var context = ObjectUtil.merge(config.getContext(env),initialContext);

        if(!context.status){
            html = Skin.render(skin,context);
        } else {
            if(context.status=='redirect'){
                return Response.redirect(context.url);
            }
        }
        env.resp.write(html);
        return resp;
    }
};
