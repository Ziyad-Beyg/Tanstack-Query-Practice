import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPostsOld = () => {
  return api.get(`/posts?_start=1&_limit=3`);
};

export const fetchPosts = (pageNumber, { signal }) => {
  return api.get(`/posts?_start=${pageNumber}&_limit=3`, {
    signal,
  });
};

export const fetchSinglePost = async (id) => {
  try {
    const res = await api.get(`/posts/${id}`);
    return res.status === 200 ? res?.data : [];
  } catch (error) {
    console.log(error.message);
  }
};

// DELETE POST
export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

// UPDATE POST
export const updatePost = (id) => {
  return api.patch(`/posts/${id}`, { title: "I AM UPDATED" });
};

// Infinite Scrolling API

export const infiniteFetch = async (pageParam = 1, { signal }) => {
  try {
    const res = await axios.get(
      `https://api.github.com/users?per_page=10&page=${pageParam}`,
      {
        signal,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
