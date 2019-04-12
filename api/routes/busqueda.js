var express = require('express');

var app = express();

var Publicacion = require('../models/publicacion');
var Aparador = require('../models/aparador');
var Usuario = require('../models/usuario');

// ==============================
// Busqueda por colección
// ==============================
app.get('/coleccion/:tabla/:busqueda', (req, res) => {

    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    var regex = new RegExp(busqueda, 'i');

    var promesa;

    switch (tabla) {

        case 'usuarios':
            promesa = buscarUsuarios(busqueda, regex);
            break;

        case 'aparadors':
            promesa = buscarMedicos(busqueda, regex);
            break;

        case 'publicaciones':
            promesa = buscarPublicaciones(busqueda, regex);
            break;

        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda sólo son: usuarios, aparadors y publicaciones',
                error: { message: 'Tipo de tabla/coleccion no válido' }
            });

    }

    promesa.then(data => {

        res.status(200).json({
            ok: true,
            [tabla]: data
        });

    })

});


// ==============================
// Busqueda general
// ==============================
app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');


    Promise.all([
            buscarPublicaciones(busqueda, regex),
            buscarMedicos(busqueda, regex),
            buscarUsuarios(busqueda, regex)
        ])
        .then(respuestas => {

            res.status(200).json({
                ok: true,
                publicaciones: respuestas[0],
                aparadores: respuestas[1],
                usuarios: respuestas[2]
            });
        })


});


function buscarPublicaciones(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Publicacion.find({ nombre: regex })
            .populate('usuario', 'nombre email img')
            .exec((err, publicaciones) => {

                if (err) {
                    reject('Error al cargar publicaciones', err);
                } else {
                    resolve(publicaciones)
                }
            });
    });
}

function buscarMedicos(busqueda, regex) {

    return new Promise((resolve, reject) => {

       Aparador.find({ nombre: regex })
            .populate('usuario', 'nombre email img')
            .populate('publicacion')
            .exec((err, aparadores) => {

                if (err) {
                    reject('Error al cargar aparadores', err);
                } else {
                    resolve(aparadores)
                }
            });
    });
}

function buscarUsuarios(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Usuario.find({}, 'nombre email role img')
            .or([{ 'nombre': regex }, { 'email': regex }])
            .exec((err, usuarios) => {

                if (err) {
                    reject('Erro al cargar usuarios', err);
                } else {
                    resolve(usuarios);
                }


            })


    });
}



module.exports = app;