const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require("mongoose")

const { MONGOURI } = require('./config.js')
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers/index');

const pubSub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req, pubSub}) 
});

mongoose.connect(MONGOURI, {useNewUrlParser: true}).then(() => {
    return server.listen({port: 5000 });
}).then((res) => {
    console.log(`Server Running`)  
})