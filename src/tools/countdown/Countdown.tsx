import { useState, useEffect, useRef, useCallback } from 'react';
import type { ToolProps } from '../types';

const Countdown: React.FC<ToolProps> = ({ showToast }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const totalSeconds =
    timeLeft !== null ? timeLeft : hours * 3600 + minutes * 60 + seconds;

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const start = useCallback(() => {
    if (timeLeft === null) {
      setTimeLeft(hours * 3600 + minutes * 60 + seconds);
    }
    setIsRunning(true);
  }, [hours, minutes, seconds, timeLeft]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(null);
  }, []);

  const addTime = (s: number) => {
    if (timeLeft === null) {
      const current = hours * 3600 + minutes * 60 + seconds;
      const newTotal = current + s;
      setHours(Math.floor(newTotal / 3600));
      setMinutes(Math.floor((newTotal % 3600) / 60));
      setSeconds(newTotal % 60);
    } else {
      setTimeLeft(Math.max(0, timeLeft + s));
    }
  };

  useEffect(() => {
    if (isRunning && timeLeft !== null && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      showToast?.('倒计时结束！');
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, showToast]);

  return (
    <div className="countdown">
      <div className="countdown-display">{formatTime(totalSeconds)}</div>

      {timeLeft === null ? (
        <div className="countdown-input">
          <div className="time-input-group">
            <label>时</label>
            <input
              type="number"
              min="0"
              max="99"
              value={hours}
              onChange={(e) => setHours(Math.max(0, Math.min(99, parseInt(e.target.value) || 0)))}
              disabled={isRunning}
            />
          </div>
          <span className="time-sep">:</span>
          <div className="time-input-group">
            <label>分</label>
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              disabled={isRunning}
            />
          </div>
          <span className="time-sep">:</span>
          <div className="time-input-group">
            <label>秒</label>
            <input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              disabled={isRunning}
            />
          </div>
        </div>
      ) : (
        <div className="quick-add-btns">
          <button onClick={() => addTime(-60)} disabled={totalSeconds <= 60 || !isRunning}>
            -1分钟
          </button>
          <button onClick={() => addTime(60)}> +1分钟 </button>
          <button onClick={() => addTime(300)}> +5分钟 </button>
        </div>
      )}

      <div className="countdown-controls">
        {!isRunning ? (
          <button className="start-btn" onClick={start}>
            {timeLeft === null ? '开始' : '继续'}
          </button>
        ) : (
          <button className="pause-btn" onClick={pause}>
            暂停
          </button>
        )}
        <button className="reset-btn" onClick={reset}>
          重置
        </button>
      </div>

      {isRunning && (
        <div className="countdown-progress">
          <div
            className="progress-bar"
            style={{
              width: `${Math.min(100, (totalSeconds / (hours * 3600 + minutes * 60 + seconds || 1)) * 100)}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Countdown;