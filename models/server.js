//Configuracion del server
//Importaciones basicas
const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');


class Server {
    constructor() {
        //Variables de configuracion
        this.app = express();
        this.port = process.env.PORT;
        this.categoriaPath = '/api/categoria';
        this.productoPath = '/api/producto';
        this.usuarioPath = '/api/usuario'

        //Conectar
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();        
    }

    //Metodo de conection a Mongo
    async conectarDB(){
        await dbConection();
    }

    middlewares(){
        //Cors
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico del proyecto
        this.app.use(express.static('public'));
    }

    routes(){
        //Referencia al archivo con las rutas
        this.app.use(this.categoriaPath, require('../routes/categoria'));
        this.app.use(this.productoPath, require('../routes/producto'));
        this.app.use(this.usuarioPath, require('../routes/usuario'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en pueto ${this.port}`)
        })
    }

}

module.exports = Server;