import React, { useState, useEffect } from "react";
import "./App.css";

const Stopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Effect to handle timer logic
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

  // Log elapsed time for debugging
  useEffect(() => {
    console.log("Current Time:", elapsedTime);
  }, [elapsedTime]);

  // Start/Stop button handler
  const handleStartStop = () => {
    setIsActive((prevState) => !prevState);
  };

  // Reset stopwatch
  const handleReset = () => {
    setIsActive(false);
    setElapsedTime(0);
  };

  // Convert elapsed seconds into MM:SS format
  const getFormattedTime = (elapsedTime) => {
    const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, "0");
    const seconds = String(elapsedTime % 60).padStart(2, "0");
    return `Time: ${minutes}:${seconds}`;
  };

  return (
    <div className="App">
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="time" data-testid="time-display">
          {getFormattedTime(elapsedTime)}
        </div>
        <div className="buttons">
          <button onClick={handleStartStop} data-testid="start-stop-button">
            {isActive ? "Stop" : "Start"}
          </button>
          <button onClick={handleReset} data-testid="reset-button">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
