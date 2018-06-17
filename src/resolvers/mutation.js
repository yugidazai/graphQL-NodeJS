function addProduct(parent, { name, description, price, imageUrl }, context, info) {
  if (!name) return new Promise((resolve, reject) => {
    reject(new Error("Missing Product name!"))
  })
  if (!description) return new Promise((resolve, reject) => {
    reject(new Error("Missing Product description!"))
  })
  if (!price) return new Promise((resolve, reject) => {
    reject(new Error("Missing Product price!"))
  })

  return context.db.mutation.createProduct(
    {
      data: {
        name, description, price, imageUrl: imageUrl || ''
      }
    },
    info
  )
}

function deleteProduct(parent, { id }, context, info) {
  if (!id) return new Promise((resolve, reject) => {
    reject(new Error("Missing Product ID!"))
  })
  return context.db.mutation.deleteProduct({ where: { id } }, info)
}

function updateProduct(parent, { id, data }, context, info) {
  if (!id) return new Promise((resolve, reject) => {
    reject(new Error("Missing Product ID!"))
  })

  return context.db.mutation.updateProduct(
    {
      where: { id },
      data: data || {}
    },
    info
  )
}

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct
}
