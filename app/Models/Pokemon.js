"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Pokemon extends Model {
  static get table() {
    return "pokemons";
  }

  static get primaryKey() {
    return "id";
  }

  types() {
    return this.belongsToMany("App/Models/Type").pivotTable("pokemon_types");
  }

  categories() {
    return this.belongsTo("App/Models/Category");
  }
}

module.exports = Pokemon;
