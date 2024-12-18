import { connectDb } from './db'

export const listProducts = async () => {
  try {
    const db = await connectDb()

    let products = []
    const results = await db.executeSql(`SELECT * FROM products ORDER BY id DESC`)
    if (results) {
      results?.forEach((result) => {
        for (let index = 0; index < result.rows.length; index++) {
          products.push(result.rows.item(index))
        }
      })

      return products
    }
  } catch (error) {
    throw Error(error)
  }
}

export const createProduct = async (product) => {
  try {
    const db = await connectDb()
    
    const queryBase = `INSERT INTO products (name, barcode, price, stock)
      VALUES ('${product.name}', '${product.barcode}', ${product.price}, ${product.stock})`

    await db.executeSql(queryBase)
  } catch (error) {
    throw Error(error)
  }
}

export const updateProduct = async (product) => {
  try {
    const db = await connectDb()

    const queryBase = `UPDATE products SET name='${product.name}', barcode='${product.barcode}', price=${product.price}, stock=${product.stock} WHERE id=${product.id}`

    await db.executeSql(queryBase)
  } catch (error) {
    throw Error(error)
  }
}

export const findProductById = async (id) => {
  try {
    const db = await connectDb()

    const result = await db.executeSql(`SELECT * FROM products WHERE id=${id}`)

    if (result && result[0].rows.length > 0) {
      return result[0].rows.item(0)
    }

    return null
  } catch (error) {
    throw Error(error)
  }
}

export const findProductByBarcode = async (barcode) => {
  try {
    const db = await connectDb()

    const result = await db.executeSql(`SELECT * FROM products WHERE barcode='${barcode}'`)

    if (result && result[0].rows.length > 0) {
      return result[0].rows.item(0)
    }

    return null
  } catch (error) {
    throw Error(error)
  }
}
