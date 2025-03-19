const express = require("express")
const path = require("path")
const app = express()
const fs = require("fs")
const { spawn } = require("child_process")

const PORT = process.env.PORT || 3000

app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.static("public/dist"));
app.use(express.json())

app.get("/edit-syllabus", (req, res) => {

})

app.post("/login", (req, res) => {
    console.log("Login request received");

    const jsonData = req.body;
    let email = jsonData.email
    let password = jsonData.password
    console.log(email, password)

    //will need to check the database and verify the username and password

    res.redirect('/')
})

app.post("/submit-form", (req, res) => {
    console.log("Submit form request received")
    //get the data
    const jsonData = req.body

    const inputFilePath = path.join(__dirname, "../docxBuilder/temp_syllabus.json")
    const outputFilePath = path.join(__dirname, "../docxBuilder/output.docx")
    fs.writeFileSync(inputFilePath, JSON.stringify(jsonData))

    const pythonScriptPath = path.join(__dirname, "../docxBuilder/builder.py")
    const pythonProcess = spawn("python3", [pythonScriptPath, inputFilePath, outputFilePath])


    console.log("Python process started")

    //catch python errors
    pythonProcess.stderr.on("data", (data) => {
        console.error(`Python script error: ${data}`);
        res.status(500).send("Error processing JSON data");
    })

    //finish the python process
    pythonProcess.on("close", (code) => {
        console.log("Python process closed")
        if (code == 0) {

            if (fs.existsSync(outputFilePath)) {
                res.download(outputFilePath, "Syllabus.docx", (err => {
                    if (err) {
                        console.error("Error sending file: ", err)
                        res.status(500).send("Error sending file")
                    }

                    fs.unlink(inputFilePath, (err) => {
                        if (err) {
                            console.error("Error deleting file:", err);
                        } else {
                            console.log("File deleted successfully:", inputFilePath);
                        }
                    })

                    fs.unlink(outputFilePath, (err) => {
                        if (err) {
                            console.error("Error deleting file:", err);
                        } else {
                            console.log("File deleted successfully:", outputFilePath);
                        }
                    })
                }))
                console.log("Successful Python script")
            }
        } else {
            res.status(500).send("Python script failed")
            console.log("Error: ", code)
        }
    })
})

app.listen(PORT)