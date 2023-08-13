"use client";

import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';

const useTimer = ( initialTime ) => {
  const [time, setTime] = useState(initialTime);
  const [timerId, setTimerId] = useState(null);
  const [timeDone, setTimeDone] = useState(false);
  const [playSound, setPlaySound] = useState(false);
  const [play, { stop }] = useSound('/sounds/final3.mp3');

  useEffect(() => {
    if(time === 0) stopTimer();
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
    setTimeDone(false);
  };

  const stopTimer = () => {
    if(timerId){
      clearInterval(timerId);
      setTimerId(null);
      setTimeDone(true);
      if(playSound){
        setPlaySound(false);
        stop();
      }
    }
  };

  const resetTime = () => {
    setTime(initialTime);
    if(timeDone || timerId == null) startTimer();
  };

  return [time, timeDone, resetTime];
};

export default function Home() {
  const [category, setCategory] = useState("Animals");
  const [selected, setSelected] = useState([]);
  const [timerStarted, setTimerStarted] = useState(false);
  const [time, timeDone, resetTime] = useTimer(10);

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
    resetTime();
    setSelected([]);
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

  const alert = (message) => {
    return (
      <div className="bg-slate-100 border w-1/2 border-sky-500 p-4 rounded-lg">
        <p className="text-lg">{message}</p>
        <button
          className="bg-blue-200 hover:bg-blue-400 py-2 px-4 rounded mt-4 float-right"
          onClick={resetTime}
        >
          Continue
        </button>
      </div>
    )
  }

  const handClicked = () => {
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
      <div className='hand flex w-full justify-center'>
        { timeDone ? alert("Time is up!") : roundButtonJsx() }

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
