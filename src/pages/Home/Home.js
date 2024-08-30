import classNames from "classnames/bind";

import Button from "~/components/Button";
import styles from "./Home.module.scss";
import dataWords from "~/assets/words/words.json";
import { dataFuction } from "./dataFuction";
import { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FunctionBar from "~/components/FuctionBar/FunctionBar";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Home() {
  const [currentFunction, setCurrentFunction] = useState(dataFuction[0]);
  const [words, setWords] = useState([]);
  const [pos, setPos] = useState(0);
  console.log("🚀 ~ Home ~ pos:", pos)
  const [wordCorrect, setWordCorrect] = useState(0);
  console.log("🚀 ~ Home ~ wordCorrect:", wordCorrect)
  const [valueInput, setValueInput] = useState("");
  const [timer, setTimer] = useState(dataFuction[0].time[0]);
  const [time, setTime] = useState(timer);
  const [lengthWord, setLengthWord] = useState(dataFuction[1].lengthWord[0]);
  const [isRun, setIsRun] = useState(false);
  const inputRef = useRef();
  let timerId = useRef();
  const [result, setResult] = useState(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    fetchWords(dataWords.words, currentFunction.lengthWord ? lengthWord : 200);
  }, [lengthWord]);

  useEffect(() => {
    if (valueInput.includes(" ")) {
      setWords((prevWords) => {
        const updateWords = prevWords.map((word, index) =>
          index === pos
            ? {
                ...word,
                class:
                  word.text === valueInput.trim() ? "correct" : "incorrect",
              }
            : word
        );
        if (updateWords[pos].class === "correct") {
          setWordCorrect((prev) => prev + 1);
        }

        return updateWords;
      });
      setValueInput("");
      setPos((prev) => prev + 1);
    } else {
      setWords((prevWords) =>
        prevWords.map((word, index) =>
          index === pos
            ? {
                ...word,
                class: word.text.includes(valueInput.trim())
                  ? "highlight"
                  : "highlightIncorrect",
              }
            : word
        )
      );
    }
  }, [valueInput, pos]);

  useEffect(() => {
    fetchWords(dataWords.words, currentFunction.lengthWord ? lengthWord : 200);
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
  }, [currentFunction, timer, lengthWord]);

  useEffect(() => {
    if (isRun) {
      if (currentFunction.time) {
        if (time > 0) {
          timerId.current = setTimeout(() => setTime((prev) => prev - 1), 1000);
        } else if (time === 0) {
          clearInterval(timerId.current);
          const wpm = (wordCorrect / (timer / 60)).toFixed(2);
          setResult(wpm);
          setIsRun(false);
        }
      } else if (currentFunction.lengthWord) {
        if (pos < lengthWord) {
          timerId.current = setTimeout(() => setTime((prev) => prev + 1), 1000);
        } else if (pos === lengthWord) {
          clearInterval(timerId.current);
          const wpm = (wordCorrect / (time / 60)).toFixed(2);
          setResult(wpm);
          setIsRun(false);
        }
      }
    }
  }, [isRun, time]);

  useEffect(() => {
    setTime(timer);
  }, [timer]);

  const fetchWords = (data, num) => {
    let listWord = Array.from({ length: num }, () => {
      const randomWord = data[Math.floor(Math.random() * data.length)].text;
      return randomWord.split(" ").map((word) => ({
        class: "",
        text: word.trim(),
      }));
    }).flat();

    listWord = listWord.slice(0, num);

    setWords(listWord);
  };

  const handelInputChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith(" ")) {
      setValueInput(value);
      setIsRun(true);
    }
  };

  const handleReload = () => {
    if (currentFunction.time) {
      setTime(timer);
    } else if (currentFunction.lengthWord) {
      setTime(0);
    }
    fetchWords(dataWords.words, currentFunction.lengthWord ? lengthWord : 200);
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
    setValueInput("");
    setPos(0);
    inputRef.current.focus();
    setResult(0);
    setIsRun(false);
    setWordCorrect(0);
  };

  const handleLevelChange = (item) => {};

  const handleModeChange = useCallback((currentData) => {
    handleReload();
    setCurrentFunction(
      dataFuction.find((data) => data.mode === currentData.mode)
    );
    if (currentData.time) {
      setTime(timer);
    } else if (currentData.lengthWord) {
      setTime(0);
    }
  });

  const handleTypeChange = useCallback((item) => {
    handleReload();
    if (currentFunction.time) {
      setTimer(item);
    } else if (currentFunction.lengthWord) {
      setLengthWord(item);
    }
  });

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header-bar")}>
        <FunctionBar
          data={currentFunction}
          time={timer}
          lengthWord={lengthWord}
          onModeChange={handleModeChange}
          onTypeChange={handleTypeChange}
          onLevelChange={handleLevelChange}
        />
      </div>
      {(result && (
        <div className={cx("result-wrapper")}>
          <div className={cx("main-result")}>
            <div className={cx("result")}>
              <p>Wpm</p> {result}
            </div>
            <div className={cx("ratio-correct")}>
              <p>Tỷ lệ chính xác: </p> {(wordCorrect / pos) * 100 || 0}%
            </div>
          </div>
          <div className={cx("other-result")}>
            <div className={cx("words-correct")}>
              <p>Số từ đúng: </p> {wordCorrect || 0}
            </div>
            <div className={cx("words-incorrect")}>
              <p>Số từ sai: </p> {pos - wordCorrect || 0}
            </div>
            <div className={cx("time-enter")}>
              <p>Thời gian: </p>
              {currentFunction.lengthWord ? time : timer}
            </div>
            <div className={cx("btn-wrapper")}>
              <Button
                typeIcon
                className={"btn-restart"}
                leftIcon={
                  <FontAwesomeIcon icon={faRotateLeft} onClick={handleReload} />
                }
              ></Button>
            </div>
          </div>
        </div>
      )) || (
        <>
          <div className={cx("timer")}>
            <span>
              {currentFunction.time ? time : pos + " / " + lengthWord}
            </span>
          </div>
          <div className={cx("content-wrapper")}>
            <div className={cx("words")}>
              {words.map((item, index) => (
                <span key={index} className={cx("word", item.class)}>
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
      <div className={cx("input-wrapper", { hiddenInput: result })}>
        <input
          ref={inputRef}
          value={valueInput}
          onChange={handelInputChange}
          type="text"
          className={cx("input")}
        />
        <Button
          typeIcon
          className={"btn-reload"}
          leftIcon={<FontAwesomeIcon icon={faRotateLeft} />}
          onClick={handleReload}
        ></Button>
      </div>
    </div>
  );
}

export default Home;
