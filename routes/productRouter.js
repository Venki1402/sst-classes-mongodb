const router = require("express").Router();
const productControllers = require("../controllers/productController");

// post route
router.post("/", productControllers.createProduct);

// get route
router.get("/", productControllers.getallProducts);

// Get product by id
router.get("/:id", productControllers.getById);

// Update product
router.put("/:id", productControllers.updateProduct);

/// Delete a Resource
router.delete("/:id", productControllers.deleteProduct);

module.exports = router;
