const realtySchema = require('../model/realtyModel');
const { getRealty, getCounByParams } = realtySchema.methods;

const mainAction = async (ctx) => {
    const ITEMS_PER_PAGE = 20;
    const { limit = ITEMS_PER_PAGE, page = 0 } = ctx.query;
    const [respDb = [], count = 0] = await Promise.all([
        getRealty({ limit, offset: page * limit }),
        getCounByParams(),
    ]);

    await ctx.render(
        'index',
        {
            realties: respDb,
            count,
            pagesTotal: Math.ceil(count / ITEMS_PER_PAGE),
            page: Number(page),
        });
};

module.exports = {
    mainAction,
};