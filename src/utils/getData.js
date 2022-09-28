import { words } from "./words.js";


// Data
const wordList = words;
let randomIndex = Math.floor(Math.random() * wordList.length);


// Functions
const handleGetRandomIndex = () => {
  randomIndex = Math.floor(Math.random() * wordList.length);
}


const handleGetCurrentWordList = () => {
  const currentWordList = wordList[randomIndex].word;

  return currentWordList;
}


const handleGetCurrentWord = () => {
  const currentWordList = handleGetCurrentWordList();
  const handleGetRandomIndex = Math.floor(Math.random() * currentWordList.length);

  let currentWord = currentWordList[handleGetRandomIndex];

  return currentWord.toUpperCase().split("");
}


const handleGetCurrentCategory = () => {
  const currentCategory = wordList[randomIndex].category;

  return currentCategory
}


export { handleGetRandomIndex, handleGetCurrentWord, handleGetCurrentCategory }