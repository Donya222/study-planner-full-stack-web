import React, { useState, useEffect } from "react";

export default function FocusTimer() {
  const [minutes, setMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 0) {
            if (minutes === 0) {
              clearInterval(interval);
              setIsRunning(false);
              alert("🎉 Time's up!");
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
  }, [isRunning, minutes]);

  const startTimer = () => {
    if (!isRunning) {
      setSecondsLeft(0);
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(25);
    setSecondsLeft(0);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔵 Focus Timer</h2>

      <input
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(parseInt(e.target.value))}
        style={styles.input}
      />

      <div style={styles.timer}>
        {minutes}:{secondsLeft < 10 ? "0" : ""}{secondsLeft}
      </div>

      <button style={styles.startButton} onClick={startTimer}>
        Start
      </button>

      <button style={styles.resetButton} onClick={resetTimer}>
        Reset
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    color: "white",
  },
  title: {
    color: "#3b82f6",
    fontSize: "30px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    fontSize: "18px",
    width: "80px",
    borderRadius: "5px",
    border: "2px solid #3b82f6",
    color: "#3b82f6",
    textAlign: "center",
    marginBottom: "20px",
  },
  timer: {
    fontSize: "60px",
    color: "#1d4ed8",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  startButton: {
    padding: "10px 20px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "5px",
    marginRight: "10px",
    cursor: "pointer",
  },
  resetButton: {
    padding: "10px 20px",
    backgroundColor: "#1e40af",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
