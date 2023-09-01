const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class FoodsImageController {
  async update(request, response) {
    try {
      const { id } = request.params;
      const foodImage = request.file.filename;
  
      const food = await knex("foods").where({ id }).first();
  
      if (!food) {
        return response.status(404).json({ error: "Prato não encontrado" });
      }
  
      const diskStorage = new DiskStorage();
  
      if (food.image) {
        await diskStorage.deleteFile(food.image);
      }
  
      const filename = await diskStorage.saveFile(foodImage);
      food.image = filename;
  
      await knex("foods").where({ id }).update({
        image: food.image,
        updated_at: knex.fn.now(),
      });
  
      return response.status(200).json(food);
    } catch (error) {
      console.error("Erro na atualização da imagem do prato:", error);
      return response.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

module.exports = FoodsImageController;