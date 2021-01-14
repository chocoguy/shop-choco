import jwt from 'jsonwebtoken'
import User from '../model/userModel.js'

const protect = async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try{
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')



            //console.log(decoded)

            next()

        }catch(error){
            res.status(401).json({"error" : "no token"})
            console.log(error)
            return
        }
    }else{
        res.status(401).json({"error" : "no token"})
        return
    }
} 


const isAdmin = async (req, res, next) => {
    try{
 
        console.log(req.user.isAdmin)
        let adminstuff = req.user.isAdmin.toString();
        console.log(`assmin? ${adminstuff}`)
        if(req.user && adminstuff == "true"){
            console.log("Admin")
            next()
        }
        else{
            console.log("Not admin")
            throw "not an admin"
        }

    }catch(error){
        res.status(401).json({"Error" : "user is not admin this incident will be reported"})
        console.log(error)
        return
    }
}

export { protect, isAdmin }