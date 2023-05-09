import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter, Routes, useParams } from 'react-router-dom';
import Game from './interfaces/Game'
import LibrariesPage from './pages/LibrariesPage';
import LibraryPage from './pages/LibraryPage';
import GamePage from './pages/GamePage';

const App = () => {
  let emptyGame: Game = { id: "", name: "", platforms: [], genres: [], franchises: [], companies: [], releaseDate: [], summary: "", image: ""}
  const [data, setData] = useState(emptyGame);

    useEffect( () => {
        fetch(`/games/${emptyGame.name}`)
        .then((res) => res.json())
        .then((data) => setData(data));
    }, [emptyGame]);

    const joinStrings = (arr: Array<string>) : string => {
      if (arr.length <= 1) return arr[0]
      let vals = ""
      let count = 0
      arr.reduce((acc, cur) => acc ? `${acc}, ${cur}` : cur)
      return vals
    }

    return (
        <BrowserRouter>
          <Routes>
            <Route path="/libraries" element={<LibrariesPage/>}></Route>
            <Route path="/libraries/:id" element={<LibraryPageWrapper/>}></Route>
            {/* TODO: Eventually we will need to differentiate between game page and 
            custome game page */}
            <Route path="/games/:id" element={<GamePageWrapper/>}></Route>
          </Routes>
       </BrowserRouter>)
}

function LibraryPageWrapper() {
  const { id } = useParams();
  if (id) { 
    return <LibraryPage libraryId={id} />;
  } else {
     //return user to their default libraries page
     return <LibrariesPage />;
  }
}

function GamePageWrapper() {
  const { id } = useParams();
  if (id) { 
    return <GamePage id={id} />;
  } else {
     //return user to their default libraries page
     return <LibrariesPage />;
  }
}

export default App;
