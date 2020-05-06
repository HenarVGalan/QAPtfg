const AirM = require('../models/airMeasurementModel');

const airMCtrl = {};
/* routes */
/* 
router.get('/', airM.getAirMeasurement);
router.post('/', airM.createAirMeasurement);
router.get('/:id', airM.getAirMeasurement);
router.put('/:id', airM.editAirMeasurement);
router.delete('/:id', airM.deleteAirMeasurement); 
*/
// db.getCollection('AirMeasurement').find({})

airMCtrl.getAirMeasurement = async (req, res, next) => {    
    const aires = await AirM.find();    
    res.json(aires);
};

airMCtrl.getAirMeasurement_idStation = async (req, res, next) => {
    
    const { idStation } = req.params;
    const air = await AirM.find(idStation);
    res.json(air);

};
airMCtrl.getAirMeasurement_timestampSensor = async (req, res, next) => {
    const { timestampSensor } = req.params;
    const air = await AirM.findById(timestampSensor);
    res.json(air);
};
airMCtrl.getAirMeasurement_pm10 = async (req, res, next) => {
    const { pm10 } = req.params;
    const air = await AirM.find(pm10);
    res.json(air);
};

airMCtrl.createAirMeasurement = async (req, res, next) => {
    const air = new AirM({
        id: req.body.id,
        idStation : req.body.idStation,
        timestampSensor : req.body.timestampSensor,
        pm10 : req.body.pm10,
        pm2_5 : req.body.pm2_5,
        no2  : req.body.no2,
        no2C  : req.body.no2C,
        o3 : req.body.o3,
        o3C : req.body.o3C,
        co  : req.body.co,
        coC  : req.body.coC

    });
    await air.save();
    res.json({status: 'AirM created'});
};


/* 
airMCtrl.createAirMeasurement = async (req, res, next) => {
    
    // console.log(req.body);
    // res.json('received') 
    
    const air = new AirM({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    await air.save();
    res.json({status: 'AirM created'});
};
airMCtrl.createAirMeasurement = async (req, res, next) => {
    const air = new AirM({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    await air.save();
    res.json({status: 'AirM created'});
};

airMCtrl.getAirMeasurement = async (req, res, next) => {
    const { id } = req.params;
    const air = await AirM.findById(id);
    res.json(air);
};

airMCtrl.editAirMeasurement = async (req, res, next) => {
    const { id } = req.params;
    const air = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };
    await AirM.findByIdAndUpdate(id, {$set: air}, {new: true});
    res.json({status: 'AirM Updated'});
};

airMCtrl.deleteAirMeasurement = async (req, res, next) => {
    await AirM.findByIdAndRemove(req.params.id);
    res.json({status: 'AirM Deleted'});
};

*/

module.exports = airMCtrl;