"use strict";

const Category = use("App/Models/Category");

class CategoryController {
  async index({ request, response }) {
    let categories = await Category.all();

    return response.status(200).json(categories);
  }
}

module.exports = CategoryController;
