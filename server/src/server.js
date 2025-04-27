const express = require("express");
const app = express();
const fs = require("fs");
const { spawn } = require("child_process");
const cors = require("cors");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");
const syllabusRoutes = require("./routes/syllabusRoutes");

const PORT = process.env.PORT || 3000;

app.use(express.static("public/dist"));
app.use(express.json());

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from Vite
    credentials: true, // If using cookies
  })
);

app.get("/api/healthcheck", (req, res) => {
  console.log("Healthcheck request received");
  res.send("Application healthy");
});

app.use("/api/courses", courseRoutes);

app.use("/api/user", userRoutes);

app.use("/api/syllabus", syllabusRoutes);

/*app.post("/api/submit-form", (req, res) => {
  console.log("Submit form request received");
  //get the data
  const jsonData = req.body;

  console.log("Starting Python Script");
  const inputFilePath = "docxBuilder/temp_syllabus.json";
  const outputFilePath = "docxBuilder/output.docx";
  fs.writeFileSync(inputFilePath, JSON.stringify(jsonData));

  const pythonScriptPath = "docxBuilder/builder.py";
  const pythonProcess = spawn("/usr/bin/python3", [
    pythonScriptPath,
    inputFilePath,
    outputFilePath,
  ]);

  console.log("Python process started");

  pythonProcess.stdout.on("data", (data) => {
    console.log(`Python stdout: ${data}`);
  });

  //catch python errors
  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python script error: ${data}`);
    res.status(500).send("Error processing JSON data");
  });

  //finish the python process
  pythonProcess.on("close", (code) => {
    console.log("Python process closed");
    if (code == 0) {
      if (fs.existsSync(outputFilePath)) {
        res.download(outputFilePath, "Syllabus.docx", (err) => {
          if (err) {
            console.error("Error sending file: ", err);
            res.status(500).send("Error sending file");
          }

          fs.unlink(inputFilePath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            } else {
              console.log("File deleted successfully:", inputFilePath);
            }
          });

          fs.unlink(outputFilePath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            } else {
              console.log("File deleted successfully:", outputFilePath);
            }
          });
        });
        console.log("Successful Python script");
      }
    } else {
      res.status(500).send("Python script failed");
      console.log("Error: ", code);
    }
  });
});*/

app.listen(PORT);
