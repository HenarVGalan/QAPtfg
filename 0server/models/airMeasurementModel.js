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
    pm10: {
        type: Number,
        
    },
    pm2_5: {
        type: Number,
       
    },
    no2: {
        type: Number,

    },
    no2C: {
        type: Number,

    },
    o3: {
        type: Number,

    },
    o3C: {
        type: Number,

    },
    co: {
        type: Number,

    },
    coC: {
        type: Number

    }
});

module.exports = mongoose.model('AirM', AirMeasurementSchema);