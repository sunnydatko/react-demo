import axios from 'axios';

const token = process.env.REACT_APP_AUTH_TOKEN;

const defaultOptions = {
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
};

export const getUsers = async () => {
  return await axios('https://gorest.co.in/public-api/users');
};

export const createUser = async (user) => {
  const { data } = await axios.post(
    'https://gorest.co.in/public-api/users',
    user,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return data;
};

export const updateUser = async (user) => {
  return await axios.patch(
    `https://gorest.co.in/public-api/users/${user.id}`,
    user,
    {
      ...defaultOptions,
    }
  );
};

export const deleteUser = async (user) => {
  return await axios.delete(
    `https://gorest.co.in/public-api/users/${user.id}`,
    {
      ...defaultOptions,
    }
  );
};
