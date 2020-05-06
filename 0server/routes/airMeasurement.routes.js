const express = require('express');
const router = express.Router();

const airM = require('../controllers/airMeasurement.controller');

router.get('/', airM.getAirMeasurement);
router.get('/idStation'+ '/:idStation', airM.getAirMeasurement_idStation);
router.get('/:timestampSensor', airM.getAirMeasurement_timestampSensor);
router.get('/:pm10', airM.getAirMeasurement_pm10);

/* router.get('/', airM.getAirMeasurement);
router.get('/', airM.getAirMeasurement);
router.get('/', airM.getAirMeasurement);
router.get('/', airM.getAirMeasurement);
router.get('/', airM.getAirMeasurement);
router.get('/', airM.getAirMeasurement); */

router.post('/', airM.createAirMeasurement);

/* 
router.get('/', airM.getAirMeasurement);
router.post('/', airM.createAirMeasurement);
router.get('/:id', airM.getAirMeasurement);
router.put('/:id', airM.editAirMeasurement);
router.delete('/:id', airM.deleteAirMeasurement); 
*/

module.exports = router;