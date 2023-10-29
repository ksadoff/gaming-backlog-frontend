import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter, Routes, useParams } from 'react-router-dom';
import LibrariesPage from './pages/LibrariesPage';
import LibraryPage from './pages/LibraryPage';
import GamePage from './pages/GamePage';
import GameInstancePage from "./pages/GameInstancePage";
import UserProfilePage from './pages/UserProfilePage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';

const App = () => {
    return (
        <BrowserRouter>
          <Routes>
            {/* For now, home page can be the libraries page */}
            <Route path="/" element={<LibrariesPage/>}></Route>
            <Route path="/libraries" element={<LibrariesPage/>}></Route>
            <Route path="/libraries/:id" element={<LibraryPageWrapper/>}></Route>
            {/* TODO: Eventually we will need to differentiate between game page and 
            custom game page */}
            <Route path="/games/:id" element={<GamePageWrapper/>}></Route>
            <Route path="/games/instances/:id" element={<GameInstancePageWrapper/>}></Route>
            <Route path="/users/:id" element={<UserProfilePageWrapper/>}></Route>
            <Route  path="/register" element={<RegistrationPage/>}></Route>
            <Route  path="/login" element={<LoginPage/>}></Route>
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

function UserProfilePageWrapper() {
  const { id } = useParams();
  if (id) {
    return <UserProfilePage id={id} />;
  } else {
    //return user to their default libraries page
    return <LibrariesPage />;
  }
}

export default App;
