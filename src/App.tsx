import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter, Routes, useParams } from 'react-router-dom';
import Game from './interfaces/Game'
import LibrariesPage from './pages/LibrariesPage';
import LibraryPage from './pages/LibraryPage';
import GamePage from './pages/GamePage';
import GameInstancePage from "./pages/GameInstancePage";

const App = () => {
  let emptyGame: Game = { id: "", name: "", platforms: [], genres: [], franchises: [], companies: [], releaseDate: [], summary: "", images: []}
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
            {/* For now, home page can be the libraries page */}
            <Route path="/" element={<LibrariesPage/>}></Route>
            <Route path="/libraries" element={<LibrariesPage/>}></Route>
            <Route path="/libraries/:id" element={<LibraryPageWrapper/>}></Route>
            {/* TODO: Eventually we will need to differentiate between game page and 
            custome game page */}
            <Route path="/games/:id" element={<GamePageWrapper/>}></Route>
            <Route path="/games/instances/:id" element={<GameInstancePageWrapper/>}></Route>
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
    return <GamePage gameId={id} />;
  } else {
     //return user to their default libraries page
     return <LibrariesPage />;
  }
}

function GameInstancePageWrapper() {
  const { id } = useParams();
  if (id) {
    return <GameInstancePage gameId={id} />;
  } else {
    //return user to their default libraries page
    return <LibrariesPage />;
  }
}

export default App;
