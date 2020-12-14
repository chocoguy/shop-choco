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

export { protect }