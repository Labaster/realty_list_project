const Koa = require('koa');
const app = new Koa();
const render = require('koa-ejs');
const serve = require('koa-static');
const mount = require('koa-mount');
const path = require('path');

render(app, {
    root: path.join(__dirname, '..', 'view'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: false,
});

app.use(mount('/public', serve(path.join(__dirname, 'public'))));

// app.use(async (ctx) =>  await ctx.render('index'));

app.use(async function (ctx) {
    await ctx.render('index');
  });

// app.use((ctx) => {
//     ctx.body = 'Hello Koa';
// });

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`, `http://localhost:${PORT}`));
