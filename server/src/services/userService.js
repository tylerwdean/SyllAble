const APIResult = require("../utils/APIResult");
const CrudService = require("./crudService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    return { ...req.body, password: hashedPassword };
  }

  filter(response) {
    return { email: response.email, first_name: response.first_name };
  }

  async login(req) {
    const validate = this.validateLogin(req);
    if (validate) return validate;
    const result = (
      await this.repository.readByCustom(
        "password, id, first_name",
        "email = $1",
        [req.body.email]
      )
    ).message[0];
    if (!result || result.length < 1)
      return new APIResult(403, "Invalid Credentials");

    const storedPassword = result.password;
    const id = result.id;
    const first_name = result.first_name;

    const bcryptResult = await bcrypt.compare(
      req.body.password,
      storedPassword
    );
    if (bcryptResult) {
      const newJWT = jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: "172800s",
      });
      return new APIResult(200, { jwt: newJWT, first_name: first_name });
    } else return new APIResult(403, "Invalid Credentials");
  }
}

const authenticateToken = (req, res, next) => {
  console.log("verifying JWT");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token) console.log(token);
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};

module.exports = { UserService, authenticateToken };
