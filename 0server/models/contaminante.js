
const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

let ContaminanteSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    editable:  {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Contaminante', ContaminanteSchema);