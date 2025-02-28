import React, { useState, useEffect } from "react";
import "./App.css";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Effect to handle the timer logic
  useEffect(() => {
    let timer = null;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    // Cleanup: Clear the interval when the component unmounts or `isRunning` changes
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  // Toggle start/stop functionality
  const toggleStartStop = () => {
    setIsRunning((prevState) => !prevState);
  };

  // Reset the stopwatch
  const resetStopwatch = () => {
    setIsRunning(false);
    setTime(0);
  };

  // Format time into MM:SS format
  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="App">
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="time" data-testid="time-display">
          Time: {formatTime(time)}
        </div>
        <div className="buttons">
          <button onClick={toggleStartStop} data-testid="start-stop-button">
            {isRunning ? "Stop" : "Start"}
          </button>
          <button onClick={resetStopwatch} data-testid="reset-button">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;