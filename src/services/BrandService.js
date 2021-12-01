import axios from 'axios';
const apiEndPoint = 'http://localhost:8000/api/brands/';

export function getBrands() {
  return axios.get(apiEndPoint);
}
