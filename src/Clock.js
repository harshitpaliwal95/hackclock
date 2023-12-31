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

  const rotateHand = (event, type) => {
    const rotateHandler = (e) => {
      e.preventDefault();

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (type === "min") {
        const radians = Math.atan2(mouseY - centerY, mouseX - centerX);
        let angle = radians * (180 / Math.PI);
        angle = angle < 0 ? angle + 360 : angle;

        let minute = Math.floor(angle / 6) % 60;
        minute = minute + 12;
        setTime((time) => ({
          ...time,
          minutes: minute > 60 ? minute - 60 : minute,
        }));
      } else {
        const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
        let seconds = Math.round((angle * 180) / Math.PI / 6);
        seconds = (seconds < 0 ? seconds + 60 : seconds) + 12;
        setTime((time) => ({
          ...time,
          seconds: seconds > 60 ? seconds - 60 : seconds,
        }));
      }
    };

    const cancelRotate = () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", rotateHandler);
      document.removeEventListener("mouseup", cancelRotate);
    };

    document.body.style.cursor = "grabbing";
    document.addEventListener("mousemove", rotateHandler);
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
              transform: `rotate(${time.seconds * 6}deg)`,
            }}
            onMouseDown={(e) =>
              document.addEventListener("mousemove", rotateHand(e, "sec"))
            }
          />
          <div
            className="gamut__timePicker__hrHand"
            style={{
              transform: `rotate(${time.minutes * 6}deg)`,
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
    </div>
  );
};
