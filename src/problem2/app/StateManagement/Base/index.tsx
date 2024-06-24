import axios from 'axios';

const BaseApi = axios.create({
  baseURL: 'https://interview.switcheo.com/',
});

export default BaseApi;