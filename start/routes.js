"use strict";

const Route = use("Route");

Route.group(() => {
  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");
  Route.post("logout", "AuthController.logout").middleware("auth");
  Route.get("get_user", "AuthController.getUser").middleware("auth");
  Route.post("refresh_token", "AuthController.refreshToken");
}).prefix("api/v1/auth");

Route.group(() => {
  Route.get("/", "CategoryController.index");
}).prefix("api/v1/categories");

Route.group(() => {
  Route.get("/", "TypeController.index");
}).prefix("api/v1/types");

Route.group(() => {
  Route.get("/", "PokemonController.index");
  Route.post("/filter", "PokemonController.filter");
  Route.get("/:id", "PokemonController.show");
  Route.post("/", "PokemonController.store").middleware("auth");
  Route.put("/:id", "PokemonController.update").middleware("auth");
  Route.delete("/:id", "PokemonController.delete").middleware("auth");
}).prefix("api/v1/pokemons");
