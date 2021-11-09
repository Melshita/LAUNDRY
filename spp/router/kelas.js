const express = require("express")
const app = express()

const kelas = require("../models/index").kelas

app.use(express.urlencoded({extended:true}))

//auth
const verifyToken = require("./verifyToken")
app.use(verifyToken)

//endpoin
app.get("/", async(req, res) => {
    kelas.findAll()
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
        nama_kelas: req.body.nama_kelas,
        jurusan: req.body.jurusan,
        angkatan: req.body.angkatan,
         
    }

    kelas.create(data)
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
        nama_kelas: req.body.nama_kelas,
        jurusan: req.body.jurusan,
        angkatan: req.body.angkatan,
    }

    let parameter = {
        id_kelas: req.body.id_kelas
    }

    kelas.update(data, {where:parameter})
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

app.delete("/:id_kelas", async(req, res) => {
    let id_kelas = req.params.id_kelas
    let perameter = {
        id_kelas: id_kelas
    }

    kelas.destroy({where : perameter})
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