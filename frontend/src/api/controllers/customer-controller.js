import axios from "axios";

export const customerFollowRequest = (data) => axios.post(`/customer/follow`, data);