const mongoose = require('mongoose');

//mongodbprueba  localhost:27017
//mongodbhenar 161.67.132.159:27018
//dbhenar AirMeasurement
//db.getCollection('AirMeasurement').find({})
//http://pluton.i3a.uclm.es:27018
//const URI = 'mongodb://161.67.132.159:27018/dbhenar';
//const URI = 'mongodb://localhost/AirMeasurement_local';

const URI = 'mongodb://http://pluton.i3a.uclm.es:27018/dbhenar';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('db is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;