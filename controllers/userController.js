import User from '../model/userModel.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


const checkToken = (async (req, res, next) => {
    try{
        let token

                token = req.headers.authorization.split(' ')[1]

                console.log(token)
    
                const decoded = jwt.verify(token, process.env.JWT_SECRET)

                console.log(decoded)
    
                currentUser = await User.findById(decoded.id).select('-password')

                console.log(currentUser)


                return currentUser
                //console.log(decoded)

    }catch(error){
        res.status(401).json({"error" : "no token"})
        return
    }
})


// /api/products


const authUser = (async (req, res, next) => {
    try{
        const { email, password } = req.body


        const user = await User.findOne({email})

        
        const authResult =  await bcrypt.compare(req.body.password, user.password)
        console.log(authResult)

        if(user && authResult){
            res.json({
                _id : user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        } else{
            res.status(401).json({"error" : "Invalid user!"})
            return
        }

        //res.send({
         //   email,
          //  password
        //})
    }catch(error){
        console.log("Error occured at userController.js" + error);
    }
});



const getUserProfile = (async (req, res, next) => {
    try{
       
        let currentUser = await User.findById(req.user._id)

 

        if(currentUser){
            res.json({
                _id : currentUser._id,
                name: currentUser.name,
                email: currentUser.email,
                isAdmin: currentUser.isAdmin,
            })

        }else{
            res.status(400).json({"error" : "User may or may not exist"})
        }

        //res.send({
         //   email,
          //  password
        //})
    }catch(error){
        res.status(400).json({"error" : "stuff occured"})
        console.log("Error occured at userController.jay" + error); //fix this: Error occured at userController.jsError [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    }
});



const updateUserProfile = (async (req, res, next) => {
    try{
       
        let currentUser = await User.findById(req.user._id)

        if(currentUser){
            currentUser.name = req.body.name || currentUser.name
            currentUser.email = req.body.email || currentUser.email
            if(req.body.password) {
                const salt = await bcrypt.genSalt(10)
                let saltedPassword = await bcrypt.hash(req.body.password, salt)
         
                currentUser.password = saltedPassword
            }

            const updatedUser = await currentUser.save()

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id),

            })

        }else{
            res.status(400).json({"error" : "User may or may not exist"})
        }

        //res.send({
         //   email,
          //  password
        //})
    }catch(error){
        res.status(400).json({"error" : "stuff occured"})
        console.log("Error occured at userController.jay" + error); //fix this: Error occured at userController.jsError [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    }
});




const registerUser = (async (req, res, next) => {
    try{
        const { name, email} = req.body


        const userExists = await User.findOne({email})

        if(userExists){
           throw error
        }

        const salt = await bcrypt.genSalt(10)
       let password = await bcrypt.hash(req.body.password, salt)

        const user = await User.create({
            name,
            email,
            password
        })

        if(user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        }else{
            throw error
        }

    }catch(error){
        res.status(400).json({"error" : "error at registerUser"})
        console.log("Error occured at userController.js" + error);
    }
});

//http://localhost:5000/api/users
const getUsers = (async (req, res, next) => {
    try{
        const users = await User.find({})
        res.json(users);
       
        
    }catch(error){
        res.status(400).json({"error" : "stuff occured"})
        console.log("Error occured at userController.admin" + error); //fix this: Error occured at userController.jsError [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    }
});


//http://localhost:5000/api/users
const deleteUser = (async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id)
        if(user){
            await user.remove()
            res.json({ "message" : "user removed!" })
        }else{
            return res.status(404).json({"error" : "user not found"})
        }
       
        
    }catch(error){
        res.status(400).json({"error" : "stuff occured"})
        console.log("Error occured at userController.admin" + error); //fix this: Error occured at userController.jsError [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    }
});


//http://localhost:5000/api/users
const getUserById = (async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id).select('-password')

        if(user){
            res.json(user);   
        }
       
        
    }catch(error){
        res.status(400).json({"error" : "stuff occured"})
        console.log("Error occured at userController.admin" + error); //fix this: Error occured at userController.jsError [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    }
});




const updateUser = (async (req, res, next) => {
    try{
       
        let currentUser = await User.findById(req.params.id)

        if(currentUser){
            currentUser.name = req.body.name || currentUser.name
            currentUser.email = req.body.email || currentUser.email
            currentUser.isAdmin = req.body.isAdmin

            const updatedUser = await currentUser.save()

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,

            })

        }else{
            res.status(400).json({"error" : "User may or may not exist"})
        }

        //res.send({
         //   email,
          //  password
        //})
    }catch(error){
        res.status(400).json({"error" : "stuff occured"})
        console.log("Error occured at userController.jay" + error); //fix this: Error occured at userController.jsError [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    }
});



export {authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser}

