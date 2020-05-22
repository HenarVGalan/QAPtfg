const AirMeasurement = require('../models/airMeasurement');

const airMCtrl = {};


airMCtrl.getAirMeasurement = async (req, res, next) => {
    //var aires = await AirMeasurement.findOne({});
    //Solo los 10 últimos registros
    const aires = await AirMeasurement.find().sort({ _id: -1 }).limit(50);
    res.json(aires);

};

// executes, name LIKE john and only selecting the "name" and "friends" fields
// MyModel.find({ name: /john/i }, 'name friends', function (err, docs) { })
airMCtrl.getAirMeasurement_pm10All = async (req, res, next) => {

    const aires = await AirMeasurement.find('timestampSensor idStation pm10').sort({ _id: -1 }).limit(50);

    res.json(aires);
};
//router.get('/pm10/:idStation', airM.getAirMeasurement_pm10);timestampSensor
//timestampSensor: { $ne: null }
/*********** Preparacion de datos para el front *******/
airMCtrl.getAirMeasurement_pm10 = async (req, res, next) => {
    const { idStation } = req.params;
    const aires = await AirMeasurement.aggregate([
        {
            "$match": {
                "idStation": idStation,
                "timestampSensor": {
                    "$exists": true,
                    "$nin": [null, "NaN"] 
                }
            }
        },
        {
            "$project": { _id: 0, timestampSensor: 1, pm10: 1 }
        },
        //mongoose group by time series
        { "$sort": { timestampSensor: 1 } }
    ]).limit(20);

    /*  const aires = await AirMeasurement.aggregate([
         { $match: { idStation: idStation } },
         { $project: { _id: 0, timestampSensor: 1, pm10: 1,
              } },
         { $sort: { timestampSensor: 1 } },
         
     ]).limit(20); */

    return res.json(
        {
            "name": idStation,
            "data": list_dict_to_timeseries_highcharts(aires)
            //"data" : prepareData(aires)
        }
    );
};
/* list of dic to list of lists */
function list_dict_to_timeseries_highcharts(list_dict) {
    var arr = [];
    console.log(list_dict);
    list_dict.forEach(function (json_item) {
        //arr.push(Object.keys(json_item).map((key) => json_item[key]));
        arr.push(Object.keys(json_item).map(function (key) {
            if (key == "timestampSensor") {
                console.log('json_item key' + json_item[key]);
                console.log('Parse json_item key ' + Date.parse(json_item[key]));

                return Date.parse(json_item[key]);
            }
            else return json_item[key];
        }));
    });
    console.log(arr)
    return arr
}
/* function prepareData(list_dict) {
    var arr = [];
    list_dict.forEach(function (elemento, indice, array) {

        (Object.keys(elemento)).forEach(function (elementoKey, indice, array) {
            if ('timestampSensor' == elementoKey) {
                console.log((elemento.timestampSensor));
                console.log('fecha');
                const date = elemento.timestampSensor;
                console.log(date);

                year = date.getUTCFullYear();
                month = date.getUTCMonth();
                day = date.getUTCDate();
                hour = date.getUTCHours();
                minute = date.getUTCMinutes();
                second = date.getUTCSeconds();
                millisecond = date.getUTCMilliseconds();

                const utcDate = Date.UTC(year, month, day, hour, minute, second, millisecond);
                console.log('utcDate :');
                console.log(utcDate);

                arr.push([utcDate, elemento.pm10])
            }

        });

    });
    
    return arr;
} */
//imprime _id
/* airMCtrl.getAirMeasurement_pm10 = async (req, res, next) => {
    const { idStation } = req.params;
    const aires = await AirMeasurement.find({
        idStation: idStation,
        
    },
        ' timestampSensor pm10').sort({ timestampSensor: -1 }).limit(150);

    res.json(aires);
}; */
/* airMCtrl.getAirMeasurement_pm10 = async (req, res, next) => {
    const { idStation } = req.params;
        const aires = await AirMeasurement.aggregate([
        { $match: { idStation: idStation } },
        { $project: { _id: 0, pm10:1 } },
        {
            $group: {
                _id: '$timestamp',


            }
        }//$region is the column name in collection

    ]);
    res.json(aires);
}; */

airMCtrl.getAirMeasurement_idStation = async (req, res, next) => {

    const { idStation } = req.params;
    const air = await AirMeasurement.find({
        idStation: idStation
    },
        'timestampSensor idStation pm10 pm2_5 no2 no2C o3 o3C co coC');
    res.json(air);

};
// Find the max balance of all accounts
/* 
Users.aggregate([
    { $group: { _id: null, maxBalance: { $max: '$balance' }}},
    { $project: { _id: 0, maxBalance: 1 }}
  ]).
  then(function (res) {
    console.log(res); // [ { maxBalance: 98000 } ]
  }); 

***select * from table group by name
  table.aggregate([
        {
            $group: {
                _id: '$name',  //$region is the column name in collection
                count: {$sum: 1}
            }
        }
    ], function (err, result) {
        if (err) {
            next(err);
        } else {
            res.json(result);
        }
    });
  */
/*  
{$match:{"your find query"}},
 {$project:{"your desired fields"}} 
 */
airMCtrl.getAirMeasurement_idStationContaminante = async (req, res, next) => {

    const { idStation } = req.params;
    const air = await AirMeasurement.aggregate([
        { $match: { idStation: idStation } },
        { $project: { _id: 0 } },
        {
            $group: {
                _id: '$id',


            }
        }//$region is the column name in collection

    ]);
    res.json(air);

};

airMCtrl.getAirMeasurement_timestampSensor = async (req, res, next) => {
    const { timestampSensor } = req.params;
    const air = await AirMeasurement.findById(timestampSensor);
    res.json(air);
};

airMCtrl.createAirMeasurement = async (req, res, next) => {
    const air = new AirMeasurement({
        id: req.body.id,
        idStation: req.body.idStation,
        timestampSensor: req.body.timestampSensor,
        pm10: req.body.pm10,
        pm2_5: req.body.pm2_5,
        no2: req.body.no2,
        no2C: req.body.no2C,
        o3: req.body.o3,
        o3C: req.body.o3C,
        co: req.body.co,
        coC: req.body.coC,
        pm1: req.body.pm1,
        date: req.body.date,
        serial: req.body.serial,
        pressure: req.body.pressure,
        temperature: req.body.pressure,
        humidity: req.body.humidity,
        luminosity: req.body.luminosity,
        baterryVolts: req.body.baterryVolts,
        batteryCurrent: req.body.batteryCurrent,
        batteryLevel: req.body.batteryLevel,
        timestamp: req.body.timestamp

    });
    await air.save();
    res.json({ status: 'AirM created' });
};

module.exports = airMCtrl;