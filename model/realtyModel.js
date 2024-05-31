const mongoose = require('mongoose');
const config = require('config');

const connUrl = config.get('mongoDB.url');
const userName = config.get('mongoDB.userName');
const pass = config.get('mongoDB.pass');
const Schema = mongoose.Schema;

const COLLECTION_NAME = 'realty';

const conn = mongoose.createConnection(
    connUrl
        .replace(/<auth>/g, `${userName}:${pass}`)
        .replace(/<collection>/g, COLLECTION_NAME)
);

const realtySchema = new Schema({
    realtyId: { type: Number, required: true, index: true, default: 0, unique: true },
    photos: {type: Array, required: true, default: []},
    cityName: { type: String, required: true, default: '' },
    street: { type: String, required: true, default: '' },
    roomsCount: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    buildYear: { type: Date, required: true, default: 0 },
    description: { type: String, required: true, default: '' },
});

const realtyModel = conn.model(COLLECTION_NAME, realtySchema);

/** Get realty return Array */
realtySchema.methods.getRealty = ({ filters = {}, sort = { realtyId: -1 }, limit = 20 } = {}) => realtyModel
    .find(filters)
    .sort(sort)
    .limit(limit)
    .then(realties => realties)
    .catch((err) => {
        console.log('getRealty', err);
        return [];
    });

module.exports = realtySchema;
