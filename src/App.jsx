import { useState, useEffect } from "react";

import StartGame from "./components/StartGame";
import Game from "./components/Game";
import EndGame from "./components/EndGame";

import {
  handleGetRandomIndex,
  handleGetCurrentWord,
  handleGetCurrentCategory } from "./utils/getData";

import "./App.css";


const App = () => {

  // Functions that gets new values
  const getRandomIndex = handleGetRandomIndex;
  const [getCurrentWord, setGetCurrentWord] = useState(null);
  const [getCurrentCategory, setGetCurrentCategory] = useState(null);


  const [userScore, setUserScore] = useState(0);
  const [renderComponent, setRenderComponent] = useState("StartGame");
  

  useEffect(() => {
    getRandomIndex();
    setGetCurrentWord(handleGetCurrentWord())
    setGetCurrentCategory(handleGetCurrentCategory());
  }, [userScore]);


  return (
    <main className="App">
      {renderComponent === "StartGame" &&
        <StartGame setRenderComponent={setRenderComponent} />
      }
      {renderComponent === "Game" &&
        <Game
          setRenderComponent={setRenderComponent}
          userScoreValue={userScore}
          setUserScoreValue={setUserScore}
          currentCategoryValue={getCurrentCategory}
          splitedCurrentWordValue={getCurrentWord}
        />
      }
      {renderComponent === "EndGame" &&
        <EndGame
          setRenderComponent={setRenderComponent}
          userScoreValue={userScore}
          setUserScoreValue={setUserScore}
        />
      }
    </main>
  );
}

export default App;