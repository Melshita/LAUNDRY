const express = require("express")
const app = express()

const spp = require("../models/index").spp

app.use(express.urlencoded({extended:true}))

//auth
const verifyToken = require("./verifyToken")
app.use(verifyToken)

//endpoin
app.get("/", async(req, res) => {
    spp.findAll()
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
        angkatan: req.body.angkatan,
        tahun: req.body.tahun,
        nominal: req.body.nominal 
    }

    spp.create(data)
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
        angkatan: req.body.angkatan,
        tahun: req.body.tahun,
        nominal: req.body.nominal 
    }

    let parameter = {
        id_spp: req.body.id_spp
    }

    spp.update(data, {where:parameter})
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

app.delete("/:id_spp", async(req, res) => {
    let id_spp = req.params.id_spp
    let perameter = {
        id_spp: id_spp
    }

    spp.destroy({where : perameter})
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