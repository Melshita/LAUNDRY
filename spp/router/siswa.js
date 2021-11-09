const express = require("express")
const app = express()

const siswa = require("../models/index").siswa

app.use(express.urlencoded({extended:true}))

//auth
const verifyToken = require("./verifyToken")
app.use(verifyToken)

//endpoin
app.get("/", async(req, res) => {
    siswa.findAll({
        include: ["kelas"]
    })
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
        nis: req.body.nis,
        nama: req.body.nama,
        id_kelas: req.body.id_kelas,
        alamat: req.body.alamat,
        no_tlp: req.body.no_tlp
    }

    siswa.create(data)
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
        nis: req.body.nis,
        nama: req.body.nama,
        id_kelas: req.body.id_kelas,
        alamat: req.body.alamat,
        no_tlp: req.body.no_tlp
    }

    let parameter = {
        nisn: req.body.nisn
    }

    siswa.update(data, {where:parameter})
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

app.delete("/:nisn", async(req, res) => {
    let nisn = req.params.nisn
    let perameter = {
        nisn: nisn
    }

    siswa.destroy({where : perameter})
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