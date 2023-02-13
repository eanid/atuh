const Pool = require("../config/db");

const create = (data) => {
    const {uuid,email,password,name,otp} = data
    return new Promise ((resolve,reject)=>
        Pool.query(`INSERT INTO users(uuid,email,password,name,otp) VALUES('${uuid}','${email}','${password}','${name}','${otp}')`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
    })
    )
}

const find = (by,item) => {
    console.log(by,item)
    return new Promise ((resolve,reject)=>
        Pool.query(`SELECT * FROM users where ${by}='${item}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
    }))
}

const verif = (email) => {
    return new Promise ((resolve,reject)=>
        Pool.query(`UPDATE users SET active=1 WHERE "email"='${email}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
    }))
}

module.exports = {create,find,verif}