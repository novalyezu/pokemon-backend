"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Type extends Model {
  static get table() {
    return "types";
  }

  static get primaryKey() {
    return "id";
  }

  pokemons() {
    return this.belongsToMany("App/Models/Pokemon").pivotModel(
      "App/Models/PokemonType"
    );
  }
}

module.exports = Type;
