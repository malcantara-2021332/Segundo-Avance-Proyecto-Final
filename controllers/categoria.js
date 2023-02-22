//Importacion de express
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelo
const Categoria = require('../models/categoria');


const getCategoria = async (req = request, res = response) => {

    //Condicion, buscar ususarios que tengan estado en true
    const query = { estado: true };

    const listaCategorias = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
    ]);

    res.json({
        msg: 'GET API de categoria',
        listaCategorias
    });
}
const postCategoria = async (req = request, res = response) => {
    const { nombre, proveedor, descripcion, contacto } = req.body;

    const categoriaDB = new Categoria({ nombre, proveedor, descripcion, contacto })

    //Guardar el registro en base de datos
    await categoriaDB.save();

    res.json({
        msg: 'POST API de categorias',
        categoriaDB
    });
}
const putCategoria = async (req = request, res = response) => {
    const { id } = req.params;

    const { _id, estado, ...resto } = req.body;
    
    //Editar y guardar
    const categoriaEditada = await Categoria.findByIdAndUpdate(id, resto);
    
    res.json({
        msg: 'PUT API de categorias',
        categoriaEditada
    });
}
const deleteCategoria = async (req = request, res = response) => {

    const { id } = req.params;

    //Eliminar fisicamente y guardar
    const categoriaEliminada = await Categoria.findByIdAndDelete(id);

    res.json({
        msg: 'DELETE API de usuarios',
        categoriaEliminada
    });
}

module.exports = {
    getCategoria,
    postCategoria,
    putCategoria,
    deleteCategoria
}