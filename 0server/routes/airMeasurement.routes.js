const express = require('express');
const router = express.Router();

const airM = require('../controllers/airMeasurement.controller');

/* GET */
router.get('/', airM.getAirMeasurement);
router.get('/idStation/:idStation', airM.getAirMeasurement_idStation);
router.get('/idStation-contaminante/:idStation', airM.getAirMeasurement_idStationContaminante);
router.get('/:timestampSensor', airM.getAirMeasurement_timestampSensor);
    
/*PM10*/
router.get('/pm10/', airM.getAirMeasurement_pm10All);
router.get('/pm10/:idStation', airM.getAirMeasurement_pm10);
router.get('/pm10/batchDiario/:idStation', airM.getAirMeasurement_pm10_batchdiario);
router.get('/pm10/batchAnual/:idStation', airM.getAirMeasurement_pm10_batchanual);

/* POST */
router.post('/', airM.createAirMeasurement);

module.exports = router;


