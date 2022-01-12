import axios from "axios"

export const getUserPosts = async (userId) => {
  return await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
}