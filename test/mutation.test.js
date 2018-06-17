const mutation = require('../src/resolvers/mutation')

describe("GraphQL mutation", () => {
  let context = {
    db: {
      mutation: {
        createProduct: {},
        deleteProduct: {},
        updateProduct: {}
      }
    }
  }

  beforeAll(() => {
    context.db.mutation.createProduct = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({
          name: "Product A",
          description: "Description for product A",
          price: 2.3
        })
      })
    })
    context.db.mutation.updateProduct = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({
          name: "Product A",
          description: "Description for product A",
          price: 3.3
        })
      })
    })
  })

  describe("Add product", () => {
    it("Should fail when creating product without name", (done) => {
      mutation.addProduct({}, {}, null, null).catch(err => {
        expect.assertions(2)
        expect(err.message).toEqual("Missing Product name!")
        expect(err).toEqual(new Error("Missing Product name!"))
        done()
      })
    })
    it("Should fail when creating product without description", (done) => {
      mutation.addProduct({}, { name: "test" }, null, null).catch(err => {
        expect.assertions(2)
        expect(err.message).toEqual("Missing Product description!")
        expect(err).toEqual(new Error("Missing Product description!"))
        done()
      })
    })
    it("Should fail when creating product without price", (done) => {
      mutation.addProduct({}, { name: "test", description: "description" }, null, null).catch(err => {
        expect.assertions(2)
        expect(err.message).toEqual("Missing Product price!")
        expect(err).toEqual(new Error("Missing Product price!"))
        done()
      })
    })
    it("Should return created product", (done) => {
      const testProduct = {
        name: "Product A",
        description: "Description for product A",
        price: 2.3
      }
      mutation.addProduct({}, testProduct, context, {})
        .then(product => {
          expect.assertions(3)
          expect(product.name).toEqual("Product A")
          expect(product.description).toEqual("Description for product A")
          expect(product.price).toEqual(2.3)
          done()
        })
    })
  })

  describe("Delete product", () => {
    it("Should fail when deleting product without id", (done) => {
      mutation.deleteProduct({}, {}, null, null).catch(err => {
        expect.assertions(2)
        expect(err.message).toEqual("Missing Product ID!")
        expect(err).toEqual(new Error("Missing Product ID!"))
        done()
      })
    })
  })

  describe("Update product", () => {
    it("Should fail when updating product without id", (done) => {
      mutation.updateProduct({}, {}, null, null).catch(err => {
        expect.assertions(2)
        expect(err.message).toEqual("Missing Product ID!")
        expect(err).toEqual(new Error("Missing Product ID!"))
        done()
      })
    })
    it("Should return updated product", (done) => {
      const updateProduct = {
        id: "testid",
        data: {
          name: "Product A",
          description: "Description for product A",
          price: 3.3
        }
      }
      mutation.updateProduct({}, updateProduct, context, {})
        .then(product => {
          expect.assertions(3)
          expect(product.name).toEqual("Product A")
          expect(product.description).toEqual("Description for product A")
          expect(product.price).toEqual(3.3)
          done()
        })
    })
  })
})
