const express = require("express");

//Primero declaramos las funciones con la api
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  return await res.json();
}

async function getCarts() {
  const res = await fetch("https://fakestoreapi.com/carts");
  return await res.json();
}

async function getUsers() {
  const res = await fetch("https://fakestoreapi.com/users");
  return await res.json();
}
async function getCategory() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  return await res.json();
}
async function getCategoriesId(category) {
  const res = await fetch("https://fakestoreapi.com/products/category/"+ category);
  return await res.json();
}



//res
async function getPropCategories(){
  let categories = await getCategory();

  const products = await Promise.all(
    categories.map(async (category) => {
      return {
        category,
        products: await getCategoriesId(category),
      };
    })) 
    return products

};

//res
async function getPropCart(){
  let carts = await getCarts();
  return carts
}

//res
async function getMappedProducts () {
  let products = await getProducts();
  products = products.map((product) => ({
    id: product.id,
    title: product.title,
    price: product.price,
  }));
  return products;
};

let product = {
  getProducts,
  getCarts,
  getUsers,
  getCategory,
  getCategoriesId,
  getPropCategories,
  getPropCart,
  getMappedProducts,
};

module.exports = product;
