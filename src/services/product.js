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
      VALUES ('${product.name}', '${product.barcode}', ${product.price}, ${product.stock})`;

    await db.executeSql(queryBase);
    console.log('Salvo com sucesso')
  } catch (error) {
    throw Error(error)
  }
}
