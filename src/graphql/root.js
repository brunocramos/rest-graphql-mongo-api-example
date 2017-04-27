import { GraphQLObjectType, GraphQLSchema } from 'graphql/type';

import UserQuery from './modules/user/query';
const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: UserQuery,
  },
});

export default new GraphQLSchema({ query });
