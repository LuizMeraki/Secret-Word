import { useState, useEffect, useRef } from "react";

import styles from "./index.module.css";

// Sound Effects
import HitSoundEffect from "../../assets/sounds/hit.mp3";


const Game = ({
  setRenderComponent,
  userScoreValue,
  setUserScoreValue,
  currentCategoryValue,
  splitedCurrentWordValue
}) => {

  // Data
  const renderEndGame = setRenderComponent;

  const letterInputElementRef = useRef();
  const audioElementRef = useRef();

  const currentCategory = currentCategoryValue;
  const splitedCurrentWord = splitedCurrentWordValue;

  const [emptyList, setEmptyList] = useState([]);
  const [userLetter, setUserLetter] = useState("");
  const [wrongUserLetters, setWrongUserLetters] = useState([])

  const score = userScoreValue;
  const setScore = setUserScoreValue;
  const [userAttempts, setUserAttempts] = useState(3);


  // Functions
  const addUserLetterAtList = () => {
    const emptyListIncludesLetter = !emptyList.includes(userLetter);
    const isLetterEmpty = userLetter !== ""

    if (emptyListIncludesLetter && isLetterEmpty) {
      splitedCurrentWord.forEach((letter) => {
        letter === userLetter &&
          setEmptyList((prevEmpty) => [...prevEmpty, userLetter]);
      })
    }
  }


  const checkUserAttempts = () => {
    const isThereAttempts = userAttempts === 0;

    isThereAttempts && renderEndGame("EndGame")
  }


  const playHitSoundEffect = () => {
    const audioElement = audioElementRef.current;

    audioElement.volume = 0.08;
    audioElement.play();
  }


  const userLetterExists = () => {
    const wordIncludesLetter = !splitedCurrentWord.includes(userLetter);
    const wrongLettersIncludesLetter = !wrongUserLetters.includes(userLetter);
    const isLetterEmpty = userLetter !== "";

    if (wordIncludesLetter && wrongLettersIncludesLetter && isLetterEmpty) {
      setUserAttempts(prevUserAttempts => prevUserAttempts - 1);
      setWrongUserLetters(prevWrongLetters => [...prevWrongLetters, userLetter]);
    }
  }


  const handleUserLetter = () => {
    const letterInputElement = letterInputElementRef.current;
    const inputValue = letterInputElement.value.toUpperCase();

    if (inputValue) {
      setUserLetter(inputValue);
      letterInputElement.value = "";
    } else {
      alert("Digite ao menos uma letra.")
    }

    // Keep input in focus
    letterInputElement.focus();
  }


  const isAnswerCorrect = () => {
    const isEqual = splitedCurrentWord.length === emptyList.length;

    if (isEqual) {
      setScore((prevScore) => prevScore + 100);
      setUserAttempts(3);
      setEmptyList([]);
      setWrongUserLetters([]);
      playHitSoundEffect();
    }
  }


  useEffect(() => {
    addUserLetterAtList();
    userLetterExists();
  }, [userLetter]);


  useEffect(() => {
    isAnswerCorrect();
  }, [emptyList]);


  useEffect(() => {
    checkUserAttempts();
  }, [wrongUserLetters]);


  return (
    <div className={styles.main_container}>
      <div className={styles.score_container}>
        <p>Pontuação: <span>{score}</span></p>
      </div>
      <div className={styles.title_container}>
        <h2>Advinhe a palavra</h2>
      </div>
      <div className={styles.game_info_container}>
        <p>Dica: <span>{currentCategory}</span></p>
        <p>Você tem <span>{userAttempts}</span> tentativas</p>
      </div>
      <div className={styles.print_word_container}>
        {splitedCurrentWord.map((letter, index) => (
          emptyList.includes(letter) ? (
            <div key={index} className={styles.print_box}>
              <span>{letter}</span>
            </div>
          ) : (<div key={index} className={styles.print_box}></div>)
        ))}
      </div>
      <div className={styles.letter_input_container}>
        <p>Tente advinhar uma letra da palavra:</p>
        <div className={styles.letter_input_box}>
          <input
            type="text"
            className="user-letter"
            name="letter"
            maxLength="1"
            minLength="1"
            required
            ref={letterInputElementRef}
            onKeyUp={(e) => (e.key === "Enter") && handleUserLetter()}
          />
          <button onClick={handleUserLetter}>Jogar</button>
        </div>
        <p>Letras erradas já utlizadas:
          <span className={styles.wrong_letters}>{wrongUserLetters.map(letter => (
            ` ${letter}, `
          ))}</span></p>
      </div>
      <audio src={HitSoundEffect} ref={audioElementRef}></audio>
    </div>
  );
}

export default Game;