import React from 'react';
import GameProvider from './GameContext';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ConfigureGame, { RouteName as ConfigureGameRoute } from './GameConfiguration/ConfigureGame';
import ListVerbs, { RouteName as ListVerbsRoute } from './VerbsListing/ListVerbs';

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" exact element={<ConfigureGame />} />
          <Route path={ConfigureGameRoute} element={<ConfigureGame />} />
          <Route path={ListVerbsRoute} element={<ListVerbs />}/>
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
