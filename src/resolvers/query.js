function product(parent, args, context, info) {
  if (!args.id) return new Promise((resolve, reject) => {
    reject(new Error("Missing Product ID!"))
  })
  return context.db.query.product({ where: { id: args.id } }, info)
}

function products(parent, args, context, info) {
  const { query = {}, resultsPerPage = 20, page = 1 } = args
  return context.db.query.products({
    where: query,
    skip: (page - 1) * resultsPerPage,
    first: resultsPerPage
  }, info)
}

function productsByName(parent, args, context, info) {
  if (!args.name) return new Promise((resolve, reject) => {
    reject(new Error("Missing Product name!"))
  })
  args.query = { name: args.name }
  delete args.name
  return products(parent, args, context, info)
}

function productsByPriceRange(parent, args, context, info) {
  args.query = {}
  if (args.minPrice) {
    args.query.price_gte = args.minPrice
  }
  if (args.maxPrice) {
    args.query.price_lte = args.maxPrice
  }
  delete args.minPrice
  delete args.maxPrice
  return products(parent, args, context, info)
}

module.exports = {
  product,
  products,
  productsByName,
  productsByPriceRange,
  info: () => `This is the API for a GraphQL service of Products`
}
