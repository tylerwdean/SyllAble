const Repository = require("../database/repository");
const APIResult = require("../utils/APIResult");
const CrudService = require("./crudService");

class SyllabusService extends CrudService {
  constructor() {
    this.repository = new Repository("syllabi");
  }

  validate(req) {
    if (!req.body.hasOwnProperty("title")) missingFields.push("title");
    if (!req.body.hasOwnProperty("course_code"))
      missingFields.push("course_code");
    if (!req.body.hasOwnProperty("professor_id"))
      missingFields.push("professor_id");
    if (!req.body.hasOwnProperty("syllabus")) missingFields.push("syllabus");
    if (!req.body.hasOwnProperty("semester")) missingFields.push("semester");

    //todo - verify the syllabus JSON to have correct format

    //todo - verify the semester meets the format SPR-YY FAL-YY SUM-YY for the possible semesters

    if (missingFields.length > 0) {
      return new ApiResult(400, `Missing fields: ${missingFields.join(", ")}`);
    }
    if (req.body.hasOwnProperty("id"))
      return new APIResult(400, "Cannot have property 'id'");
  }

  async update(req) {
    await this.repository.update(req.params.id, "syllabus", req.body.syllabus);
  }

  async getAll(req) {
    const professor_id = req.body.professor_id;
    const result = await this.repository.readByCustom(
      "title, course_code, semester",
      "professor_id = $1",
      [professor_id]
    );
    return new APIResult(200, result.rows);
  }

  async getSyllabusByID(req) {
    const syllabusID = req.params.id;
    const result = await this.repository.readByCustom("syllabus", "id = $1", [
      syllabusID,
    ]);
    return new APIResult(200, result.rows[0]);
  }

  async generateSyllabus(req) {
    const syllabusJSON = await this.getSyllabusByID(req);

    console.log("Starting Python Script");
    const inputFilePath = "docxBuilder/temp/temp_syllabus.json";
    const outputFilePath = "docxBuilder/temp/output.docx";
    fs.writeFileSync(inputFilePath, JSON.stringify(syllabusJSON));

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
  }
}

module.exports = SyllabusService;
