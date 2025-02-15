const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000

app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("syllabus-form")
})

app.get("/edit-syllabus", (req, res) => {

})

app.listen(PORT)