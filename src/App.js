import './App.css';

import images from './dataImports';

import Game from './components/Game/Game';
//passing the width and the images to the game matrix
const width = 8
const candyImages= images.map((element)=> element.company)

function App() {
  

  return (
    <div className="app">
      <div className="game">
        <Game width={width} candyImages={candyImages} />
       </div>
    </div>
  );
}
export default App;
