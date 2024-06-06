module.exports = {
    "mongoDB": {
        "url": `mongodb://${process.env.DB_HOST || '0.0.0.0'}:27017`,
        "userName": "",
        "pass": ""
    }
};