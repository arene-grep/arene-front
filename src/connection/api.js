import $ from "jquery";

//const APIENDPOINT = 'http://localhost:8000/api/'
// const APIENDPOINT = 'https://o34z4ajegy.preview.infomaniak.website/api/'
const APIENDPOINT = 'https://api.menopi.ch/api/'

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

export default {
  getProducts,
  getProduct,
  getEvents,
  getEvent,
};
