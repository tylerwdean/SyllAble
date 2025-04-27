const APIResult = require("../utils/APIResult");
const CrudService = require("./crudService");
const bcrypt = require("bcryptjs");

class UserService extends CrudService {
  constructor() {
    super("users");
  }

  validate(req) {
    console.log(req.body);
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
    if (
      !req.body.first_name ||
      !req.body.last_name ||
      !req.body.email ||
      !req.body.password
    )
      return new APIResult(400, "Please fill all the forms");
  }

  validateLogin(req) {
    const missingFields = [];
    if (!req.body.hasOwnProperty("email")) missingFields.push("email");
    if (!req.body.hasOwnProperty("password")) missingFields.push("password");
    if (missingFields.length > 0) {
      return new APIResult(400, `Missing fields: ${missingFields.join(", ")}`);
    }
  }

  preprocess(req) {
    console.log(req.body);
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    return { ...req.body, password: hashedPassword };
  }

  async login(req) {
    const validate = this.validateLogin(req);
    if (validate) return validate;

    const result = (
      await this.repository.readByCustom("password, id", "email = $1", [
        req.body.email,
      ])
    ).message[0];
    if (!result || result.length < 1)
      return new APIResult(403, "Invalid Credentials");

    const storedPassword = result.password;
    const id = result.id;
    console.log(req.body.password, storedPassword);
    const bcryptResult = await bcrypt.compare(
      req.body.password,
      storedPassword
    );
    console.log(bcryptResult);
    if (bcryptResult) return new APIResult(200, toString(id));
    else return new APIResult(403, "Invalid Credentials");
  }
}

module.exports = UserService;
