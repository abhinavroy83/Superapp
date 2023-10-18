import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./counter.css";
import increaseicon from "../../assets/increase.png";
import dereaseicon from "../../assets/decrese.png";

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
    // if (remainingTime === 0) {
    //   return <div className="timer">Too late...</div>;
    // }
    const hoursDisplay = Math.max(Math.floor(remainingTime / 3600), 0);
    const minutesDisplay = Math.max(Math.floor((remainingTime % 3600) / 60), 0);
    const secondsDisplay = Math.max(remainingTime % 60, 0); // Ensure secondsDisplay is non-negative

    return (
      <div className="timer">
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
    <div className="counter ">
      <div>
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
      </div>

      <div className="setHms ">
        <div className="settime">
          <div className="">
            <p className="hhmmssname">Hours</p>
            <div className="flex flex-col  items-center my-2">
              <img
                className="decrease"
                src={increaseicon}
                alt=""
                onClick={increasehour}
              />
              <p className="setHHMMSS">{hours} </p>
              <img
                className="decrease"
                src={dereaseicon}
                onClick={decreasehour}
                alt=""
              />
            </div>
          </div>
          <div className="">
            <p className="hhmmssname">Minute</p>
            <div className="flex flex-col  items-center my-2">
              <img
                className="decrease"
                src={increaseicon}
                alt=""
                onClick={increasemin}
              />
              <p className="setHHMMSS">{Min}</p>
              <img
                className="decrease"
                src={dereaseicon}
                onClick={decreasemin}
                alt=""
              />
            </div>
          </div>
          <div className="">
            <p className="hhmmssname">Second</p>
            <div className=" flex flex-col  items-center my-2">
              <img
                className="decrease"
                src={increaseicon}
                alt=""
                onClick={increasec}
              />
              <p className="setHHMMSS">{Sec}</p>
              <img
                className="decrease"
                src={dereaseicon}
                onClick={decreasesec}
                alt=""
              />
            </div>
          </div>
        </div>

        <div className=" text-center">
          <button className="handlestart" onClick={handlstart}>
            Start
          </button>
          {/* <br />
          <button onClick={reset}>rest</button> */}
        </div>
      </div>
    </div>
  );
}

export default Counter;
