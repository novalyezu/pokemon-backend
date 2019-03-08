"use strict";

const Type = use("App/Models/Type");

class TypeController {
  async index({ request, response }) {
    let types = await Type.all();

    return response.status(200).json(types);
  }
}

module.exports = TypeController;
