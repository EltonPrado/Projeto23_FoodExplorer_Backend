const { Router, request } = require("express");

const multer = require("multer");
const uploadConfig = require("../configs/upload");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ensureIsAdmin = require("../middlewares/ensureIsAdmin");
const FoodsController = require("../controllers/FoodsController");
const FoodsImageController = require("../controllers/FoodsImageController");

const foodsRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const foodsController = new FoodsController();
const foodsImageController = new FoodsImageController();

foodsRoutes.use(ensureAuthenticated);

foodsRoutes.post("/", ensureIsAdmin, upload.single("image"), foodsController.create);
foodsRoutes.put("/:id", ensureIsAdmin, foodsController.update);
foodsRoutes.patch("/:id", ensureIsAdmin, upload.single("image"), foodsImageController.update);
foodsRoutes.get("/:id", foodsController.show);
foodsRoutes.delete("/:id", ensureIsAdmin, foodsController.delete);
foodsRoutes.get("/", foodsController.index);

module.exports = foodsRoutes;