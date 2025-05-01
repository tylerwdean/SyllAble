const Repository = require("../database/repository");
const APIResult = require("../utils/APIResult");
const CrudService = require("./crudService");
const emptySyllabus = require("../utils/emptySyllabus.json");
const fs = require("fs");
const { spawn } = require("child_process");
const path = require("path");

class SyllabusService extends CrudService {
  constructor() {
    super("syllabi");
  }

  async preprocess(req) {
    const courseRepository = new Repository("courses");
    const result = await courseRepository.readByCustom(
      "course_description, course_title",
      "course_code = $1",
      [req.body.course_code]
    );
    const { course_description, course_title } = result.message[0];

    return {
      ...req.body,
      professor_id: req.user.id,
      syllabus: {
        ...emptySyllabus,
        course_description,
        course_title,
        course_code: req.body.course_code,
      },
    };
  }

  validate(req) {
    const missingFields = [];
    if (!req.body.hasOwnProperty("title")) missingFields.push("title");
    if (!req.body.hasOwnProperty("course_code"))
      missingFields.push("course_code");
    if (!req.body.hasOwnProperty("semester")) missingFields.push("semester");

    //todo - verify the syllabus JSON to have correct format

    //todo - verify the semester meets the format SPR-YY FAL-YY SUM-YY for the possible semesters

    if (missingFields.length > 0) {
      return new APIResult(400, `Missing fields: ${missingFields.join(", ")}`);
    }
    if (req.body.hasOwnProperty("id"))
      return new APIResult(400, "Cannot have property 'id'");
    if (req.body.hasOwnProperty("syllabus"))
      return new APIResult(400, "Cannot have property 'syllabus'");
    if (req.body.hasOwnProperty("course_description"))
      return new APIResult(400, "Cannot have property 'course_description'");
  }

  async update(req) {
    const result = (
      await this.repository.readByCustom("professor_id", "id = $1", [
        parseInt(req.params.id),
      ])
    ).message[0].professor_id;

    if (result !== req.user.id) return new APIResult(403, "Action Forbidden");

    return await this.repository.update(
      req.params.id,
      "syllabus",
      req.body.syllabus
    );
  }

  async getAll(req) {
    const professor_id = req.user.id; //uses JWT to get the professor's data
    const result = await this.repository.readByCustom(
      "title, course_code, semester, id",
      "professor_id = $1",
      [professor_id]
    );
    return new APIResult(200, result.message);
  }

  async getSyllabusByID(req) {
    const syllabusID = parseInt(req.params.id);
    const result = await this.repository.readByCustom("syllabus", "id = $1", [
      syllabusID,
    ]);
    return new APIResult(200, result.message[0].syllabus);
  }

  async generateSyllabus(req, res) {
    const syllabusJSON = (await this.getSyllabusByID(req)).message;
    console.log(syllabusJSON);

    console.log("Starting Python Script");

    // Use absolute paths throughout
    console.log(__dirname);
    const scriptDir = path.join(__dirname, "..", "..", "docxBuilder");
    const tempDir = path.join(scriptDir, "temp");

    // Ensure temp directory exists
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const inputFilePath = path.join(tempDir, "temp_syllabus.json");
    const outputFilePath = path.join(tempDir, "output.docx");
    const pythonScriptPath = path.join(scriptDir, "builder.py");

    //const inputFilePath = "docxBuilder/temp/temp_syllabus.json";
    //const outputFilePath = "docxBuilder/temp/output.docx";
    fs.writeFileSync(inputFilePath, JSON.stringify(syllabusJSON));

    //const pythonScriptPath = "docxBuilder/builder.py";
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
  }
}

module.exports = SyllabusService;
