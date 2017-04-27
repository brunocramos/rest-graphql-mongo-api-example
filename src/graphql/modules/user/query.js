import { GraphQLList, GraphQLString } from 'graphql/type';
import fetch from 'node-fetch';

import UserType from './user-type';

const UserQuery = {
  type: new GraphQLList(UserType),
  args: {
    _id: {
      name: '_id',
      type: GraphQLString,
    },
  },
  resolve: (obj, { _id }) => fetch(`http://localhost:3000/v1/user${_id ? `/${_id}` : ''}`).then(async res => {
    const data = await res.json() || [];
    return Array.isArray(data) ? data : [data];
  }),
};

export default UserQuery;
