const jwt = require('jsonwebtoken');
// require('dotenv').config()

const SECRET_KEY = "Party-Event"


const setAdmin = (user) => {
      
    payload = {
        adminId: user.adminId,
    }

    const token = jwt.sign(payload,SECRET_KEY)

    return token;
}




const getAdmin = (token) => {
    
    return jwt.verify(token, SECRET_KEY);
}



module.exports = {
    setAdmin, 
    getAdmin,
}