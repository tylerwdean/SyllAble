const Repository = require("../database/repository");
const APIResult = require("../utils/APIResult");

class CrudService {
  constructor(tableName) {
    if (this.constructor === CrudService)
      throw new Error(
        'Abstract class "Service" cannot be instantiated directly.'
      );
    this.repository = new Repository(tableName);
  }

  /**
   * Ensures the request can be properly handles. If not, returns an APIResult
   *
   * @param {Object} req The request to be validated
   * @returns
   */
  validate(obj) {
    return null;
  }

  /**
   * If the create needs to manipulate the object before doing anything, that is done here
   *
   * @param {Object} obj
   * @returns {Object} The manipulated object if needed
   */
  async preprocess(obj) {
    return obj;
  }

  /**
   * If the create needs to do anything after inserting the data, it is done here.
   *
   * @param {*} obj
   * @returns {Promise<APIResult?>}
   */
  async postprocess(obj) {
    return null;
  }

  /**
   * Removed sensitive information in message results.
   * @param {string} obj
   * @returns {string}
   */
  filter(obj) {
    return obj;
  }

  async create(req) {
    const validateReq = this.validate(req);
    if (validateReq) return validateReq;

    const result = await this.repository.create(
      await this.preprocess(req.body)
    );

    const postprocess = await this.postprocess(req);
    if (postprocess) return postprocess;

    return new APIResult(result.status, this.filter(result.message));
  }

  async read(req) {
    const limit = req.query?.limit || null;
    const offset = req.query?.offset || null;
    const result = await this.repository.read(limit, offset);
    if (result.error) console.error(result.error);

    return result.status == 200
      ? new APIResult(
          result.status,
          result.message.map((row) => this.filter(row))
        )
      : result;
  }
}

module.exports = CrudService;
