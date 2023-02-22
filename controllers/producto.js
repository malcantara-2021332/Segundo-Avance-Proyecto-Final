//Importacion de express
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelo
const Producto = require('../models/producto');


const getProducto = async (req = request, res = response) => {

    //Condicion, buscar ususarios que tengan estado en true
    const query = { estado: true };

    const listaProductos = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
    ]);

    res.json({
        msg: 'GET API de productos',
        listaProductos
    });
}

const postProducto = async (req = request, res = response) => {
    const {nombre, descripcion, unidadesDisponibles} = req.body;

    const productoDB = new Producto({nombre, descripcion, unidadesDisponibles})

    //Guardar el registro en base de datos
    await productoDB.save();

    res.json({
        msg: 'POST API de productos',
        productoDB
    });
}

const putProducto = async (req = request, res = response) => {
    const { id } = req.params;

    const { _id, estado, ...resto } = req.body;
    
    //Editar y guardar
    const productoEditado = await Producto.findByIdAndUpdate(id, resto);
    
    res.json({
        msg: 'PUT API de productos',
        productoEditado
    });
}

const deleteProducto = async (req = request, res = response) => {

    const { id } = req.params;

    //Eliminar fisicamente y guardar
    const productoEliminado = await Producto.findByIdAndDelete(id);

    res.json({
        msg: 'DELETE API de productos',
        productoEliminado
    });
}

module.exports = {
    getProducto,
    postProducto,
    putProducto,
    deleteProducto
}