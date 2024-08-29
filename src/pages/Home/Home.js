import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

import Button from "~/components/Button";
import styles from "./Home.module.scss";
import dataWords from "~/assets/words/words.json";
import { dataFuction } from "./dataFuction";

const cx = classNames.bind(styles);

function Home() {
  const [currentFunction, setCurrentFunction] = useState(dataFuction[0]);
  const [time, setTime] = useState(dataFuction[0].time[0]);
  const [selected, setSelected] = useState({
    type: null,
    mode: currentFunction.mode,
    time: time,
    countWord: dataFuction[1].countWord[0],
  });
  const [words, setWords] = useState([]);
  const [lengthwords, setLengthWords] = useState(30);
  const [input, setInput] = useState("");
  const inputRef = useRef();
  const [pos, setPos] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [result, setResult] = useState(null);
  const [wordCorrect, setWordCorrect] = useState(0);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    fetchWords(dataWords.words, lengthwords);
  }, [lengthwords]);

  useEffect(() => {
    if (currentFunction.time) {
      if (isActive && time > 0) {
        const interval = setInterval(() => setTime((prev) => prev - 1), 1000);
        return () => clearInterval(interval);
      } else if (time === 0) {
        const wpm = (wordCorrect / (selected.time / 60)).toFixed(2);
        setResult(wpm);

        setIsActive(false);
      }
    } else if (currentFunction.countWord) {
      console.log(time);
      
      if (isActive) {
        const interval = setInterval(() => setTime((prev) => prev + 1), 1000);
        return () => clearInterval(interval);
      } else if (pos === words.length) {
        const wpm = (wordCorrect / (time / 60)).toFixed(2);
        setResult(wpm);
        setIsActive(false);
      }
    }
  }, [isActive, time, pos]);

  useEffect(() => {
    if (input.includes(" ")) {
      setWords((prevWords) => {
        const updateWords = prevWords.map((word, index) =>
          index === pos
            ? {
                ...word,
                class: word.text === input.trim() ? "correct" : "incorrect",
              }
            : word
        );
        if (updateWords[pos].class === "correct") {
          setWordCorrect((prev) => prev + 1);
        }
        return updateWords;
      });

      setInput("");
      setPos((prev) => prev + 1);
    } else {
      setWords((prevWords) =>
        prevWords.map((word, index) =>
          index === pos
            ? {
                ...word,
                class: word.text.includes(input.trim())
                  ? "highlight"
                  : "highlighIncorrect",
              }
            : word
        )
      );
    }
  }, [input, pos]);

  useEffect(() => {
    setWords((prevWords) =>
      prevWords.map((word, index) =>
        index === 0
          ? {
              ...word,
              class: "highlight",
            }
          : word
      )
    );
  }, [currentFunction, selected.time, selected.countWord]);

  const fetchWords = (data, num) => {
    const listWord = Array.from({ length: num }, () => {
      const randomWord = data[Math.floor(Math.random() * data.length)].text;
      return randomWord.split(" ").map((word) => ({
        class: "",
        text: word.trim(),
      }));
    }).flat();
    setWords(listWord);
  };

  const handleChangeInput = (e) => {
    const value = e.target.value;
    if (!value.startsWith(" ")) {
      setInput(value);
      setIsActive(true);
    }
  };

  const handleReload = () => {
    fetchWords(dataWords.words, lengthwords);
    setInput("");
    setPos(0);
    setResult(null);
    setWordCorrect(0);
    setIsActive(false);
    setTime(selected.time);
    inputRef.current.focus();
  };

  const onClickMode = (item) => {
    setResult(null);
    setInput("");
    const newFunction = dataFuction.find((func) => func.mode === item.mode);
    setCurrentFunction(newFunction);
    setSelected((prev) => ({
      ...prev,
      mode: item.mode,
      type: null,
    }));
    if (item.time) {
      setTime(selected.time);
      setLengthWords(30);
    } else if (item.countWord) {
      setTime(0);
      setLengthWords(selected.countWord);
    }
  };

  const onClickTime = (item) => {
    handleReload();
    setSelected((prev) => ({ ...prev, time: item }));
    setTime(item);
  };

  const onClickCountWord = (item) => {
    handleReload();
    setSelected((prev) => ({ ...prev, countWord: item }));
    setLengthWords(item);
  };

  const onClickChange = (item) => {
    // handleReload();
    setSelected((prev) => ({
      ...prev,
      type: prev.type === item.data ? null : item.data,
    }));
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("function-bar")}>
        <div className={cx("function-bar-item", "type")}>
          {currentFunction.type.map((item, index) => (
            <Button
              key={index}
              typeText
              leftIcon={<FontAwesomeIcon icon={item.icon} />}
              className={cx({ selected: item.data === selected.type })}
              onClick={() => onClickChange(item)}
            >
              {item.data}
            </Button>
          ))}
        </div>
        <div className={cx("function-bar-item", "mode")}>
          {dataFuction.map((item, index) => (
            <Button
              typeText
              key={index}
              leftIcon={<FontAwesomeIcon icon={item.icon} />}
              className={cx({ selected: item.mode === selected.mode })}
              onClick={() => {
                onClickMode(item);
              }}
            >
              {item.mode}
            </Button>
          ))}
        </div>
        <div className={cx("function-bar-item", "time")}>
          {currentFunction.time &&
            currentFunction.time.map((item, index) => (
              <Button
                key={index}
                typeText
                className={cx({ selected: item === selected.time })}
                onClick={() => onClickTime(item)}
              >
                {item}
              </Button>
            ))}
          {currentFunction.countWord &&
            currentFunction.countWord.map((item, index) => (
              <Button
                key={index}
                typeText
                className={cx({ selected: item === selected.countWord })}
                onClick={() => onClickCountWord(item)}
              >
                {item}
              </Button>
            ))}
        </div>
      </div>

      <div className={cx("content")}>
        {(result && (
          <div className={cx("result-wraper")}>
            <div>
              <div className={cx("title-wpm")}>wpm</div>
              <p>{result}</p>
            </div>
            <div>
              <div>độ chính xác: 100%</div>
              <p>từ đúng: {wordCorrect}</p>
              <p>từ sai: {pos - wordCorrect}</p>
            </div>
            <div>
              <div>thời gian: {selected.time}</div>
            </div>
            <Button
              leftIcon={
                <FontAwesomeIcon
                  icon={faAngleRight}
                  onClick={() => {
                    handleReload();
                  }}
                />
              }
            ></Button>
          </div>
        )) || (
          <>
            <div className={cx("timer")}>
              <span>{currentFunction.time && time}</span>
              <span>
                {currentFunction.countWord && pos + "/" + words.length}
              </span>
            </div>
            <div className={cx("words-wrapper")}>
              {words.map((item, index) => (
                <div key={index} className={cx("word", item.class)}>
                  {item.text}
                </div>
              ))}
            </div>
          </>
        )}

        <div className={cx("input-wrapper", result && "hidden")}>
          <input
            ref={inputRef}
            className={cx("input")}
            type="text"
            value={input}
            onChange={handleChangeInput}
          />
          <Button
            className={cx("btn-reload")}
            leftIcon={<FontAwesomeIcon icon={faRotateRight} />}
            typeIcon
            onClick={handleReload}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
