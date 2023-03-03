const jwt = require("jsonwebtoken");
const User = require("../models/userModal");

const requireAuth = async (req,res,next) => {
    // verifyauthentication
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error: "authorized required"});
    }
    const token = authorization.split(" ")[1];
    try{
        const {id} = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findOne({_id: id}).select("_id")
        next();
    } catch(error){
        res.status(401).json({error: "token is invalid"});
    }
}

module.exports = requireAuth;