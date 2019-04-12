var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var empleadoSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    puesto:{ type: String, required: false },
   rol:{ type: String, required: false },
  aparador: { type: Schema.Types.ObjectId, ref: 'Aparador' },
}, { collection: 'empleados' });



module.exports = mongoose.model('Empleados', empleadoSchema);