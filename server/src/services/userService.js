const APIResult = require("../utils/APIResult");
const CrudService = require("./crudService");
const bcrypt = require("bcryptjs");

class UserService extends CrudService {
  constructor() {
    super("users");
  }

  validate(req) {
    const missingFields = [];
    if (!req.body.hasOwnProperty("first_name"))
      missingFields.push("first_name");
    if (!req.body.hasOwnProperty("last_name")) missingFields.push("last_name");
    if (!req.body.hasOwnProperty("email")) missingFields.push("email");
    if (!req.body.hasOwnProperty("password")) missingFields.push("password");
    if (missingFields.length > 0) {
      return new APIResult(400, `Missing fields: ${missingFields.join(", ")}`);
    }
    if (req.body.hasOwnProperty("id"))
      return new APIResult(400, "Cannot have property 'id' in request");
  }

  preprocess(req) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    return { ...req.body, password: hashedPassword };
  }

  async login(req) {
    const [storedPassword, id] = (
      await this.repository.readByCustom("password, id", "email = $1", [
        req.body.email,
      ])
    )[0];
    if (bcrypt.compare(req.body.password, storedPassword))
      return new APIResult(200, toString(id));
    else return new APIResult(403, "Invalid Credentials");
  }
}

module.exports = UserService;
