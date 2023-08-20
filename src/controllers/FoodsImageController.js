const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class FoodsImageController {
  async update(request, response) {
    const { id } = request.params;
    const foodFilename = request.file.filename;
    
    const diskStorage = new DiskStorage();
    
    const food = await knex("foods").where({ id }).first();
    
    if(!food) {
      throw new AppError("Somente o administrador pode mudar a foto do prato.", 401);
    }
    
    if(food.image) {
      await diskStorage.deleteFile(food.image);
    }

    const filename = await diskStorage.saveFile(foodFilename);
    food.image = filename;

    await knex("foods").where({ id }).update(food);
    await knex("foods").where({ id }).update('updated_at', knex.fn.now());

    return response.status(200).json(food);
  }
}

module.exports = FoodsImageController;