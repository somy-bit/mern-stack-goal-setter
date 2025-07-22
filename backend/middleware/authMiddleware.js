const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const user = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {

    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try{
            token = req.headers.authorization.split(' ')[1]
            if(token){
                const decoded = jwt.verify(token,process.env.JWT_SECRET);
                req.user = await user.findById(decoded.id).select('-password');
                next();
            }else{
                res.status(401);
                throw new Error('Not authorized, no token');
            }

        }catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }
    if(!token){
        res.status(401);
        throw new Error('Not authorized, no token');
    }   

})

module.exports = { protect };