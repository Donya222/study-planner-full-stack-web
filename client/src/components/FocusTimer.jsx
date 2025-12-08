import React, { useState, useEffect } from "react";
import "react-circular-progressbar/dist/styles.css"

export default function FocusTimer() {
  const [minutes, setMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const playSound = () => {
    const audio = new Audio("/timer-terminer-342934.mp3");
    audio.play();
  };

  useEffect(() => {
    let interval = null;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 0) {
            if (minutes === 0) {
              clearInterval(interval);
              setIsRunning(false);
              playSound();
              alert("⏳ Time to rest!");
              return 0;
            }
            setMinutes((m) => m - 1);
            return 59;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused, minutes]);

  const startTimer = () => {
    if (!isRunning) {
      setSecondsLeft(0);
      setIsRunning(true);
      setIsPaused(false);
    }
  };
  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setMinutes(25);
    setSecondsLeft(0);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}> Focus Timer</h2>
        <p style={styles.quote}>“Stay focused and never give up.”</p>

        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value))}
          style={styles.input}
          min="1"
        />

        <div style={styles.timer}>
          {minutes}:{secondsLeft < 10 ? "0" : ""}{secondsLeft}
        </div>

        <div style={styles.buttonGroup}>
          <button style={styles.startButton} onClick={startTimer}>
            ▶ Start
          </button>
          <button style={styles.resetButton} onClick={resetTimer}>
             Reset
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    //background: "linear-gradient( #2269dbff)",
    backgroundColor: "#5f80c8ff",
    fontFamily: "Segoe UI, sans-serif",
  },
  card: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "40px",
    textAlign: "center",
    color: "#fff",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    width: "300px",
  },
  title: {
    fontSize: "28px",
    marginBottom: "10px",
  },
  quote: {
    fontSize: "14px",
    fontStyle: "italic",
    marginBottom: "20px",
    color: "#dbeafe",
  },
  input: {
    padding: "10px",
    fontSize: "18px",
    width: "80px",
    borderRadius: "10px",
    border: "none",
    textAlign: "center",
    marginBottom: "20px",
    backgroundColor: "#dbeafe",
    color: "#1e3a8a",
  },
  timer: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  buttonGroup: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
  },
  startButton: {
    padding: "10px 20px",
    background: "linear-gradient(to right, #3b82f6, #2563eb)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  resetButton: {
    padding: "10px 20px",
    background: "linear-gradient(to right, #1e3a8a, #1e40af)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  

};





