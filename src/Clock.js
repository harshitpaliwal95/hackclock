import React, { useEffect, useState } from "react";

export const Clock = () => {
  //   const [currentTime, setCurrentTime] = useState(new Date());

  //   useEffect(() => {
  //     const timer = setInterval(() => {
  //       setCurrentTime(new Date());
  //     }, 1000);

  //     return () => clearInterval(timer);
  //   }, []);

  //   const [time, setTime] = useState({
  //     minutes: currentTime.getMinutes(),
  //     seconds: currentTime.getSeconds(),
  //   });
  const [time, setTime] = useState({
    minutes: 0,
    seconds: 0,
  });

  const [watchStatus, setWatchStatus] = useState("blur");
  const [updateInput, setUpdateInput] = useState(false);

  const blurHandler = (e) => {
    setWatchStatus(e.type);
    if (e.type === "blur") setUpdateInput(!updateInput);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (watchStatus === "blur") {
        setTime((prevTime) => {
          const seconds = (prevTime.seconds + 1) % 60;
          const minutes =
            seconds === 0 ? prevTime.minutes + 1 : prevTime.minutes;
          return { minutes, seconds };
        });
      }
    }, 1000);

    if (watchStatus === "focus") {
      return () => clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [watchStatus]);

  const handleSecondDrag = (e) => {
    const rect = e.target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clickX = e.clientX - centerX;
    const clickY = e.clientY - centerY;

    const angle = Math.atan2(clickY, clickX);
    const seconds = Math.round((angle * 180) / Math.PI / 6);
    setTime((time) => ({
      ...time,
      seconds: seconds < 0 ? seconds + 60 : seconds,
    }));
  };

  const handleMinuteDrag = (e) => {
    const rect = e.target.getBoundingClientRect();
    const radius = rect.width / 2;
    const centerX = rect.left + radius;
    const centerY = rect.top + radius;

    const radians = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    let angle = radians * (180 / Math.PI);
    angle = angle < 0 ? angle + 360 : angle;

    const minute = Math.floor(angle / 6) % 60;
    setTime((time) => ({ ...time, minutes: minute }));
  };

  return (
    <>
      <div className="clock">
        <div
          className="min_hand"
          style={{
            transform: `rotateZ(${time.minutes * 6}deg)`,
          }}
          onMouseMove={handleMinuteDrag}
          onMouseUp={() =>
            document.removeEventListener("mousemove", handleMinuteDrag)
          }
          onMouseDown={() =>
            document.addEventListener("mousemove", handleMinuteDrag)
          }
        />
        <div
          className="sec_hand"
          style={{
            transform: `rotateZ(${time.seconds * 6}deg)`,
          }}
          onMouseMove={handleSecondDrag}
          onMouseUp={() =>
            document.removeEventListener("mousemove", handleSecondDrag)
          }
          onMouseDown={() =>
            document.addEventListener("mousemove", handleSecondDrag)
          }
        />
        <span className="twelve">12</span>
        <span className="one">1</span>
        <span className="two">2</span>
        <span className="three">3</span>
        <span className="four">4</span>
        <span className="five">5</span>
        <span className="six">6</span>
        <span className="seven">7</span>
        <span className="eight">8</span>
        <span className="nine">9</span>
        <span className="ten">10</span>
        <span className="eleven">11</span>
        <div className="time-input">
          <div className="min-input">
            <label for="min">Minutes</label>
            <input
              onChange={(e) =>
                setTime((time) => ({ ...time, minutes: e.target.value }))
              }
              type="text"
              name="min"
              onFocus={blurHandler}
              onBlur={blurHandler}
              placeholder={time.minutes}
              key={updateInput}
              //   value={time.minutes}
            ></input>
          </div>
          <div className="hr-input">
            <label for="hr">Seconds</label>
            <input
              onChange={(e) =>
                setTime((time) => ({ ...time, seconds: e.target.value }))
              }
              onFocus={blurHandler}
              onBlur={blurHandler}
              key={updateInput}
              placeholder={time.seconds}
              type="text"
              name="hr"
              //   value={time.seconds}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
};
