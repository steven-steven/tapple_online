"use client";

import _ from 'lodash';
import React, { useContext } from 'react';
import { StateContext } from './state-provider'
import { useRouter } from 'next/navigation'

export default function Page() {
  const { players, setPlayers } = useContext(StateContext)
  const router = useRouter()

  const handleSubmit = (event) => {
    event.preventDefault()
    router.push('/game')
  }

  return (
    <main className="flex flex-col min-h-screen items-center bg-[#E0F2FF] py-10 px-8 gap-3 text-black">
      <div className='text-lg border-b	border-sky-500 w-full pb-2'>
        Tapple_Online
      </div>
      <div className='form flex-grow flex items-center'>
        <div className='bg-slate-50 border border-sky-500 flex justify-center p-3 gap-2 items-center'>
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-4">
              <label htmlFor="number" className="block text-[#1F93FF] font-bold mb-2">
                Number of players:
              </label>
              <input
                type="number"
                id="number"
                value={players}
                min="2"
                onChange={(event) => setPlayers(event.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter a number"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              ✋
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
