import { connectDb } from './db'

export const listProducts = async () => {
  try {
    const db = await connectDb()

    const results = await db.executeSql(`SELECT * FROM products ORDER BY id DESC`)
    if (results) {
      results?.forEach((result) => {
        for (let index = 0; index < result.rows.length; index++) {
          console.log(result.rows.item(index))
        }
      })

      if (results[0].rows.length == 0) {
        // await setTest(db)
      }
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
