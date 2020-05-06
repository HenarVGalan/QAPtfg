const express = require('express');
//const cors = require('cors');
const app = express();

const { mongoose } = require('./database');

// Settings
/* al desplegar , el servicio de la nube nos dará un puerto */
/*  */
app.set('port', process.env.PORT || 3000);

// Middlewares
// app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());

// Routes
app.use('/api/airMeasurement', require('./routes/airMeasurement.routes'));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});
