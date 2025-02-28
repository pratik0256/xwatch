import React, { useState, useEffect } from "react";
import "./App.css";

const Stopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer = null;

    if (isActive) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive]);

  const handleStartStop = () => {
    setIsActive((prevState) => !prevState);
  };

  const handleReset = () => {
    setIsActive(false);
    setElapsedTime(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="stopwatch-container">
      <h2>Stopwatch</h2>
      <p>Time: {formatTime(elapsedTime)}</p>
      <button onClick={handleStartStop}>
        {isActive ? "Stop" : "Start"}
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Stopwatch;
