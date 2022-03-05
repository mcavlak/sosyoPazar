import axios from "axios";

export const getPostsRequest = () => axios.get(`/post`);

export const savePostRequest = (data) => axios.post(`/post`, data);

export const getFollowingPostsRequest = () => axios.get(`/post/myFollow`);