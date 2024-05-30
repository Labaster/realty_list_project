const Router = require('@koa/router')();
const renderRouts = require('./renderRouts');

renderRouts(Router);

module.exports = Router.routes();