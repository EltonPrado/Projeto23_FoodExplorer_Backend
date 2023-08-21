const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class FoodsController {
  async create(request, response) {
    const { title, category, description, price, ingredients } = request.body;
    const foodImage = request.file;

    let filename = null;

    if(foodImage) {
      const diskStorage = new DiskStorage();
      filename = await diskStorage.saveFile(foodImage.filename);
    }

    const [food_id] = await knex("foods").insert({
      image: filename,
      title,
      category,
      description,
      price
    });

    const hasOnlyOneIngredient = typeof(ingredients) === "string";

    let ingredientsInsert;

    if(hasOnlyOneIngredient) {
      ingredientsInsert = {
        name: ingredients,
        food_id
      }
    } else if (ingredients.length > 1) {
      ingredientsInsert = ingredients.map(ingredient => {
        return {
          name: ingredient,
          food_id
        }
      });
    } else {
      return
    }

    await knex("ingredients").insert(ingredientsInsert);
  
    return response.status(201).json();
  }

  async update(request, response) {
    const { title, category, description, price, ingredients } = request.body;
    const { id } = request.params;

    const food = await knex("foods").where({ id }).first();
    
    food.title = title ?? food.title;
    food.category = category ?? food.category;
    food.description = description ?? food.description;
    food.price = price ?? food.price;

    await knex("foods").where({ id }).update(food);
    await knex("foods").where({ id }).update('updated_at', knex.fn.now());
    await knex("ingredients").where({ food_id: id }).delete();

    const hasOnlyOneIngredient = typeof(ingredients) === "string";

    let ingredientsInsert;

    if (hasOnlyOneIngredient) {
      ingredientsInsert = {
        name: ingredients,
        food_id: id
      }
    } else if (ingredients.length > 1) {
      ingredientsInsert = ingredients.map(ingredient => {
        return {
          name : ingredient,
          food_id: id
        }
      })
      
      await knex("ingredients").insert(ingredientsInsert)
    }

    return response.status(200).json();
  }

  async show(request, response) {
    const { id } = request.params;

    const food = await knex("foods").where({ id }).first();
    const ingredients = await knex("ingredients").where({ food_id: id }).orderBy("name");

    return response.status(200).json({
      ...food,
      ingredients
    });
  }

  async index(request, response) {
    const { title, ingredients } = request.query;

    let foods;

    if(ingredients) {
      const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim());

      foods = await knex("ingredients")
        .select([
          "foods.id",
          "foods.title",
          "foods.description",
          "foods.category",
          "foods.price"
        ])
        .whereLike("foods.title", `%${title}%`)
        .whereIn("name", filterIngredients)
        .InnerJoin("foods", "foods.id", "ingredients.food_id")
        .groupBy("foods.id")
        .orderBy("foods.title")
    } else {
      foods = await knex("foods")
        .whereLike("title", `%${title}%`)
        .orderBy("title")
    }

    const foodsIngredients = await knex("ingredients")

    const foodsWithIngredients = foods.map(food => {
      const foodIngredients = foodsIngredients.filter(ingredient => ingredient.food_id === food.id);

      return {
        ...food,
        ingredients: foodIngredients
      }
    })

    return response.status(200).json(foodsWithIngredients);
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("foods").where({ id }).delete();

    return response.status(200).json();
  }
}

module.exports = FoodsController;