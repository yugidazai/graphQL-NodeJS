const Config = require('config')
const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/query')
const Mutation = require('./resolvers/mutation')

const resolvers = {
  Query,
  Mutation
}

const server = new GraphQLServer({
  typeDefs: Config.graphql_server.typeDefs,
  resolvers,
  // To pass warning `Type "Node" is missing a "resolveType" resolver.`
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: req => ({ ...req, db: new Prisma(Config.prisma)})
})

server.start(
  { port: Config.graphql_server.port },
  ({ port }) => console.log(`Server is running on http://localhost:${port}`)
)
