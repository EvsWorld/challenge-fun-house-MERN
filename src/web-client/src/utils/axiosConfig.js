const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

module.exports = axiosInstance;
