import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function Counter() {
  const [hours, sethours] = useState(0);
  const [Min, setMin] = useState(0);
  const [Sec, setSec] = useState(0);
  const [isPlaying, setisPlaying] = useState(false);

  const totalSeconds = hours * 3600 + Min * 60 + Sec;

  const handlstart = () => {
    setisPlaying(true);
  };

  const increasehour = () => {
    if (hours < 99) {
      sethours(hours + 1);
    }
  };

  const decreasehour = () => {
    if (hours > 0) {
      sethours(hours - 1);
    }
  };
  const increasemin = () => {
    if (Min < 60) {
      setMin(Min + 1);
    }
  };
  const decreasemin = () => {
    if (Min > 0) {
      setMin(Min - 1);
    }
  };
  const increasec = () => {
    if (Sec < 100) {
      setSec(Sec + 1);
    }
  };
  const decreasesec = () => {
    if (Sec > 0) {
      setSec(Sec - 1);
    } else {
      setSec(59);
    }
  };

  const renderTime = ({ remainingTime }) => {
    const hoursDisplay = Math.max(Math.floor(remainingTime / 3600), 0);
    const minutesDisplay = Math.max(Math.floor((remainingTime % 3600) / 60), 0);
    const secondsDisplay = Math.max(remainingTime % 60, 0); // Ensure secondsDisplay is non-negative

    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{`${hoursDisplay
          .toString()
          .padStart(2, "0")}:${minutesDisplay
          .toString()
          .padStart(2, "0")}:${secondsDisplay
          .toString()
          .padStart(2, "0")}`}</div>
      </div>
    );
  };
  const reset = () => {
    sethours(0);
    setMin(0);
    setSec(0);
    setisPlaying(false);
  };
  useEffect(() => {
    if (totalSeconds === 0) {
      setisPlaying(false);
      sethours(0);
      setMin(0);
      setSec(0);
      //   setTimeout(() => {}, 1000); // Reset after 2 seconds (adjust the delay as needed)
    }
  }, [totalSeconds]);
  return (
    <div className="flex">
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={totalSeconds}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        onComplete={() => {
          setisPlaying(false);
          return [false, 0]; // Do not repeat the timer
        }}
      >
        {renderTime}
      </CountdownCircleTimer>

      <div className="container">
        <button onClick={increasehour}>+</button>
        <p>H:{hours} </p>
        <button onClick={decreasehour}>-</button>
      </div>
      <div className="container">
        <button onClick={increasemin}>+</button>
        <p>M:{Min}</p>
        <button onClick={decreasemin}>-</button>
      </div>
      <div className="container">
        <button onClick={increasec}>+</button>
        <p>{Sec}</p>
        <button onClick={decreasesec}>-</button>
      </div>
      <button onClick={handlstart}>Start</button>
      <br />
      <button onClick={reset}>rest</button>
    </div>
  );
}

export default Counter;
