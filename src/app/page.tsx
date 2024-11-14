'use client'

import { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, getDoc, onSnapshot, Timestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDh8ajaMKwGAwRQ2T1RBGRn2UYs6nCdrTQ",
  authDomain: "tempmail-fc175.firebaseapp.com",
  projectId: "tempmail-fc175",
  storageBucket: "tempmail-fc175.firebasestorage.app",
  messagingSenderId: "523232906884",
  appId: "1:523232906884:web:6365b564dbc47f8c0e7cd1"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default function Home() {
  const [tempEmail, setTempEmail] = useState('')
  const [messages, setMessages] = useState([])

  const generateEmail = async () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let randomString = ''
    for (let i = 0; i < 10; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    
    const newEmail = `${randomString}@lazy-smtp-server.fly.dev`
    
    await setDoc(doc(db, 'tempEmails', randomString), {
      email: newEmail,
      createdAt: Timestamp.fromDate(new Date()),
      messages: []
    })
    
    setTempEmail(newEmail)
  }

  useEffect(() => {
    if (tempEmail) {
      const username = tempEmail.split('@')[0]
      const unsubscribe = onSnapshot(doc(db, 'tempEmails', username), (doc) => {
        if (doc.exists()) {
          setMessages(doc.data().messages || [])
        }
      })
      
      return () => unsubscribe()
    }
  }, [tempEmail])

  return (
    <main className="p-4">
      <button 
        onClick={generateEmail}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Gerar Email Temporário
      </button>
      
      {tempEmail && (
        <div className="mt-4">
          <p>Seu email temporário:</p>
          <p className="font-mono">{tempEmail}</p>
          
          <div className="mt-4">
            <h2 className="text-xl font-bold">Mensagens:</h2>
            {messages.map((msg, index) => (
              <div key={index} className="border p-4 mt-2 rounded">
                <p>De: {msg.from}</p>
                <p>Assunto: {msg.subject}</p>
                <p>Texto: {msg.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}