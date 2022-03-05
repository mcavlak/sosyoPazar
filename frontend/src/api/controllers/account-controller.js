import axios from "axios";

export const loginRequest = (data) => axios.post(`/account/login`, data);

export const customerRegisterRequest = (data) => axios.post(`/account/register/customer`, data);

export const sellerRegisterRequest = (data) => axios.post(`/account/register/seller`, data);
