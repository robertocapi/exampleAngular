var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Publicacion = require('../models/publicacion');

// ==========================================
// Obtener todos los publicaciones
// ==========================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Publicacion.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .exec(
            (err, publicaciones) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando publicacion',
                        errors: err
                    });
                }

                Publicacion.count({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        publicaciones: publicaciones,
                        total: conteo
                    });
                })

            });
});

// ==========================================
//  Obtener Publicacion por ID
// ==========================================
app.get('/:id', (req, res) => {

    var id = req.params.id;

    Publicacion.findById(id)
        .populate('usuario', 'nombre img email')
        .exec((err, publicacion) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar publicacion',
                    errors: err
                });
            }

            if (!publicacion) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El publicacion con el id ' + id + 'no existe',
                    errors: { message: 'No existe un publicacion con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                publicacion: publicacion
            });
        })
})





// ==========================================
// Actualizar Publicacion
// ==========================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Publicacion.findById(id, (err, publicacion) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar publicacion',
                errors: err
            });
        }

        if (!publicacion) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El publicacion con el id ' + id + ' no existe',
                errors: { message: 'No existe un publicacion con ese ID' }
            });
        }


        publicacion.nombre = body.nombre;
        publicacion.usuario = req.usuario._id;

        publicacion.save((err, publicacionGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar publicacion',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                publicacion: publicacionGuardado
            });

        });

    });

});



// ==========================================
// Crear un nuevo publicacion
// ==========================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var publicacion = new Publicacion({
        nombre: body.nombre,
        usuario: req.usuario._id
    });

    publicacion.save((err, publicacionGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear publicacion',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            publicacion: publicacionGuardado
        });


    });

});


// ============================================
//   Borrar un publicacion por el id
// ============================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Publicacion.findByIdAndRemove(id, (err, publicacionBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar publicacion',
                errors: err
            });
        }

        if (!publicacionBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un publicacion con ese id',
                errors: { message: 'No existe un publicacion con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            publicacion: publicacionBorrado
        });

    });

});


module.exports = app;