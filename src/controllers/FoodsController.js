const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class FoodsController {
  async create(request, response) {
    try {
      const { title, category, description, price, ingredients } = request.body;
      const foodImage = request.file;
  
      let filename = null;
  
      if (foodImage) {
        const diskStorage = new DiskStorage();
        filename = await diskStorage.saveFile(foodImage.filename);
      }
  
      const [food_id] = await knex("foods").insert({
        image: filename,
        title,
        category,
        description,
        price,
      });
  
      if (ingredients) {
        const ingredientsToInsert = Array.isArray(ingredients)
          ? ingredients.map((ingredient) => ({
              name: ingredient,
              food_id,
            }))
          : [{ name: ingredients, food_id }];
  
        await knex("ingredients").insert(ingredientsToInsert);
      }
  
      return response.status(201).json({ message: "Prato criado com sucesso" });
    } catch (error) {
      console.error("Erro na criação do prato:", error);
      return response.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async update(request, response) {
    try {
      const { title, category, description, price, ingredients } = request.body;
      const { id } = request.params;

      const food = await knex("foods").where({ id }).first();

      if (!food) {
        return response.status(404).json({ error: "Prato não encontrado" });
      }
      
      const updatedFood = {
        title: title ?? food.title,
        description: description ?? food.description,
        category: category ?? food.category,
        price: price ?? food.price
      };

      await knex("foods").where({ id }).update(updatedFood);
      await knex("foods").where({ id }).update('updated_at', knex.fn.now());

      await knex("ingredients").where({ food_id: id }).delete();

      if (ingredients) {
        const ingredientsToInsert = Array.isArray(ingredients)
          ? ingredients.map((ingredient) => ({ name: ingredient, food_id: id }))
          : [{ name: ingredients, food_id: id }];

        await knex("ingredients").insert(ingredientsToInsert);
      }

      return response.status(200).json({ message: "Prato atualizado com sucesso" });
    } catch (error) {
      console.error("Erro na atualização do prato:", error);
      return response.status(500).json({ error: "Erro interno do servidor" });
    }
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