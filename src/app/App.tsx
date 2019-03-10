import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'

interface Data {
  userId: number
  id: number
  title: string
  completed: boolean
}
const App: React.FC = () => {
  const [data, setData] = useState<Data | null>(null)

  const getData = async () => {
    const { data } = await axios.get<Data>(
      'https://jsonplaceholder.typicode.com/todos/123'
    )
    setData(data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div style={{ padding: '1em 3em', border: '1px solid black' }}>
      My First Extension
      <h1>{data && data.title}</h1>
    </div>
  )
}

export default App
