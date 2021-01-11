import $ from "jquery";

//const APIENDPOINT = 'http://localhost:8000/api/'
const APIENDPOINT = "https://api-arene.menopi.ch/api/";

function getProducts() {
  return $.ajax({
    url: APIENDPOINT + "products",
    method: "GET"
  });
}

function getProduct(id) {
  return $.ajax({
    url: APIENDPOINT + "products/" + id,
    method: "GET"
  });
}

function addProduct(product) {
  return $.ajax({
    url: APIENDPOINT + "products",
    method: "POST",
    data: {
      name: product.name,
      price: product.price,
      stock: product.stock,
      minimum_stock: product.minimum_stock,
      category_id: product.category,
      trading_card_game_id: product.tcg,
      language_id: product.language
    }
  });
}

function deleteProduct(id) {
  return $.ajax({
    url: APIENDPOINT + "products/" + id,
    method: "DELETE"
  });
}

function updateProduct(id, product) {
  return $.ajax({
    url: APIENDPOINT + "products/" + id,
    method: "PUT",
    data: {
      name: product.name,
      price: product.price,
      stock: product.stock,
      minimum_stock: product.minimum_stock,
      category_id: product.category,
      trading_card_game_id: product.tcg,
      language_id: product.language
    }
  });
}

function getEvents() {
  return $.ajax({
    url: APIENDPOINT + "events",
    method: "GET"
  });
}

function getEvent(id) {
  return $.ajax({
    url: APIENDPOINT + "events/" + id,
    method: "GET"
  });
}

function addEvent(event) {
  return $.ajax({
    url: APIENDPOINT + "events",
    method: "POST",
    data: {
      name: event.name,
      trading_card_game_id: event.tcg,
      date: event.date
    }
  });
}

function updateEvent(id, event) {
  return $.ajax({
    url: APIENDPOINT + "events/" + id,
    method: "PUT",
    data: {
      name: event.name,
      trading_card_game_id: event.tcg,
      date: event.date
    }
  });
}

function deleteEvent(id) {
  return $.ajax({
    url: APIENDPOINT + "events/" + id,
    method: "DELETE"
  });
}

export default {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  getEvents,
  getEvent,
  addEvent,
  deleteEvent,
  updateEvent
};
