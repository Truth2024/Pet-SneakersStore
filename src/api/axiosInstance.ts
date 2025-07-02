// src/api/axiosInstance.ts
import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://685c32ef89952852c2dc9744.mockapi.io/',
});

export default instance;