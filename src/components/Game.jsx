import React, {useState} from 'react';
import GameBoard from "./GameBoard";
import Menu from "./menu/Menu";
import Results from "./Results";

const Game = () => {
  const [menuActive, setMenuActive] = useState(true);
  const [gameActive, setGameActive] = useState(false);
  const [resultsActive, setResultsActive] = useState(false);
  const [gameOptions, setGameOptions] = useState({size: 4});
  const [gameResult, setGameResult] = useState({score: 0, fails: 0, time: 0});

  const clearGame = () => {
    setGameResult({score: 0, fails: 0, time: 0});
  }

  const startGame = () => {
    setMenuActive(false);
    setGameActive(true);
  }

  const goToMenu = () => {
    clearGame();
    setGameActive(false);
    setResultsActive(false);
    setMenuActive(true);
  }

  const endGame = (result) => {
    setGameActive(false);
    setGameResult(result);
    setResultsActive(true);
  }

  return (
    <div>
      {menuActive && <Menu startGame={startGame} gameOptions={{value: gameOptions, set: setGameOptions}}/>}
      {resultsActive && <Results gameResult={gameResult} size={gameOptions.size} goToMenu={goToMenu}/>}
      {gameActive && <GameBoard size={gameOptions.size} content={generateNumberArray(gameOptions.size)} endGame={endGame} goToMenu={goToMenu}/>}
    </div>
  );
};

export default Game;


function generateNumberArray(size) {
  const array = [];
  const primes = [];
  for (let i = 1; i < size ** 2 / 2 + 1; i++) {
    const obj = {
      open: false,
      done: false,
      id: i,
      content: i,
    };
    array.push({...obj}, {...obj});
  }
  for (let i = 2; i <= 50; i++) {
    if (!array[i]) {
      primes.push(i);
      for (let j = Math.random((i) * i); j <= 50; j += i) {
        array[j] = true;
      } 
    }
    
  }
  return array;
}