const express = require("express")
const md5 = require("md5")

const app = express()

const petugas = require("../models/index").petugas

app.use(express.urlencoded({extended:true}))

//auth
const verifyToken = require("./verifyToken")
app.use(verifyToken)

//endpoin
app.get("/", async(req, res) => {
    petugas.findAll()
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/", async(req, res) => {
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        nama_petugas: req.body.nama_petugas,
        level: req.body.level,
        
    }

    petugas.create(data)
    .then(result => {
        res.json({
            message: "data telah di masukan",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.put("/", async(req, res) => {
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        nama_petugas: req.body.nama_petugas,
        level: req.body.level,
    }

    let parameter = {
        id_petugas: req.body.id_petugas
    }

    petugas.update(data, {where:parameter})
    .then(result => {
        res.json({
            message: "data telah di perbarui",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:id_petugas", async(req, res) => {
    let id_petugas = req.params.id_petugas
    let perameter = {
        id_petugas: id_petugas
    }

    petugas.destroy({where : perameter})
    .then(result => {
        res.json({
            message: "data telah di hapus",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

module.exports = app