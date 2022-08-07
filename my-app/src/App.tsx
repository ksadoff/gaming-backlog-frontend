import { useState, useEffect } from 'react';
import Game from './interfaces/Game'

const App = () => {
  let emptyGame: Game = { name: "", platforms: [], genres: [], franchises: [], companies: [], releaseDate: [], summary: "", image: ""}
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
      <div>
        {JSON.stringify(data) === JSON.stringify(emptyGame) ?
        <h1>"Loading..." </h1> :
        <div>
        <h1 className="game-title">{data.name}</h1>
        <img src={data.image} alt={data.name} width="150px" height="150px"/>
        <p><div className="game-field-header">Platforms: </div> {joinStrings(data.platforms)}</p>
        <p><div className="game-field-header">Franchises: </div> {joinStrings(data.franchises)}</p>
        <p><div className="game-field-header">Genres: </div> {joinStrings(data.genres)}</p>
        <p><div className="game-field-header">Companies: </div>{joinStrings(data.companies)}</p>
        <p><div className="game-field-header">Release: </div> {joinStrings(data.releaseDate)}</p>
        <br></br>
        <p><div className="game-field-header">Summary: </div> {data.summary}</p>
        </div>
        }
      </div>
  )
}

export default App;
