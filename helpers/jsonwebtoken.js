

const jwt = require('jsonwebtoken');

//debe de recibir lo que va en el paylod del token
const generarJWT = ( uid, name) => {

  return new Promise( (resolve, reject) => {

    const payload = {
      uid,
      name
    }

    // aca hacemos nuestra signature (nuestra firma), 
    // jwt.sign (mensaje, clave, expiracion)
    jwt.sign( payload, process.env.SECRET_JWT_SEED, {
      expiresIn: '1h',

    }, (err,token) => {
      if(err){
        console.log(err)
        reject('no se pudo generar el token')
      }
      
      resolve( token )
    })


  })


}

module.exports = {generarJWT}