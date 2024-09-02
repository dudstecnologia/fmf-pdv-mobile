import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { enablePromise, openDatabase } from 'react-native-sqlite-storage';

export default function TestSqlite({ navigation }) {
  enablePromise(true);

  const connectToDatabase = async () => {
    return openDatabase(
      { name: "test.db", location: "default" },
      () => {
        console.log('Conectou com sucesso')
      },
      (error) => {
        console.log('Erro ao conectar')
        console.log(error)
      }
    )
  }

  const createTables = async (db) => {
    const tableTest = `
      CREATE TABLE IF NOT EXISTS test (
          id INTEGER DEFAULT 1,
          name TEXT,
          phone TEXT,
          PRIMARY KEY(id)
      )
    `

    try {
      await db.executeSql(tableTest)
      console.log('Tabela criada ou iniciada com sucesso')
    } catch (error) {
      console.log('Erro ao criar a tabela')
      console.error(error)
    }
  }

  const setTest = async (db) => {
    const insertQuery = `INSERT INTO test (name, phone) VALUES (?, ?)`
    const values = [
      'Teste',
      '9299383744',
    ]
    try {
      db.executeSql(insertQuery, values)
      console.log('Inserido com sucesso')
    } catch (error) {
      console.log("Erro ao inserir")
      console.error(error)
    }
  }

  const getTest = async (db) => {
    try {
      const results = await db.executeSql("SELECT * FROM test")
      if (results) {
        results?.forEach((result) => {
          for (let index = 0; index < result.rows.length; index++) {
            console.log(result.rows.item(index))
          }
        })

        if (results[0].rows.length == 0) {
          await setTest(db)
        }
      }
    } catch (error) {
      console.log('Falha getTest')
      console.error(error)
    }
  }

  const loadData = async () => {
    try {
      const db = await connectToDatabase()
      await createTables(db)
      await getTest(db)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <SafeAreaView>
      <Text>Test Sqlite</Text>
    </SafeAreaView>
  )
}
