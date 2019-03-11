import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'

interface Data {
  userId: number
  id: number
  title: string
  completed: boolean
}

type OnMessageCallback = (
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => void

const subscribe = (fn: OnMessageCallback) =>
  chrome.runtime.onMessage.addListener(fn)

const unsubscribe = (fn: OnMessageCallback) =>
  chrome.runtime.onMessage.removeListener(fn)

const App: React.FC = () => {
  const [data, setData] = useState<Data | null>(null)
  const [message, setMessage] = useState({ name: '' })
  const getData = async () => {
    const { data } = await axios.get<Data>(
      'https://jsonplaceholder.typicode.com/todos/12'
    )
    console.log(data)
    setData(data)
  }

  const handleMessage: OnMessageCallback = (req, sender, res) => {
    setMessage(req)
  }

  useEffect(() => {
    subscribe(handleMessage)
    getData()
    return () => {
      unsubscribe(handleMessage)
    }
  }, [])

  return (
    <div style={{ padding: '1em 3em', border: '1px solid black' }}>
      My First Extension
      <h1>{data && data.title}</h1>
      <h1>{message.name}</h1>
    </div>
  )
}

export default App
