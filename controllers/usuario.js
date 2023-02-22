//Importacion de express
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelo
const Usuario = require('../models/usuario');


const getUsuario = async (req = request, res = response) => {

    //Condicion, buscar ususarios que tengan estado en true
    const query = { estado: true };

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: 'GET API de categoria',
        listaUsuarios
    });
}

const postUsuario = async (req = request, res = response) => {
    const {nombre, correo, password, contacto, rol} = req.body;

    const usuarioDB = new Usuario({nombre, correo, password, contacto, rol})

    //Guardar el registro en base de datos
    await usuarioDB.save();

    res.json({
        msg: 'POST API de usuarios',
        usuarioDB
    });
}

const putUsuario = async (req = request, res = response) => {
    const { id } = req.params;

    const { _id, estado, ...resto } = req.body;
    
    //Editar y guardar
    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);
    
    res.json({
        msg: 'PUT API de categorias',
        usuarioEditado
    });
}

const deleteUsuario = async (req = request, res = response) => {

    const { id } = req.params;

    //Eliminar fisicamente y guardar
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    res.json({
        msg: 'DELETE API de usuarios',
        usuarioEliminado
    });
}

module.exports = {
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}