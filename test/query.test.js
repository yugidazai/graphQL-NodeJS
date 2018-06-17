const query = require('../src/resolvers/query')

describe("GraphQL query", () => {
  let context = {
    db: {
      query: {
        product: {},
        products: {}
      }
    }
  }

  beforeAll(() => {
    context.db.query.product = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({
          name: "Product A",
          description: "Description for product A",
          price: 2.3
        })
      })
    })
    context.db.query.products = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve([{
          name: "Product B",
          description: "Description for product B",
          price: 1.3
        }])
      })
    })
  })

  describe("get product", () => {
    it("Should fail when getting product without id", (done) => {
      query.product({}, {}, null, null).catch(err => {
        expect.assertions(2)
        expect(err.message).toEqual("Missing Product ID!")
        expect(err).toEqual(new Error("Missing Product ID!"))
        done()
      })
    })

    it("Should return product with correct id", (done) => {
      query.product({}, { id: "yugi"}, context, {})
        .then(product => {
          expect.assertions(3)
          expect(product.name).toEqual("Product A")
          expect(product.description).toEqual("Description for product A")
          expect(product.price).toEqual(2.3)
          done()
        })
    })
  })

  describe("get products", () => {
    it("Should return products", (done) => {
      query.products({}, {}, context, {})
        .then(products => {
          expect.assertions(4)
          expect(products.length).toEqual(1)
          const product = products[0]
          expect(product.name).toEqual("Product B")
          expect(product.description).toEqual("Description for product B")
          expect(product.price).toEqual(1.3)
          done()
        })
    })
  })

  describe("get product by name", () => {
    it("Should fail when getting product without name", (done) => {
      query.productsByName({}, {}, null, null).catch(err => {
        expect.assertions(2)
        expect(err.message).toEqual("Missing Product name!")
        expect(err).toEqual(new Error("Missing Product name!"))
        done()
      })
    })

    it("Should return product with correct name", (done) => {
      query.productsByName({}, { name: "Product B"}, context, {})
        .then(products => {
          const product = products[0]
          expect.assertions(3)
          expect(product.name).toEqual("Product B")
          expect(product.description).toEqual("Description for product B")
          expect(product.price).toEqual(1.3)
          done()
        })
    })
  })

  describe("get products by price range", () => {
    it("Should return products by range", (done) => {
      query.products({}, { minPrice: 2 }, context, {})
        .then(products => {
          expect.assertions(4)
          expect(products.length).toEqual(1)
          const product = products[0]
          expect(product.name).toEqual("Product B")
          expect(product.description).toEqual("Description for product B")
          expect(product.price).toEqual(1.3)
          done()
        })
    })
  })
})
