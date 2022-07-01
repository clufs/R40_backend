const { Client } = require("../models/clients");

const createNewClient = async (req, res = express.response) => {

  try {
    const client =  new Client(req.body);
    
    await client.save();

    res.json({
      ok: true,
      msg: 'Se agrego el nuevo cliente. :)',
      client
    })
  } catch (error) {
    console.log(error)
    res.json({
      ok: false,
      msg: 'Por favor hable con el adm',
    })
  }
};


const getAllClients = async (req, res = express.response) => {
  try {
    const clients = await Client.find();
    
    res.json({
      ok: true,
      msg: 'Se obtuvieron los clientes',
      clients
    })

  } catch (error) {
    console.log(error);
    res.json({
      ok:false,
      msg: 'Por favor hable con el adm',
    })
  }
}

module.exports = { createNewClient, getAllClients };