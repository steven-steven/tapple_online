"use client";

import _ from 'lodash';
import React, { useState, useEffect, useContext } from 'react';
import useSound from 'use-sound';
import { StateContext } from '../state-provider';
import { useRouter } from 'next/navigation'

const useTimer = ( initialTime ) => {
  const [time, setTime] = useState(initialTime);
  const [timerId, setTimerId] = useState(null);
  const [timeDone, setTimeDone] = useState(false);
  const [playSound, setPlaySound] = useState(false);
  const [play, { stop }] = useSound('/sounds/final3.mp3');

  useEffect(() => {
    if(time === 0){
      setTimeDone(true);
      stopTimer();
    }
    if(time <= 3 && !playSound){
      setPlaySound(true);
      play();
    } else if(time > 3 && playSound){
      setPlaySound(false);
      stop();
    }
  }, [time]);

  const startTimer = () => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    setTimerId(intervalId);
  };

  const stopTimer = () => {
    if(timerId){
      clearInterval(timerId);
      setTimerId(null);
      if(playSound){
        setPlaySound(false);
        stop();
      }
    }
  };

  const resetTime = (clearTime) => {
    setTime(initialTime);
    if(clearTime){
      setTimeDone(false);
      stopTimer();
    } else if(timeDone || timerId == null){
      setTimeDone(false);
      startTimer();
    }
  };

  return [time, timeDone, resetTime];
};

export default function Game() {
  const { players } = useContext(StateContext)
  const [playerTurn, setPlayerTurn] = useState(0);
  const [playersEliminated, setPlayersEliminated] = useState([]);
  const [category, setCategory] = useState("Animals");
  const [selected, setSelected] = useState([]);
  const [timerStarted, setTimerStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [time, timeDone, resetTime] = useTimer(10);
  const router = useRouter()

  const nextPlayer = () => {
    let nextPlayer = (playerTurn + 1) % players;
    while(playersEliminated.includes(nextPlayer)){
      nextPlayer = (nextPlayer + 1) % players;
    }
    return nextPlayer;
  }


  useEffect(() => {
    if(players == '') router.push('/')
  }, [players, router]);

  useEffect(() => {
    if(timeDone == true){
      setPlayersEliminated([...playersEliminated, playerTurn]);
      if(playersEliminated.length == players - 1){
        setGameOver(true);
      }
      setPlayerTurn(nextPlayer());
    }
  }, [timeDone]);

  const categories = [
    "Animals",
    "Countries",
    "Foods",
    "Sports",
    "Weather",
    "Movies",
    "Colors",
    "Retail stores",
    "Emotions",
    "Professions",
    "Fruits",
    "Drinks",
    "Instruments",
    "Landmarks",
    "Something yellow",
    "Boy names",
    "Girl names",
    "Groceries",
    "Occupations",
    "Something cold",
    "At the beach",
    "Song titles"
  ]

  const shuffle = () => {
    setCategory(_.sample(categories));
  }

  const letterClicked = (letter) => {
    setSelected([...selected, letter]);
  }

  const newGame = () => {
    router.push('/');
  }

  const letterJsx = (letter) => {
    return (
      <div
        key={letter}
        className={`p-2 bg-[#676767] text-[#EDEDED] text-center text-xl ${selected.includes(letter) ? 'opacity-50' : ''}`}
        onClick={()=>letterClicked(letter)}
      >
        {letter}
      </div>
    )
  }

  const roundButtonJsx = (letter) => {
    return (
      <div
        className='rounded-full bg-[#CBCBCB] w-32 h-32 flex justify-center items-center text-6xl'
        onClick={()=>handClicked()}
      >
        { timerStarted ? time : "✋" }
      </div>
    )
  }

  const alert = () => {
    const action = gameOver ? newGame : resetTime
    const actionMessage = gameOver ? "New Game" : "Continue"
    const message = gameOver ? "Game Over!" : "Time is up!"

    return (
      <div className="bg-slate-100 border w-1/2 border-sky-500 p-4 rounded-lg">
        <p className="text-lg">{message}</p>
        <button
          className="bg-blue-200 hover:bg-blue-400 py-2 px-4 rounded mt-4 float-right"
          onClick={() => action()}
        >
          {actionMessage}
        </button>
      </div>
    )
  }

  const handClicked = () => {
    if(timerStarted) setPlayerTurn(nextPlayer())
    if(!timerStarted) setTimerStarted(true);
    resetTime();
  }

  const alphabets = Array.from({length: 26}, (_, index) => index + 65);

  return (
    <main className="flex flex-col min-h-screen items-center bg-[#E0F2FF] py-10 px-8 gap-3 text-black">
      <div className='text-lg border-b	border-sky-500 w-full pb-2'>
        Tapple_Online
        <button
          className="bg-blue-200 hover:bg-blue-400 p-2 rounded text-sm float-right"
          onClick={newGame}
        >
          New Game
        </button>
      </div>
      <div className='hand flex w-full justify-center justify-between'>
        <div className='w-20'></div>
        { timeDone ? alert() : roundButtonJsx() }
        <div className='w-20 text-right'>
          <ul>
            {Array.from({ length: players }).map((_, index) => (
              <li key={index} className={`${playersEliminated.includes(index) ? 'line-through' : ''} ${playerTurn == index ? 'font-bold' : ''}`}>Player {index + 1}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className='category'>
        <div className='bg-slate-50 border border-sky-500 flex justify-center p-3 gap-2 items-center'>
          <span className='text-[#1F93FF]'>Category: <span className='font-bold'>{category}</span></span>
          <button className='rounded-lg p-2 bg-blue-200' onClick={shuffle}>Shuffle</button>
        </div>
      </div>
      <div className='letters w-full'>
        <div className="grid grid-cols-6 gap-2">
          { alphabets.map((letter) => letterJsx(String.fromCharCode(letter))) }
        </div>
      </div>
    </main>
  )
}
