import { MongoClient } from "mongodb";
import { GraphQLServer, PubSub } from "graphql-yoga";
import Query from "./resolvers/Query.js"
import Mutation from "./resolvers/Mutation.js"
import Partido from "./resolvers/Partido.js"
import Subscription from "./resolvers/Subscription.js"

import "babel-polyfill";

const usr = "bvillarreal";
const pwd = "123";
const url = "cluster0-qr8a1.mongodb.net/test?retryWrites=true&w=majority";

/**
 * Connects to MongoDB Server and returns connected client
 * @param {string} usr MongoDB Server user
 * @param {string} pwd MongoDB Server pwd
 * @param {string} url MongoDB Server url
 */
const connectToDb = async function(usr, pwd, url) {
  const uri = `mongodb+srv://${usr}:${pwd}@${url}`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await client.connect();
  return client;
};

/**
 * Starts GraphQL server, with MongoDB Client in context Object
 * @param {client: MongoClinet} context The context for GraphQL Server -> MongoDB Client
 */
const runGraphQLServer = function(context) {
  
  const resolvers = {
    Partido,

    Query,

    Mutation,

    Subscription
  };

  const server = new GraphQLServer({ typeDefs: './src/schema.graphql', resolvers, context });
  const options = {
    port: 4000
  };

  try {
    server.start(options, ({ port }) =>
      console.log(
        `Server started, listening on port ${port} for incoming requests.`
      )
    );
  } catch (e) {
    console.info(e);
    server.close();
  }
};

const runApp = async function() {
  const client = await connectToDb(usr, pwd, url);
  console.log("Connect to Mongo DB");
  let a;
  const pubsub = new PubSub();
  try {
    runGraphQLServer({ client ,db: client.db("TablasEquipos"), pubsub, a });
  } catch (e) {
    console.log(e)
    client.close();
  }
};

runApp();