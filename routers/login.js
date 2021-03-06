const express = require("express")
const md5 = require('md5')
const login = express()
login.use(express.json())
const jwt = require("jsonwebtoken")
const secretKey = "underpressure"

const models = require("../models/index")
const user = models.users

login.post('/', async(request, response) => {
    let newLogin = {
        username : request.body.username, 
        password : md5(request.body.password)
    }
    let dataUser = await user.findOne({
        where : newLogin
    })

    if(dataUser){
        let payload = JSON.stringify(dataUser)
        let token = jwt.sign(payload,secretKey)
        return response.json({
            logged: true,
            token: token
        })
    } else {
        return response.json({
            logged: false,
            message: `Invalid username or password`
        })
    }
})

// fungsi auth digunakan untuk memverifikasi token yang dikirimkan
const auth = (request, response, next) => {
    // kita dapatkan data authorization
    let header = request.headers.authorization
    // header = Bearer token yang dikirimkan

    // kita ambil data tokennya
    let token = header && header.split(" ")[1]

    if(token == null){
        // jika tokennya kosong
        return response.status(401).json({
            message: `Unauthorized`
        })        
    }else {
        let jwtHeader = {
            algorithm: "HS256"
        }

        // verifikasi token yang telah diberikan
        jwt.verify(token, secretKey, jwtHeader, error => {
            if(error){
                return response.status(401).json({
                    message: `Invalid token`
                })
            }else {
                next()
            }
        })
    }
}
module.exports = { login, auth }
