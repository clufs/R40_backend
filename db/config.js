const mongoose = require('mongoose');

const DBconnect = async() => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log('YEY! DB ONLINE!')


  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la base de datos')
  }
}

module.exports = {
  DBconnect
}


