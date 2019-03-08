"use strict";

const Pokemon = use("App/Models/Pokemon");
const DataGrid = use("DataGrid");

class PokemonController {
  async index({ request, response }) {
    const config = {
      // base query
      query() {
        return use("App/Models/Pokemon")
          .query()
          .with("types")
          .with("categories");
      },

      sortable: {
        id: "id",
        name: "name",
        category_id: "category_id"
      },

      searchable: ["name", "category_id"],

      filterable: {
        types: "type_in"
      }
    };

    return DataGrid.paginate(config);
    // let pokemons = await Pokemon.query()
    //   .with("types")
    //   .with("categories")
    //   .fetch();
    // return response.status(200).json(pokemons);
  }

  async filter({ request, params, response }) {
    let type = request.input("type");
    let category = request.input("category");

    let filter;

    if (type !== undefined && category !== undefined) {
      filter = Pokemon.query()
        .with("types", builder => {
          return builder.whereIn("types.id", type);
        })
        .with("categories")
        .where("category_id", category);
    } else if (type !== undefined && category === undefined) {
      filter = Pokemon.query()
        .with("types", builder => {
          return builder.whereIn("types.id", type);
        })
        .with("categories");
    } else if (type === undefined && category !== undefined) {
      filter = Pokemon.query()
        .with("types")
        .with("categories")
        .where("category_id", category);
    }

    const config = {
      // base query
      query() {
        return filter;
      },

      sortable: {
        id: "id",
        name: "name"
      },

      searchable: ["name"],

      filterable: {
        name: "name"
      }
    };

    const result = await DataGrid.paginate(config);
    if (type !== undefined) {
      const newData = result.rows.filter(el => {
        return el.$relations.types.size() > 0;
      });
      const newResult = {
        total: newData.length,
        perPage: 10,
        page: 1,
        lastPage: Math.floor(newData.length / 10) + 1,
        data: newData
      };
      return response.status(200).json(newResult);
    }
    return response.status(200).json(result);
  }

  async show({ request, params, response }) {
    let pokemons = await Pokemon.query()
      .with("types")
      .with("categories")
      .where("id", params.id)
      .first();

    return response.status(200).json(pokemons);
  }

  async store({ request, response }) {
    let name = request.input("name");
    let image_url = request.input("image_url");
    let type = request.input("type");
    let category_id = request.input("category_id");
    let latitude = request.input("latitude");
    let longitude = request.input("longitude");

    let pokemons = new Pokemon();
    pokemons.name = name;
    pokemons.image_url = image_url;
    pokemons.category_id = category_id;
    pokemons.latitude = latitude;
    pokemons.longitude = longitude;

    await pokemons.save();

    for (let i = 0; i < type.length; i++) {
      await pokemons.types().attach([type[i]]);
    }

    let newPokemon = await Pokemon.query()
      .with("types")
      .with("categories")
      .where("id", pokemons.id)
      .first();

    return response.status(201).json(newPokemon);
  }

  async update({ request, params, response }) {
    let name = request.input("name");
    let image_url = request.input("image_url");
    let type = request.input("type");
    let category_id = request.input("category_id");
    let latitude = request.input("latitude");
    let longitude = request.input("longitude");

    let pokemons = await Pokemon.find(params.id);
    pokemons.name = name;
    pokemons.image_url = image_url;
    pokemons.category_id = category_id;
    pokemons.latitude = latitude;
    pokemons.longitude = longitude;

    await pokemons.save();

    await pokemons.types().detach();
    for (let i = 0; i < type.length; i++) {
      await pokemons.types().attach([type[i]]);
    }

    let newPokemon = await Pokemon.query()
      .with("types")
      .with("categories")
      .where("id", pokemons.id)
      .first();

    return response.status(200).json(newPokemon);
  }

  async delete({ request, params, response }) {
    let pokemons = await Pokemon.find(params.id);

    await pokemons.types().detach();

    await pokemons.delete();

    return response.status(200).json({ id: params.id });
  }
}

module.exports = PokemonController;
