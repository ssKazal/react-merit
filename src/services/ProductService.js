import axios from 'axios';
const apiEndPoint = 'http://localhost:8000/api/products/';

export function getProducts() {
  return axios.get(apiEndPoint);
}

export function getProduct(productId) {
  return axios.get(apiEndPoint + productId + '/');
}

export function saveProduct(obj) {
  if (obj.id === '') {
    return axios.post(apiEndPoint, obj);
  } else {
    return axios.put(apiEndPoint + obj.id + '/', obj);
  }
}
