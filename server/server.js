const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000

app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.static("public/dist"));

app.get("/edit-syllabus", (req, res) => {

})

app.listen(PORT)