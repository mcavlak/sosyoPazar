import axios from "axios";

export const getPostsRequest = () => axios.get(`/post`);

export const savePostRequest = (content) => axios.post(`/post`, content);

export const getFollowingPostsRequest = () => axios.get(`/post/myFollow`);