import axios from "axios";

export const getSellersRequest = () => axios.get(`/seller`);

export const getSellerRequest = (id) => axios.get(`/seller/${id}`);

export const getSellersByProvinceIdRequest = (provinceId) => axios.get(`/seller/province/${provinceId}`);