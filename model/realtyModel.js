const mongoose = require('mongoose');
const config = require('config');
const {get} = require('lodash');
const { faker } = require('@faker-js/faker');

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
    buildYear: { type: Number, required: true, default: 0 },
    description: { type: String, required: true, default: '' },
});

const realtyModel = conn.model(COLLECTION_NAME, realtySchema);

/** Get realty return Array */
realtySchema.methods.getRealty = ({ filters = {}, sort = { realtyId: -1 }, limit = 20, offset = 0 } = {}) => realtyModel
    .find(filters)
    .sort(sort)
    .skip(offset)
    .limit(limit)
    .then(realties => realties)
    .catch((err) => {
        console.log('getRealty', err);
        return [];
    });

/** Get count of realty return Number */
realtySchema.methods.getCounByParams = (filters = {}) => realtyModel
    .find(filters)
    .count()
    .then(count => count)
    .catch((err) => {
        console.log('getCounByParams', err);
        return 0;
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

/** DEVELOPER -->> fill BD */
// const fillDatabase = async () => {
//     for (let index = 0; index < 100; index++) {
//         await realtySchema.methods
//             .saveRealtyData({
//                 photos: [
//                     faker.image.city(640, 480, true),
//                     faker.image.city(640, 480, true),
//                     faker.image.city(640, 480, true),
//                 ],
//                 cityName: faker.location.cityName(),
//                 street: faker.location.streetName(),
//                 roomsCount: Math.floor(Math.random() * 4) + 1,
//                 price: Math.floor(Math.random() * 150000) + 35000,
//                 buildYear: Math.floor(Math.random() * 2024) + 1992,
//                 description: faker.lorem.paragraph(),
//             })
//             .then(realty => console.log('saveRealtyData', realty));
//     }
// };

// fillDatabase();


module.exports = realtySchema;
