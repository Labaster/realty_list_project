const Koa = require('koa');
const app = new Koa();
const render = require('koa-ejs');
const serve = require('koa-static');
const mount = require('koa-mount');
const path = require('path');
const router = require('../routes/index');

render(app, {
    root: path.join(__dirname, '..', 'view'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: false,
});

app.use(mount('/public', serve(path.join(__dirname, '..', '/public'))));

app.use(router);

// app.use(async (ctx) => {
//     console.log(ctx);
//     await ctx.render('index')
// });

// app.use(async function (ctx) {
//     await ctx.render('index');
// });

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`, `http://localhost:${PORT}`));
