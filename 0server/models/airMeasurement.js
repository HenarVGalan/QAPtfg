const mongoose = require('mongoose');
const { Schema } = mongoose;

const AirMeasurementSchema = new Schema({
    id: {
        type: String
    },
    idStation: {
        type: String
    },
    timestampSensor: {
        type: Date
    },    
    date: {
        type: Date

    },
    timestamp: {
        type: Date

    },
    pm10: {
        type: Number

    },
    pm2_5: {
        type: Number

    },
    no2: {
        type: Number

    },
    no2C: {
        type: Number

    },
    o3: {
        type: Number

    },
    o3C: {
        type: Number

    },
    co: {
        type: Number

    },
    coC: {
        type: Number

    },
    pm1: {
        type: Number

    },
    serial: {
        type: Number

    },
    pressure: {
        type: Number

    },
    temperature: {
        type: Number

    },
    humidity: {
        type: Number

    },
    luminosity: {
        type: Number

    },
    baterryVolts: {
        type: Number

    },
    batteryCurrent: {
        type: Number

    },
    batteryLevel: {
        type: Number

    } 

});

module.exports = mongoose.model('AirMeasurement', AirMeasurementSchema);
