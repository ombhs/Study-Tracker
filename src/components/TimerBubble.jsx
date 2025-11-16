import { useEffect, useRef, useState } from "react";

export default function TimerBubble({ onSave }) {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  // Format time
  const format = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  // Timer logic
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const start = () => {
    setSeconds(0);
    setRunning(true);
  };

  const stop = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const saveSession = () => {
    stop();
    const minutes = Math.floor(seconds / 60);
    if (minutes <= 0) return alert("Session too short!");

    onSave(minutes);
    setSeconds(0);
  };

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      
      {/* Timer Bubble */}
      <div className="h-48 w-48 rounded-full bg-stone-900 text-white flex items-center justify-center text-3xl font-semibold tracking-wide shadow-lg">
        {format(seconds)}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {!running && (
          <button
            onClick={start}
            className="px-4 py-2 rounded-md bg-stone-900 text-white text-sm hover:bg-stone-800"
          >
            Start
          </button>
        )}

        {running && (
          <button
            onClick={stop}
            className="px-4 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-500"
          >
            Stop
          </button>
        )}

        {!running && seconds > 0 && (
          <button
            onClick={saveSession}
            className="px-4 py-2 rounded-md bg-green-600 text-white text-sm hover:bg-green-500"
          >
            Save
          </button>
        )}
      </div>

    </div>
  );
}
