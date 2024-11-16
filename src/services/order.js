import { connectDb } from './db'

export const listOrders = async () => {
  try {
    const db = await connectDb()

    let orders = []
    const results = await db.executeSql(`SELECT * FROM orders ORDER BY id DESC`)
    if (results) {
      results?.forEach((result) => {
        for (let index = 0; index < result.rows.length; index++) {
          orders.push(result.rows.item(index))
        }
      })

      return orders
    }
  } catch (error) {
    throw Error(error)
  }
}

export const createOrder = async (items, total) => {
  try {
    const db = await connectDb();

    const timestamp = new Date().getTime();

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    const queryBase = `INSERT INTO orders (date, timestamp, client, total)
      VALUES ('${today}', ${timestamp}, 'Final', '${total.toFixed(2)}')`

    let dataOrder = await db.executeSql(queryBase)
    const idOrder = dataOrder[0].insertId

    for (let x = 0; x < items.length; x++) {
      const i = items[x]

      const queryItem = `INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price)
          VALUES (${idOrder}, '${i.id}', ${i.qtd}, ${i.price}, '${(i.price * i.qtd).toFixed(2)}')`

      await db.executeSql(queryItem)
    }
  } catch (error) {
    throw Error(error)
  }
}
