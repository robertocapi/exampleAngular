// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app=require('./app');
var port = 3000;

// Inicializar variables
var app = express();


// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});


// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var publicacionRoutes = require('./routes/publicacion');
var aparadorRoutes = require('./routes/aparador');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');


// Conexión a la base de datos
mongoose.set('useCreateIndex', true);
//conexion a la base de datos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/eseety2',{ useNewUrlParser:true, useMongoClient: true})


.then(()=>{
    console.log("La conexion a la base de datos se ha realizado correctamente")

 //  crear servidor
    app.listen(port, ()=>{
        console.log("servidor corriendo en http://localhost:3000");
    });


    // app.listen(process.env.PORT || 3000, function(){
    //     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    //   });
 })
.catch(err => console.log(err));

// Server index config
// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));



// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/publicacion', publicacionRoutes);
app.use('/aparador', aparadorRoutes);
app.use('/login', loginRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);

app.use('/', appRoutes);


// Escuchar peticiones
app.listen(3800, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});