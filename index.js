import express from 'express';
import bodyParser from 'body-parser';
import graphqlHttp from 'express-graphql';
import winston from 'winston';
import expressWinston from 'express-winston';

const app = express();
app.use(bodyParser.json());
app.use(expressWinston.logger({
  transports: [new winston.transports.Console()],
  ignoreRoute: (req, res) => req.path === '/graphql',
}));

const version = 'v1';

// Start db
import './db';

// Start routes
import routes from './routes';
routes(app, version);

// GraphQL
import rootSchema from './src/graphql/root';
app.use('/graphql', graphqlHttp({ schema: rootSchema, graphiql: true }));
console.log('[SERVER] Running GraphQL server at http://localhost/3000/graphql');

app.listen(3000);
console.log(`[SERVER] Running RESTful API server at http://localhost/3000/${version}`);
