import axios from 'axios';
const apiEndPoint = 'http://localhost:8000/api/suppliers/';

export function getSuppliers() {
  return axios.get(apiEndPoint);
}

export function getSupplier(supplierId) {
  return axios.get(apiEndPoint + supplierId + '/');
}

export function saveSupplier(obj) {
  if (obj.id === '') {
    return axios.post(apiEndPoint, obj);
  } else {
    return axios.put(apiEndPoint + obj.id + '/', obj);
  }
}
