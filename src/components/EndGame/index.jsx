import { useRef, useEffect } from "react";

import styles from "./index.module.css";

// Sound Effects
import LostSoundEffect from "../../assets/sounds/lost.mp3";


const EndGame = ({ setRenderComponent, userScoreValue, setUserScoreValue }) => {

  // Data
  const renderGameStart = setRenderComponent;
  const setScore = setUserScoreValue;

  const audioElement = useRef();


  // Functions
  const handleRenderGameStart = () => {
    renderGameStart("StartGame");
    setScore(0);
  }


  const setSoundEffectVolume = () => {
    audioElement.current.volume = 0.1;
  }


  useEffect(() => {
    setSoundEffectVolume();
  }, []);


  return (
    <div className={styles.main_container}>
      <div className={styles.title_container}>
        <h2>Fim do Jogo</h2>
      </div>
      <div className={styles.content_container}>
        <p>Sua pontuação final foi: <span>{userScoreValue}</span></p>
        <button onClick={handleRenderGameStart}>Reiniciar</button>
      </div>
      <audio src={LostSoundEffect} ref={audioElement} autoPlay></audio>
    </div>
  );
}

export default EndGame;