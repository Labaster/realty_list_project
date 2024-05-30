const mainAction = async (ctx) => {
    const data = {
        realties: [
            {
                realtyPhoto: 'https://i.cbc.ca/1.7059948.1702597015!/fileImage/httpImage/image.JPG_gen/derivatives/16x9_780/5191-colbrook-road.JPG',
                price: '250 000$',
                location: 'Ukraine, Kyiv, 5th avenue, 12',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Nulla porttitor accumsan tincidunt. Nulla quis'
            },
            {
                realtyPhoto: 'https://dn9g5fz2o8iu4.cloudfront.net/nc_canopymls/cnd/4f39666fbf50c39f5fadddf77a22d4f1-1-thumb.jpg?v=1714178725',
                price: '250 000$',
                location: 'Ukraine, Kyiv, 5th avenue, 12',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Nulla porttitor accumsan tincidunt. Nulla quis'
            },
            {
                realtyPhoto: 'https://dn9g5fz2o8iu4.cloudfront.net/ia_craar/cnd/3c67cb35ac16ff86ee60757f91ee26ee-1-thumb.jpg?v=1711475678',
                price: '250 000$',
                location: 'Ukraine, Kyiv, 5th avenue, 12',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Nulla porttitor accumsan tincidunt. Nulla quis',
            }
        ],
    };
    await ctx.render('index', data);
};

module.exports = {
    mainAction,
};