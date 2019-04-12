var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Aparador = require('../models/aparador');

// ==========================================
// Obtener todos los aparadores
// ==========================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Aparador.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('publicacion')
        .exec(
            (err, aparadores) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando aparador',
                        errors: err
                    });
                }

                Aparador.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        aparadores: aparadores,
                        total: conteo
                    });

                })

            });
});

// ==========================================
// Obtener Aparador
// ==========================================
app.get('/:id', (req, res) => {

    var id = req.params.id;

    Aparador.findById(id)
        .populate('usuario', 'nombre email img')
        .populate('publicacion')
        .exec((err, aparador) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar aparador',
                    errors: err
                });
            }

            if (!aparador) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El aparador con el id ' + id + ' no existe',
                    errors: { message: 'No existe un aparador con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                aparador: aparador
            });

        })


});

// ==========================================
// Actualizar Aparador
// ==========================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Aparador.findById(id, (err, aparador) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar aparador',
                errors: err
            });
        }

        if (!aparador) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El aparador con el id ' + id + ' no existe',
                errors: { message: 'No existe un aparador con ese ID' }
            });
        }


        aparador.nombre = body.nombre;
        aparador.usuario = req.usuario._id;
        aparador.descripcion = body.descripcion;
        aparador.calleynumero = body.calleynumero;
        aparador.colonia = body.colonia;
        aparador.delegacion = body.delegacion;
        aparador.estado = body.estado;
        aparador.codigopostal = body.codigopostal;
         aparador.categoria = body.categoria;
        aparador.etiquetas = body.etiquetas;
        aparador.enlance1 = body.enlance1;
        aparador.enlance2 = body.enlance2;
        aparador.enlance3 = body.enlance3;
        aparador.enlance4 = body.enlance4;
        aparador.telefono1 = body.telefono1;
        aparador.telefono2 = body.telefono2;
        aparador.telefono3 = body.telefono3;
        aparador.telefono4 = body.telefono4;
        aparador.hlunesapertura = body.hlunesapertura;
        aparador.hlunescierre = body.hlunescierre;
        aparador.hmartesapertura = body.hmartesapertura;
        aparador.hmartescierre = body.hmartescierre;
        aparador.hmiercolesapertura = body.hmiercolesapertura;
        aparador.hmiercolescierre = body.hmiercolescierre;
        aparador.hjuevesapertura = body.hjuevesapertura;
        aparador.hjuevescierre = body.hjuevescierre;
        aparador.hviernesapertura = body.hviernesapertura;
        aparador.hviernescierre = body.hviernescierre;
        aparador.hsabadoapertura = body.hsabadoapertura;
        aparador.hsabadocierre = body.hsabadocierre;
        aparador.hdomingoapertura = body.hdomingoapertura;
        aparador.hdomingocierre = body.hdomingocierre;
        aparador.img = body.img;
      
      

        aparador.save((err, aparadorGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar aparador',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                aparador: aparadorGuardado
            });

        });

    });

});



// ==========================================
// Crear un nuevo aparador
// ==========================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var aparador = new Aparador({
        nombre: body.nombre,
        descripcion: body.descripcion,
        calleynumero: body.calleynumero,
        colonia: body.colonia,
        delegacion: body.delegacion,
        estado: body.estado,
        codigopostal: body.codigopostal,
        categoria: body.categoria,
        etiquetas: body.etiquetas,
        enlance1: body.enlance1,
        enlance2: body.enlance2,
        enlance3: body.enlance3,
        enlance4: body.enlance4,
        telefono1: body.telefono1,
        telefono2: body.telefono2,
        telefono3: body.telefono3,
        telefono4: body.telefono4,
        hlunesapertura: body.hlunesapertura,
        hlunescierre: body.hlunescierre,
        hmartesapertura: body. hmartesapertura,
        hmartescierre: body.hmartescierre,
        hmiercolesapertura: body.hmiercolesapertura,
        hmiercolescierre: body.hmiercolescierre,
        hjuevesapertura: body.hjuevesapertura,
        hjuevescierre: body.hjuevescierre,
        hviernesapertura: body.hviernesapertura,
        hviernescierre: body.hviernescierre,
        hsabadoapertura: body.hsabadoapertura,
        hsabadocierre: body.hsabadocierre,
        hdomingoapertura: body.hdomingoapertura,
        hdomingocierre: body.hdomingocierre,
        forma_pago: body.forma_pago,
        sitioweb: body.sitioweb,
        latitud: body.latitud,
        longitud: body.longitud,
       img: body.img,
        usuario: req.usuario._id,
     
    });

    aparador.save((err, aparadorGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear aparador',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            aparador: aparadorGuardado
        });


    });

});


// ============================================
//   Borrar un aparador por el id
// ============================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Aparador.findByIdAndRemove(id, (err, aparadorBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar aparador',
                errors: err
            });
        }

        if (!aparadorBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un aparador con ese id',
                errors: { message: 'No existe un aparador con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            aparador: aparadorBorrado
        });

    });

});


module.exports = app;