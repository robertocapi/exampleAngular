var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Usuario = require('../models/usuario');

// ==========================================
// Obtener todos los usuarios
// ==========================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Usuario.find({}, 'nombre email img role google')
        .skip(desde)
        .limit(5)
        .exec(
            (err, usuarios) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuario',
                        errors: err
                    });
                }

                Usuario.count({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        usuarios: usuarios,
                        total: conteo
                    });

                })




            });
});


// ==========================================
// Actualizar usuario
// ==========================================
app.put('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_o_MismoUsuario], (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }


        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;
        usuario.descripcion = body.descripcion;
        usuario.calleynumero = body.calleynumero;
        usuario.colonia = body.colonia;
        usuario.delegacion = body.delegacion;
        usuario.estado = body.estado;
        usuario.codigopostal = body.codigopostal;
         usuario.categoria = body.categoria;
        usuario.etiquetas = body.etiquetas;
        usuario.enlance1 = body.enlance1;
        usuario.enlance2 = body.enlance2;
        usuario.enlance3 = body.enlance3;
        usuario.enlance4 = body.enlance4;
        usuario.telefono1 = body.telefono1;
        usuario.telefono2 = body.telefono2;
        usuario.telefono3 = body.telefono3;
        usuario.telefono4 = body.telefono4;
        usuario.hlunesapertura = body.hlunesapertura;
        usuario.hlunescierre = body.hlunescierre;
        usuario.hmartesapertura = body.hmartesapertura;
        usuario.hmartescierre = body.hmartescierre;
        usuario.hmiercolesapertura = body.hmiercolesapertura;
        usuario.hmiercolescierre = body.hmiercolescierre;
        usuario.hjuevesapertura = body.hjuevesapertura;
        usuario.hjuevescierre = body.hjuevescierre;
        usuario.hviernesapertura = body.hviernesapertura;
        usuario.hviernescierre = body.hviernescierre;
        usuario.hsabadoapertura = body.hsabadoapertura;
        usuario.hsabadocierre = body.hsabadocierre;
        usuario.hdomingoapertura = body.hdomingoapertura;
        usuario.hdomingocierre = body.hdomingocierre;
      


        usuario.save((err, usuarioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ':)';

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });

        });

    });

});



// ==========================================
// Crear un nuevo usuario
// ==========================================
app.post('/', (req, res) => {

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role,
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
    });

    usuario.save((err, usuarioGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuariotoken: req.usuario
        });


    });

});


// ============================================
//   Borrar un usuario por el id
// ============================================
app.delete('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {

    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar usuario',
                errors: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese id',
                errors: { message: 'No existe un usuario con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

});


module.exports = app;