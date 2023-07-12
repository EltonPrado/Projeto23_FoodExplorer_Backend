const { Router } = require("express");

const multer = require("multer");
const uploadConfig = require("../configs/upload");
const FoodsController = require("../controllers/FoodsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ensureIsAdmin = require("../middlewares/ensureIsAdmin");

const foodsRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const foodsController = new FoodsController();

foodsRoutes.use(ensureAuthenticated);

foodsRoutes.post("/", ensureIsAdmin, upload.single("image"), foodsController.create);
foodsRoutes.put("/:id", ensureIsAdmin, upload.single("image"), foodsController.update);
foodsRoutes.get("/:id", foodsController.show);
foodsRoutes.delete("/:id", ensureIsAdmin, foodsController.delete);
foodsRoutes.get("/", foodsController.index);

module.exports = foodsRoutes;