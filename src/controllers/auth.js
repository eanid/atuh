const {create, find,verification} = require("../models/users");
const { v4: uuidv4 } =  require('uuid');
const argon2 = require("argon2");
const { use } = require("../routes");

const AuthController = {
    insert: async (req,res,next) => {
        // console.log("authController insert")
        const { email, password, name} = req.body;
        const hashPassword = await argon2.hash(password);
        const otp =  Math.floor(100000 + Math.random() * 900000);

        const data = {
            uuid: uuidv4(),
            email,
            password:hashPassword,
            name,
            otp
        }

        try{
            let {rows:[users]} = await find('email',email)
            if(users){
                throw "email already register, please login"
            }
        const result = await create(data)
        delete data.password
        delete data.otp

        if(result){
            res.status(201).json({status:200,messages:"register successfully",data})
        } else{
            res.status(400).json({status:200,messages:result.messages})
        }

        } catch(error){
            console.log(error)
            res.status(400).json({status:400,messages:error})
        }
    },
    login: async (req,res,next)=>{
        // console.log("authController login")
        const { email, password} = req.body;

        try{
            let {rows:[users]} = await find('email',email)
            if(!users){
                throw "user not find, please register"
            }
            console.log(users)
            
            let validation = await argon2.verify(users.password,password)
            if(!validation){
                throw "wrong password"
            }

            let data = {
                uuid : users.uuid,
                email : users.email,
                name : users.name,
            }

            res.status(200).json({status:200,messages:"login success", data})
            
        } catch(error){
            console.log(error)
            res.status(400).json({status:400,messages:error})
        }
    },
}

exports.AuthController = AuthController;