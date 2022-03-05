import axios from "axios";

export const getSellersRequest = (provinceId) => axios.get(`/seller?provinceId=${provinceId}`);