const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const md5 = require("md5")

// model petugas
const petugas = require("../models/index").petugas
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.post("/login", async (req, res) => {
    let parameter = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await petugas.findOne({where: parameter})
    if(result === null){
        res.json({
            logged: false,
            message: "Invalid Username or Password"
        })
    }else{
        let jwtHeader = {
            algorithm: "HS256",
            expiresIn: "24h"
        }

        let payload = {data: result}
        let secretKey = "azinzin"

        let token = jwt.sign(payload, secretKey, jwtHeader)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }
}) 


module.exports = app