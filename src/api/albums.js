import axios from 'axios';

export const getUserAlbums = async (userId) => {
  return await axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}/albums`
  );
};
