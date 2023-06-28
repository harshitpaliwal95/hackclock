import React, { useEffect, useState } from "react";

export const Clock = () => {
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
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // 👇 Get input value
      setUpdateInput(!updateInput);
      setWatchStatus("blur");
    }
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

  // const handleMinuteDrag = (e) => {
  //   const rect = e.target.getBoundingClientRect();
  //   const radius = rect.width / 2;
  //   const centerX = rect.left + radius;
  //   const centerY = rect.top + radius;

  //   const radians = Math.atan2(e.clientY - centerY, e.clientX - centerX);
  //   let angle = radians * (180 / Math.PI);
  //   angle = angle < 0 ? angle + 360 : angle;

  //   const minute = Math.floor(angle / 6) % 60;
  //   setTime((time) => ({ ...time, minutes: minute }));
  // };
  const rotateHand = (event, type) => {
    const elem = event.target;
    elem.style.cursor = "grabbing";
    let rotating = true;
    const clock = document.querySelector(".gamut__timePicker__clock");
    const radius = 252 / 2;

    const rotateHandler = (e) => {
      const rect = e.target.getBoundingClientRect();
      const radius = rect.width / 2;
      const centerX = rect.left + radius;
      const centerY = rect.top + radius;
      if (type === "min") {
        const radians = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        let angle = radians * (180 / Math.PI);
        angle = angle < 0 ? angle + 360 : angle;

        const minute = Math.floor(angle / 6) % 60;
        setTime((time) => ({ ...time, minutes: minute }));
      } else {
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const seconds = Math.round((angle * 180) / Math.PI / 6);
        setTime((time) => ({
          ...time,
          seconds: seconds < 0 ? seconds + 60 : seconds,
        }));
      }
    };

    document.addEventListener("mousemove", rotateHandler);
    const cancelRotate = (event) => {
      elem.style.cursor = "grab";
      rotating = !rotating;
      document.removeEventListener("mousemove", rotateHandler);
      document.removeEventListener("mouseup", cancelRotate);
    };
    document.addEventListener("mouseup", cancelRotate);
  };

  return (
    <div className="mainbox">
      <div>
        <div className="gamut__timePicker__clockWrapper">
          <div className="gamut__timePicker__clock"></div>
          <div className="gamut__timePicker__labels">
            <span
              className="gamut__timePicker__labels--hourLabel"
              style={{ left: "100%", top: "50%" }}
            >
              3
            </span>
            <span
              className="gamut__timePicker__labels--hourLabel"
              style={{ left: "93.3013%", top: "75%" }}
            >
              4
            </span>
            <span
              className="gamut__timePicker__labels--hourLabel"
              style={{ left: "75%", top: "93.3013%" }}
            >
              5
            </span>
            <span
              className="gamut__timePicker__labels--hourLabel"
              style={{ left: "50%", top: "100%" }}
            >
              6
            </span>
            <span
              className="gamut__timePicker__labels--hourLabel"
              style={{ left: "25%", top: "93.3013%" }}
            >
              7
            </span>
            <span
              className="gamut__timePicker__labels--hourLabel"
              style={{ left: "6.69873%", top: "75%" }}
            >
              8
            </span>
            <span
              className="gamut__timePicker__labels--hourLabel"
              style={{ left: "0%", top: "50%" }}
            >
              9
            </span>
            <span
              className="gamut__timePicker__labels--hourLabel"
              style={{ left: "6.69873%", top: "25%" }}
            >
              10
            </span>
            <span
              className="gamut__timePicker__labels--hourLabel"
              style={{ left: "25%", top: "6.69873%" }}
            >
              11
            </span>
            <span
              className="gamut__timePicker__labels--hourLabel"
              style={{ left: "50%", top: "0%" }}
            >
              12
            </span>
            <span
              className="gamut__timePicker__labels--hourLabel"
              style={{ left: "75%", top: "6.69873%" }}
            >
              1
            </span>
            <span
              className="gamut__timePicker__labels--hourLabel"
              style={{ left: "93.3013%", top: "25%" }}
            >
              2
            </span>
          </div>
          <div
            className="gamut__timePicker__minHand"
            style={{
              transform: `rotateZ(${time.seconds * 6}deg)`,
            }}
            onMouseDown={(e) =>
              document.addEventListener("mousemove", rotateHand(e, "sec"))
            }
          />
          <div
            className="gamut__timePicker__hrHand"
            style={{
              transform: `rotateZ(${time.minutes * 6}deg)`,
            }}
            onMouseDown={(e) =>
              document.addEventListener("mousemove", rotateHand(e, "min"))
            }
          />
        </div>
        <div className="gamut__timePicker__time">
          <div className="time-input">
            <div className="min-input">
              <label for="min">Minutes</label>
              <input
                onChange={(e) =>
                  setTime((time) => ({
                    ...time,
                    minutes: Number(e.target.value),
                  }))
                }
                onKeyDown={handleKeyDown}
                type="text"
                name="min"
                onFocus={blurHandler}
                onBlur={blurHandler}
                placeholder={time.minutes}
                key={updateInput}
              ></input>
            </div>
            <div className="hr-input">
              <label for="hr">Seconds</label>
              <input
                onChange={(e) =>
                  setTime((time) => ({
                    ...time,
                    seconds: Number(e.target.value),
                  }))
                }
                onKeyDown={handleKeyDown}
                onFocus={blurHandler}
                onBlur={blurHandler}
                key={updateInput}
                placeholder={time.seconds}
                type="text"
                name="hr"
              ></input>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="clock">
        <div
          className="min_hand gamut__timePicker__clock"
          style={{
            transform: `rotateZ(${time.minutes * 6}deg)`,
          }}
          // onMouseMove={handleMinuteDrag}
          // onMouseUp={() =>
          //   document.removeEventListener("mousemove", handleMinuteDrag)
          // }
          onMouseDown={(e) =>
            document.addEventListener("mousemove", rotateHand(e))
          }
        />
        <div
          className="sec_hand"
          style={{
            transform: `rotateZ(${time.seconds * 6}deg)`,
          }}
          // onMouseMove={handleSecondDrag}
          // onMouseUp={() =>
          //   document.removeEventListener("mousemove", handleSecondDrag)
          // }
          // onMouseDown={() =>
          //   document.addEventListener("mousemove", handleSecondDrag)
          // }
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
                setTime((time) => ({
                  ...time,
                  minutes: Number(e.target.value),
                }))
              }
              onKeyDown={handleKeyDown}
              type="text"
              name="min"
              onFocus={blurHandler}
              onBlur={blurHandler}
              placeholder={time.minutes}
              key={updateInput}
            ></input>
          </div>
          <div className="hr-input">
            <label for="hr">Seconds</label>
            <input
              onChange={(e) =>
                setTime((time) => ({
                  ...time,
                  seconds: Number(e.target.value),
                }))
              }
              onKeyDown={handleKeyDown}
              onFocus={blurHandler}
              onBlur={blurHandler}
              key={updateInput}
              placeholder={time.seconds}
              type="text"
              name="hr"
            ></input>
          </div>
        </div>
      </div> */}
    </div>
  );
};
