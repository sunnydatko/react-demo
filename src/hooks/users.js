import { useMutation, useQuery, queryCache } from 'react-query';

// api
import { getUsers, createUser, updateUser, deleteUser } from './../api';

/**
 * Queries
 */

/** Get a list of users */
export const useGetUsers = (params) => {
  return useQuery('users', () => getUsers(params));
};

/** Get a single user */
// export const useUser = (userID, params) => {
//   return useQuery(['users', userID], () => getUser(userID, params));
// };

/**
 * Mutations
 */

/** Create a single user */
export const useCreateUser = () => {
  return useMutation(createUser);
};

/** Update a single user */
export const useUpdateUser = () => {
  return useMutation(({ userID, body }) => updateUser(userID, body));
};

/** Delete a single user */
export const useDeleteUser = () => {
  return useMutation(deleteUser, {
    onSettled: () => {
      queryCache.invalidateQueries('users');
    },
  });
};
