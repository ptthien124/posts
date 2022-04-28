import axiosClient from "./axiosClient";

const userApi = {
  getAllUsers() {
    const url = "/users";
    return axiosClient.get(url);
  },

  getUserId(id) {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
};

export default userApi;
