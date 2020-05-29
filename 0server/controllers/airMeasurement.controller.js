const AirMeasurement = require('../models/airMeasurement');

const airMCtrl = {};

/* list of dic to list of lists */
function list_dict_to_timeseries_highcharts(list_dict) {
    var arr = [];
    console.log(list_dict);
    list_dict.forEach(function (json_item) {
        //arr.push(Object.keys(json_item).map((key) => json_item[key]));
        arr.push(Object.keys(json_item).map(function (key) {
            if (key == "timestampSensor") {
                return (json_item[key] * 1000);
            }
            else return json_item[key];
        }));
    });
    console.log(arr)
    return arr
}
function toMilisegundos(list_dict){
    var arr = [];
    console.log(list_dict);
    list_dict.forEach(function (json_item) {
       
        arr.push(Object.keys(json_item).map(function (key) {
            if (key == "_id") {
                year =json_item[key]['year'],
                month= json_item[key]['month']-1;
                day = json_item[key]['dayOfMonth'];
                console.log('UTC');
                console.log(Date.UTC(year,month, day));
                return Date.UTC(year,month, day);
               // return Date.UTC(json_item[key]['year'],json_item[key]['month'],json_item[key]['dayOfMonth']);
                
            }
            else {
                console.log('valor');
                console.log(json_item[key]);
                return json_item[key];}
        }));
    });
    console.log(arr)
    return arr
}
function toMilisegundosAnual(list_dict){
    var arr = [];
    console.log(list_dict);
    list_dict.forEach(function (json_item) {
       
        arr.push(Object.keys(json_item).map(function (key) {
            if (key == "_id") {
                year =json_item[key]['year'];
                //month= json_item[key]['month']-1;
                //day = json_item[key]['dayOfMonth'];
               // console.log('UTC');
                //console.log(Date.UTC(year));
                return Date.UTC(year);
               // return Date.UTC(json_item[key]['year'],json_item[key]['month'],json_item[key]['dayOfMonth']);
                
            }
            else {
             /*    console.log('valor');
                console.log(json_item[key]); */
                return json_item[key];}
        }));
    });
    console.log(arr)
    return arr
}

airMCtrl.getAirMeasurement = async (req, res, next) => {
    //var aires = await AirMeasurement.findOne({});
    //Solo los 10 últimos registros
    const aires = await AirMeasurement.find().sort({ _id: -1 }).limit(50);
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
    ]);//.limit(20);

    return res.json(
        {
            "name": idStation,
            "data": list_dict_to_timeseries_highcharts(aires)
        }
    );
};

airMCtrl.getAirMeasurement_pm10_batchdiario = async (req, res, next) => {
    const { idStation } = req.params;
    const aires = await AirMeasurement.aggregate([
        //timestamp PARA EN PROJECT coger año, mes y día necesita formato DATE, no milisegundos
        {
            "$match": {
                "idStation": idStation,
                "timestamp": {
                    "$exists": true,
                    "$nin": [null, "NaN"]
                }
            }
        },
        {
            "$project": {
                _id: 1, pm10: 1, avgPM10: 1, 
                "year": { "$year": "$timestamp" },
                "month": { "$month": "$timestamp" },
                "dayOfMonth": { "$dayOfMonth": "$timestamp" }
            }
        },
        {
            "$group": {
                _id: {
                    "year": "$year",
                    "month": "$month",
                    "dayOfMonth": "$dayOfMonth"
                },
                avgPM10: { $avg: "$pm10" },
               // max:{$max : "$pm10"} recuerda añadir a project

            }
        },

        { "$sort": { _id: 1 } }
    ]);//.limit(50);//cuidado con el limit , saldrán mas registros poniendo group.
    
   // return res.json(aires);
          return res.json(
            {
                "name": idStation,
                "data": toMilisegundos(aires)
            }
        );  
};

airMCtrl.getAirMeasurement_pm10_batchanual = async (req, res, next) => {
    const { idStation } = req.params;
    const aires = await AirMeasurement.aggregate([
        //timestamp PARA EN PROJECT coger año, mes y día necesita formato DATE, no milisegundos
        {
            "$match": {
                "idStation": idStation,
                "timestamp": {
                    "$exists": true,
                    "$nin": [null, "NaN"]
                }
            }
        },
        {
            "$project": {
                _id: 1, pm10: 1, avgPM10: 1,
                "year": { "$year": "$timestamp" }
            }
        },
        //mongoose group by time series
        {
            "$group": {
                _id: {
                    "year": "$year"
                },
                avgPM10: { $avg: "$pm10" },

            }
        },
        { "$sort": { _id: 1 } }
    ]);//.limit(500);//cuidado con el limit , saldrán mas registros poniendo group.
  //return res.json(aires);
        return res.json(
            {
                "name": idStation,
                "data": toMilisegundosAnual(aires)
            }
        );  
};

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