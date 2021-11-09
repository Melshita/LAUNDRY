const express = require("express")
const app = express()

let auth = require("./router/auth")
let spp = require("./router/spp")
let petugas = require("./router/petugas")
let kelas = require("./router/kelas")
let siswa = require("./router/siswa")
let pembayaran = require("./router/pembayaran")

app.use("/spp/auth", auth)
app.use("/spp/spp", spp)
app.use("/spp/petugas", petugas)
app.use("/spp/kelas", kelas)
app.use("/spp/siswa", siswa)
app.use("/spp/pembayaran", pembayaran)

app.use(express.static(__dirname))

app.listen(8000, ()=> {
    console.log(`server berjalan di port 8000`)
})