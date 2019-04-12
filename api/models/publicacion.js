var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var publicacionSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, required: false },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    updated: String,
    created: String,
}, { collection: 'publicaciones' });



module.exports = mongoose.model('publicacion', publicacionSchema);