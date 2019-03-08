"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class PokemonType extends Model {
  static get table() {
    return "pokemon_types";
  }

  static get primaryKey() {
    return "id";
  }

  pokemons() {
    return this.hasMany("App/Models/Pokemon");
  }

  types() {
    return this.hasMany("App/Models/Type");
  }
}

module.exports = PokemonType;
