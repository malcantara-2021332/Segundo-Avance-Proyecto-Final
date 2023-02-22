const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    unidadesDisponibles: {
        type: String,
        required: [true, 'Cuantas unidades hay es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Producto', ProductoSchema)