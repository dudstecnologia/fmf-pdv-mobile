import { enablePromise, openDatabase } from 'react-native-sqlite-storage'

enablePromise(true)

export const connectDb = async () => {
  return openDatabase(
    { name: "pdv.db", location: "default" },
    () => {
      console.log('Conectado ao Sqlite')
    },
    (error) => {
      console.error(error)
      throw Error("Erro ao conectar ao Sqlite")
    }
  )
}

export const createTables = async (db) => {
  const tableProducts = `
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER DEFAULT 1,
        name TEXT,
        barcode TEXT,
        price NUMERIC(8,2),
        stock INTEGER,
        PRIMARY KEY(id)
    )
  `

  const tableOrders = `
   CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      timestamp BIGINT,
      client TEXT,
      total NUMERIC(8,2)
   )
  `

  const tableOrderItems = `
   CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER,
      product_id INTEGER,
      quantity INTEGER,
      unit_price NUMERIC(8,2),
      total_price NUMERIC(8,2)
   )
  `

  try {
    await db.executeSql(tableProducts)
    await db.executeSql(tableOrders)
    await db.executeSql(tableOrderItems)

    console.log('Tabelas criadas ou iniciadas com sucesso')
  } catch (error) {
    console.log('Erro ao criar as tabelas')
    console.log(error)
  }
}
