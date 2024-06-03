const mongoose = require('mongoose');
const config = require('config');
const {get} = require('lodash');

const userName = config.get('mongoDB.userName');
const pass = config.get('mongoDB.pass');
const connUrl = config.get('mongoDB.url')
    .replace(/<auth>/g, `${userName && pass ? `${userName}:${pass}` : ''}`);
const Schema = mongoose.Schema;

const COLLECTION_NAME = 'realty';
const urlByCollection = `${connUrl}/${COLLECTION_NAME}`
const conn = mongoose.createConnection(urlByCollection);

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

realtySchema.methods.saveRealtyData = async(realtyData = {}) => {
    // Спочатку витягуємо останню ІД оглошення
    const latestRecord = await realtyModel.find().sort({ realtyId: -1 }).limit(1);
    let realtyId = Number(get(latestRecord, '[0].realtyId', 0)) + 1;

    return realtyModel
        .create({ ...realtyData, realtyId })
        .then(realty => realty)
        .catch((err) => {
            console.log('saveRealtyData', err);
            return {};
        });
}

// realtySchema.methods
//     .saveRealtyData({
//         photos: [
//             'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2V8ZW58MHx8MHx8fDA%3D',
//             'https://static8.depositphotos.com/1029202/1008/i/450/depositphotos_10085041-stock-photo-new-houses.jpg',
//             'https://thumbs.dreamstime.com/z/kuala-lumpur-malaysia-february-double-story-luxury-terrace-house-just-finished-still-not-occupied-designed-architect-160791489.jpg'
//         ],
//         cityName: 'cityName',
//         street: 'street',
//         roomsCount: 1,
//         price: 100,
//         buildYear: new Date(),
//         description: 'description',
//     })
//     .then(realty => console.log('saveRealtyData', realty));




array.forEach(element => {
    
});

module.exports = realtySchema;
