var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};


var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
    password: { type: String, required: [true, 'La contraseña es necesaria'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos },
    google: { type: Boolean, required: true, default: false },
    descripcion : { type: String, required: false },
    calleynumero:{ type: String, required: false },
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
    latitud:{ type: String, required: false },
    longitud:{ type: String, required: false },
});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);