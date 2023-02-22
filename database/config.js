const mongoose = require('mongoose');

const dbConection = async() => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Base de Datos Conectada');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al momento de connectar la base de datos');
    }
}

module.exports = {
    dbConection
}