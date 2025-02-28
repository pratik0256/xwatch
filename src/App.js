import React, { useState, useEffect } from "react";
import "./App.css";

const Stopwatch = () => {

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer = null;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  const toggleStartStop = () => {
    setIsRunning((prevState) => !prevState);
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(1, "0");
    const seconds = String(time % 60).padStart(1, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="App">
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="time">Time: {formatTime(time)}</div>
        <div className="buttons">
          <button onClick={toggleStartStop}>
            {isRunning ? "Stop" : "Start"}
          </button>
          <button onClick={resetStopwatch}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;