const {mainAction} = require('../controllers/renderRoutsController');

module.exports = Router =>
    Router.get('/', mainAction);