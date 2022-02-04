const { createServer } = require ('http');
const { execute, subscribe } = require ('graphql');
const { SubscriptionServer } = require ('subscriptions-transport-ws');
const { makeExecutableSchema } = require ('@graphql-tools/schema');
const { PubSub } = require ('graphql-subscriptions');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');


const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const pubsub = new PubSub();


const httpServer = createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });
const subscriptionServer = SubscriptionServer.create({
  // This is the `schema` we just created.
  schema,
  // These are imported = require `graphql`.
  execute,
  subscribe,
}, {
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // Pass a different path here if your ApolloServer serves at
  // a different path.
  path: '/subscriptions',
});
const server = new ApolloServer({
  schema,
  context: authMiddleware,
  context: { pubsub },
  plugins: [{
    async serverWillStart() {
      return {
        async drainServer() {
          subscriptionServer.close();
        }
      };
    }
  }],
  subscriptions: {
    path: '/subscriptions',
    onConnect: (connectionParams, webSocket, context) => {
      console.log('Client connected');
    },
    onDisconnect: (webSocket, context) => {
      console.log('Client disconnected')
    },
  },
});

server.applyMiddleware({ app });
server.installSubscriptionHandlers(httpServer);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  // app.listen(PORT, () => {
  //   console.log(`API server running on port ${PORT}!`);
  //   console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  // });
  httpServer.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(
      `Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`,
    );
  });
});
