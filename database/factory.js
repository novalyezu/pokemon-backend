"use strict";

const Factory = use("Factory");

Factory.blueprint("App/Models/Category", async (faker, index, data) => {
  return {
    name: data[index].name
  };
});

Factory.blueprint("App/Models/Type", async (faker, index, data) => {
  return {
    name: data[index].name
  };
});
