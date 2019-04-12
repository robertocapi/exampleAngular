var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Empleado = require('../models/empleado');

// ==========================================
// Obtener todos los empleados
// ==========================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Empleado.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('publicacion')
        .exec(
            (err, empleados) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando empleado',
                        errors: err
                    });
                }

                Empleado.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        empleados: empleados,
                        total: conteo
                    });

                })

            });
});

// ==========================================
// Obtener Empleado
// ==========================================
app.get('/:id', (req, res) => {

    var id = req.params.id;

    Empleado.findById(id)
        .populate('usuario', 'nombre email img')
        .populate('publicacion')
        .exec((err, empleado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar empleado',
                    errors: err
                });
            }

            if (!empleado) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El empleado con el id ' + id + ' no existe',
                    errors: { message: 'No existe un empleado con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                empleado: empleado
            });

        })


});

// ==========================================
// Actualizar Empleado
// ==========================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Empleado.findById(id, (err, empleado) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar empleado',
                errors: err
            });
        }

        if (!empleado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El empleado con el id ' + id + ' no existe',
                errors: { message: 'No existe un empleado con ese ID' }
            });
        }



        empleado.usuario = req.usuario._id;
        empleado.aparador = req.aparador._id;
        empleado.puesto = body.puesto;
        empleado.rol = body.rol;
    
      
      

        empleado.save((err, empleadoGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar empleado',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                empleado: empleadoGuardado
            });

        });

    });

});



// ==========================================
// Crear un nuevo empleado
// ==========================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var empleado = new Empleado({
        puesto: body.puesto,
        rol: body.rol,
        usuario: req.usuario._id,
       aparador: req.aparador._id,
     
    });

    empleado.save((err, empleadoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear empleado',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            empleado: empleadoGuardado
        });


    });

});


// ============================================
//   Borrar un empleado por el id
// ============================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Empleado.findByIdAndRemove(id, (err, empleadoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar empleado',
                errors: err
            });
        }

        if (!empleadoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un empleado con ese id',
                errors: { message: 'No existe un empleado con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            empleado: empleadoBorrado
        });

    });

});


module.exports = app;