"use strict";

const Factory = use("Factory");

class CategorySeeder {
  async run() {
    await Factory.model("App/Models/Category").createMany(3, [
      {
        name: "Dragon"
      },
      {
        name: "Seed"
      },
      {
        name: "Duck"
      }
    ]);
  }
}

module.exports = CategorySeeder;
