"use strict";

const Factory = use("Factory");

class TypeSeeder {
  async run() {
    await Factory.model("App/Models/Type").createMany(3, [
      {
        name: "Physic"
      },
      {
        name: "Water"
      },
      {
        name: "Fire"
      }
    ]);
  }
}

module.exports = TypeSeeder;
