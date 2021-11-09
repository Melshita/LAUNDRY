const express = require("express")
const app = express()

// panggil router member
const member = require("./routers/member")
const users = require("./routers/users")
const paket = require("./routers/paket")
const transaksi = require("./routers/transaksi")
const { login } = require("./routers/login")

app.use("/api/member", member)
app.use("/api/users", users)
app.use("/api/paket", paket)
app.use("/api/transaksi", transaksi)
app.use("/api/auth", login)

app.listen(8000,() => {
    console.log(`Server run on port 8000`);
})