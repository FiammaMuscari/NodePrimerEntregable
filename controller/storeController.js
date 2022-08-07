//Segundo traemos los models
const getStoreModel = require("../model/storeModel");


//       Productos por categoria
// http://localhost:3000/products/categories <<<ruta>>>
let getCategories = async (_req, res) => {

  let categories = await getStoreModel.getCategory();

  const products = await Promise.all(
    categories.map(async (category) => {
      return {
        category,
        products: await getStoreModel.getCategoriesId(category),
      };})) 
      res.status(200).send(products);
    };

//       productos por categoria más caros
//http://localhost:3000/products/categories/expensive/ <<<ruta>>>
let getCategoryExpensive = async (_req, res) => {
  let products = await getStoreModel.getPropCategories();

  const expensive = products.map((category) => {
    const product = category.products.reduce((a, b) => {
        return a.price > b.price ? a : b
    })
    return {
        category: category.category,
        product
    }

})
res.status(200).send(expensive);
};


//    Productos por id con params 
//  http://localhost:3000/store/products/4 <<<ruta>>>
let getProductById = async (req, res) => {
  const id = req.params.id;
  let products = await getStoreModel.getProducts();
  products = products.map((product) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    category: product.category,
    rating: product.rating,
  }));
  res.status(200).send(products[id - 1]);
};

//    Productos por precios
//  http://localhost:3000/store/products/prices <<<ruta>>>
let getProductPrices =async(req, res) =>{
  let products = await getStoreModel.getProducts();
  let sorted = req.query.order;
  productsPrice = products
            .map((product) => {
                return { id: product.id, title: product.title, price: product.price }
            })
            .sort((a, b) => a.price - b.price)
            if (sorted === 'desc') products = productsPrice.reverse()
            res.status(200).send(productsPrice);
}

// Orden de productos asc o desc, y limite en busqueda
// http://localhost:3000/store/products/?limit=10 <<<ruta>>> **limite de 10**
// http://localhost:3000/store/products/?order=asc <<<ruta>>> **orden ascendente**
// http://localhost:3000/store/products/?order=desc <<<ruta>>> **orden descendiente**

const getProductMethods = async (req, res) => {
  let products = await getStoreModel.getMappedProducts();
  let sorted = req.query.order;
  let limited = req.query.limit;

  if (typeof sorted == "string") {
    if (sorted === "desc") {
      products.sort((a, b) => b.price - a.price);
      res.status(200).send(products);
    } else if (sorted === "asc") {
      products.sort((a, b) => a.price - b.price);
      res.status(200).send(products);
    }
  } else if (limited !== undefined) {
    let filtro = products.slice(limited - 1, products.length);
    res.status(200).send(filtro);
  } else {
    res.status(200).send(products);
  }
};

// Carritos
// http://localhost:3000/carts  <<<ruta>>>

let getCarts = async (_req, res) => {
  let carts = await getStoreModel.getCarts();
  res.status(200).send(carts);
};
// Carritos con 2 o más productos
// http://localhost:3000/carts/bigcarts  <<<ruta>>>

let getBigCarts = async (_req, res) => {
  let carts = await getStoreModel.getCarts();
        const productsCarts = await Promise.all(
            carts
                .filter((cart) => cart.products.length >= 2)
                .map(async ({ userId, ...rest }) => {
                    const { username } = await getStoreModel.getPropCart(userId)

                    return { username, ...rest }
                })
        )
  res.status(200).send(productsCarts);
};

// Usuarios
// http://localhost:3000/users <<<ruta>>>
let getUsers = async (_req, res) => {
  let users = await getStoreModel.getUsers();
  res.status(200).send(users);
};

// Primeros 3 usuarios
// http://localhost:3000/users/firsts <<<ruta>>>
let getUsersFirst = async (_req, res) => {
  let users = await getStoreModel.getUsers();
  let first= 3
  const firstUsers = users.slice(0,first)
  res.status(200).send(firstUsers);
};





const storeController = {
  getProductById,
  getProductMethods,
  getCarts,
  getUsers,
  getCategories,
  getUsersFirst,
  getProductPrices,
  getCategoryExpensive,
  getBigCarts,
};

module.exports = storeController;
