const express = require("express")
const moment = require("moment")
const app = express()

const pembayaran = require("../models/index").pembayaran

app.use(express.urlencoded({extended:true}))

//auth
const verifyToken = require("./verifyToken")
app.use(verifyToken)

//endpoin
app.get("/", async(req, res) => {
    pembayaran.findAll({
        include: ["petugas", "siswa"]
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
        id_petugas: req.body.id_petugas,
        nisn: req.body.nisn,
        tgl_bayar: moment().format('YYYY-MM-DD HH:mm:ss'),
        bulan_spp: req.body.bulan_spp,
        tahun_spp: req.body.tahun_spp,
    }

    pembayaran.create(data)
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
        id_petugas: req.body.id_petugas,
        nisn: req.body.nisn,
        tgl_bayar: moment().format('YYYY-MM-DD HH:mm:ss'),
        bulan_spp: req.body.bulan_spp,
        tahun_spp: req.body.tahun_spp,
    }

    let parameter = {
        id_pembayaran: req.body.id_pembayaran
    }

    pembayaran.update(data, {where:parameter})
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

app.delete("/:id_pembayaran", async(req, res) => {
    let id_pembayaran = req.params.id_pembayaran
    let perameter = {
        id_pembayaran: id_pembayaran
    }

    pembayaran.destroy({where : perameter})
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