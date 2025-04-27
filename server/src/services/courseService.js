const APIResult = require("../utils/APIResult");
const CrudService = require("./crudService");

class CourseService extends CrudService {
  constructor() {
    super("courses");
  }

  validate(req) {
    const missingFields = [];
    if (!req.body.hasOwnProperty("title")) missingFields.push("title");
    if (!req.body.hasOwnProperty("code")) missingFields.push("code");
    if (missingFields.length > 0) {
      return new APIResult(400, `Missing fields: ${missingFields.join(", ")}`);
    }
  }

  preprocess(req) {
    return { title: req.body.title, code: req.body.code };
  }
}

module.exports = CourseService;
