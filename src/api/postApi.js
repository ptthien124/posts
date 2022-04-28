import axiosClient from "./axiosClient";

const postApi = {
  getAllPosts() {
    const url = "/posts";
    return axiosClient.get(url);
  },

  getPostId(id) {
    const url = `/posts/${id}`;
    return axiosClient.get(url);
  },

  getPostComments(id) {
    const url = `/posts/${id}/comments`;
    return axiosClient.get(url);
  },
};

export default postApi;
