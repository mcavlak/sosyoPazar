import axios from "axios";

export const getSellersRequest = () => axios.get(`/seller`);

export const getSellerRequest = (id) => axios.get(`/seller/${id}`);

export const updFollowSellerRequest = (sellerId) => axios.put(`/seller/${sellerId}/follow`);

export const updUnFollowSellerRequest = (sellerId) => axios.put(`/seller/${sellerId}/unfollow`);

export const getSellersByProvinceIdRequest = (provinceId) => axios.get(`/seller/province/${provinceId}`);

export const addProfilePhoto = (file) => axios.put(`/seller/upload/profilePhoto`, file);

export const addCoverPhoto = (file) => axios.put(`/seller/upload/coverPhoto`, file);