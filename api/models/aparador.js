var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var aparadorSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    descripcion : { type: String, required: [false, 'La descripcion es necesario'] },
    calleynumero: { type: String, required: [false, 'La Calle y numero  es necesario'] },
    colonia:{ type: String, required: false },
    delegacion:{ type: String, required: false },
   estado:{ type: String, required: false },
   codigopostal:{ type: String, required: false },
   categoria:{ type: String, required: false },
    etiquetas:{ type: String, required: false },
    enlance1:{ type: String, required: false },
    enlance2:{ type: String, required: false },
    enlance3:{ type: String, required: false },
    enlance4:{ type: String, required: false },
    telefono1:{ type: String, required: false },
    telefono2:{ type: String, required: false },
    telefono3:{ type: String, required: false },
    telefono4:{ type: String, required: false },
    hlunesapertura:{ type: String, required: false },
    hlunescierre:{ type: String, required: false },
    hmartesapertura:{ type: String, required: false },
    hmartescierre:{ type: String, required: false },
    hmiercolesapertura:{ type: String, required: false },
    hmiercolescierre:{ type: String, required: false },
    hjuevesapertura:{ type: String, required: false },
    hjuevescierre:{ type: String, required: false },
    hviernesapertura:{ type: String, required: false },
    hviernescierre:{ type: String, required: false },
    hsabadoapertura:{ type: String, required: false },
    hsabadocierre:{ type: String, required: false },
    hdomingoapertura:{ type: String, required: false },
    hdomingocierre:{ type: String, required: false },
    forma_pago:{ type: String, required: false },
    latitud:{ type: String, required: false },
    longitud:{ type: String, required: false },
     img: { type: String, required: false },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
   /* publicacion: {
        type: Schema.Types.ObjectId,
        ref: 'Aparador',
        required: [true, 'El id aparador esun campo obligatorio ']
    }*/
}, { collection: 'aparadores' });


module.exports = mongoose.model('Aparadores', aparadorSchema);