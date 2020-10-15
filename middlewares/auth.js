
const jwt = require('jsonwebtoken');

const validateToken = (request, response, next) => {
    // middleware para validar el token 

    const authorization = request.headers.authorization.split(" ");
    const token  = authorization[1];
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        if(decoded){
            next();
        }
    }catch(error){
        console.log(error);
        response.status(401).json({message: "El token ha expirado"});
    }
}

module.exports = validateToken;