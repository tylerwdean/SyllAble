const APIResult = require("../utils/APIResult");
const CrudService = require("./crudService");

class CourseService extends CrudService {
  constructor() {
    super("courses");
  }

  validate(req) {
    const missingFields = [];
    if (!req.body.hasOwnProperty("course_title"))
      missingFields.push("course_title");
    if (!req.body.hasOwnProperty("course_code"))
      missingFields.push("course_code");
    if (missingFields.length > 0) {
      return new APIResult(400, `Missing fields: ${missingFields.join(", ")}`);
    }
  }

  preprocess(req) {
    return { course_title: req.body.title, course_code: req.body.course_code };
  }
}

module.exports = CourseService;
