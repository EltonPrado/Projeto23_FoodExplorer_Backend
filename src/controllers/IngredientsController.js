const knex = require("../database/knex");

class IngredientsController {
  async index(request, response) {
    const ingredients = await knex("ingredients")
    .groupBy("id")
    .orderBy("id")

    return response.json(ingredients);
  }
}

module.exports = IngredientsController;