'use client'

import { createContext, useState } from 'react'

export const StateContext = createContext({})

export default function StateProvider({ children }) {
  const [players, setPlayers] = useState('');

  return <StateContext.Provider value={{ players, setPlayers }}>{children}</StateContext.Provider>
}
