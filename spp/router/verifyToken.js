const jwt = require("jsonwebtoken")

verifyToken = (req, res, next) => {
    let headers = req.headers.authorization
    let token = null

    if(headers != null){
        token = headers.split(" ")[1]
        // headers = Bearer kode_token
        // split -> untuk mengkonversi string menjadi array
        // array = ["Bearer", "kode_token"]
    }

    if(token == null){
        res.json({
            message: "Unauthorized"
        })
    }else{
        let jwtHeader = {
            algorithm: "HS256"
        }

        let secretKey = "azinzin"

        jwt.verify(token, secretKey, jwtHeader, err => {
            if(err){
                res.json({
                    message: "Invalid"
                })
            }else{
                next()
            }
        })
    }
}

module.exports = verifyToken