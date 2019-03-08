"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PokemonTypeSchema extends Schema {
  up() {
    this.create("pokemon_types", table => {
      table.increments();
      table
        .integer("pokemon_id")
        .unsigned()
        .index("pokemon_id");
      table
        .integer("type_id")
        .unsigned()
        .index("type_id");
      table
        .foreign("pokemon_id")
        .references("pokemons.id")
        .onDelete("cascade")
        .onUpdate("cascade");
      table
        .foreign("type_id")
        .references("types.id")
        .onDelete("cascade")
        .onUpdate("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("pokemon_types");
  }
}

module.exports = PokemonTypeSchema;
