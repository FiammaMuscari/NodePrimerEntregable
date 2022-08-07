const express = require("express");
const router = express.Router();
const storeController = require("./controller/storeController");
const errorHandler = require("./middleware/errorHandler");

//Tercero crear nuestras nuevas rutas


//Productos caros
//http://localhost:3000/products/categories/expensive
router.get(
  "/products/categories/expensive",
  storeController.getCategoryExpensive
);

//productos
//http://localhost:3000/products/
router.get(
  "/products/",
  storeController.getProductMethods
);

//categorias
//http://localhost:3000/products/categories
router.get(
  "/products/categories",
  storeController.getCategories
);

//precios asc y desc
//http://localhost:3000/products/prices/
//http://localhost:3000/products/prices/?order=desc
//http://localhost:3000/products/prices/?order=asc
router.get(
  "/products/prices",
  storeController.getProductPrices
);

//productos por id
//http://localhost:3000/products/:id
router.get(
  "/products/:id",
  storeController.getProductById
); 

//carros grandes
//http://localhost:3000/carts/bigcarts
router.get(
  "/carts/bigcarts",
  storeController.getBigCarts
);

//carros
//http://localhost:3000/carts
router.get(
  "/carts",
  storeController.getCarts
);

//usuarios
//http://localhost:3000/users
router.get(
  "/users",
  storeController.getUsers
);

//primeros 3 usuarios
//http://localhost:3000/users/firsts
router.get(
  "/users/firsts",
  storeController.getUsersFirst
);

//http://localhost:3000/
router.get("/", (_req, res) => {
  res.send("Bienvenido al entregable de Fetch de Fiamma Muscari");
});

//error status 404
router.use(errorHandler.notFound);

module.exports = router;
