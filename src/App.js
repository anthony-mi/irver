import React from 'react';
import GameProvider from './GameContext';
import ConfigureGame from './GameConfiguration/ConfigureGame';

function App() {
  return (
    <GameProvider>
      <ConfigureGame />
    </GameProvider>
  );
}

export default App;
