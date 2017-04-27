import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql/type';
import fetch from 'node-fetch';

import UserType from '../user/user-type';

const getUser = (url) => {
  return fetch(url).then(res => res.json());
};

const AgendaType = new GraphQLObjectType({
  name: 'AgendaType',
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    date: { type: GraphQLString },
    invitedUsers: {
      type: new GraphQLList(UserType),
      resolve: async (obj) => {
        return await obj.invitedUsers.map((u) => getUser(`http://localhost:3000/v1/user/${u}`))
      },
    },
  }),
});

export default AgendaType;
