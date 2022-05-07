import axios from "axios";

export const getProductRequest = () => axios.get(`/product`);

export const saveProductRequest = (product) => axios.post(`/product`, product);

export const getProductsRequest = () => axios.get(`/product/all`);