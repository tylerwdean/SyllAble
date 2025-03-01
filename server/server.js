const express = require("express")
const path = require("path")
const app = express()
const fs = require("fs")
const { spawn } = requre("child_process")

const PORT = process.env.PORT || 3000

app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.static("public/dist"));

app.get("/edit-syllabus", (req, res) => {

})

app.post("/submit-form", (req, res) => {
    console.log("Submit form request received")

    //get the data
    const jsonData = req.body

    const inputFilePath = path.join(__dirname, "../docxBuilder/temp_syllabus.json")
    fs.writeFileSync(inputFilePath, JSON.stringify(jsonData))

    const pythonScriptPath = path.join(__dirname, "../docxBuilder/builder.py")
    const pythonProcess = spawn("python3", [pythonScriptPath, inputFilePath])



})

app.listen(PORT)