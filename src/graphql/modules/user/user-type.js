import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString } from 'graphql/type';
import fetch from 'node-fetch';

import AgendaType from '../agenda/agenda-type';

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    agenda: {
      type: new GraphQLList(AgendaType),
      resolve: ({ _id }) => fetch(`http://localhost:3000/v1/user/${_id}/agenda`).then(res => res.json()),
    },
  }),
});

export default UserType;
