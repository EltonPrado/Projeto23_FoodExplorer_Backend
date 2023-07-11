const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class FoodsController {
  async create(request, response) {
    const { title, category, description, price, ingredients } = request.body;

    const { filename: imageFilename } = request.file;
    
    const diskStorage = new DiskStorage();

    const filename = await diskStorage.saveFile(imageFilename);

    const food_id = await knex("foods").insert({
      image: filename,
      title,
      category,
      description,
      price
    });

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        name: ingredient,
        food_id
      }
    });

    await knex("ingredients").insert(ingredientsInsert);
    
    return response.status(201).json();
  }

  async update(request, response) {
    const { title, description, category, price, ingredients } = request.body;
    const { id } = request.params;

    const { filename: imageFilename } = request.file;

    const diskStorage = new DiskStorage();

    const food = await knex("foods").where({ id }).first();

    if(food.image) {
      await diskStorage.deleteFile(food.image);
    }

    const filename = await diskStorage.saveFile(imageFilename);

    food.image = filename;
    food.title = title ?? food.title;
    food.description = description ?? food.description;
    food.category = category ?? food.category;
    food.price = price ?? food.price;

    await knex("foods").where({ id }).update(food);
    await knex("foods").where({ id }).update('updated_at', knex.fn.now());

    ingredientsInsert = ingredients.map(ingredient => {
      return {
        food_id: food.id,
        name: ingredient
      }
    })
    
    await knex("ingredients").where({ food_id: id }).delete()
    await knex("ingredients").where({ food_id: id }).insert(ingredientsInsert)

    return response.status(200).json
  }

  async show(request, response) {
    const { id } = request.params;

    const food = await knex("foods").where({ id }).first();
    const ingredients = await knex("ingredients").where({ foods_id: id }).orderBy("name");

    return response.status(200).json({
      ...food,
      ingredients
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("foods").where({ id }).delete();

    return response.status(200).json();
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
          "foods.price",
          "foods.image",
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
      const foodIngredient = foodsIngredients.filter(ingredient => ingredient.food_id === food.id);

      return {
        ...food,
        ingredients: foodIngredient
      }
    })

    return response.status(200).json(foodsWithIngredients);
  }
}

module.exports = FoodsController;