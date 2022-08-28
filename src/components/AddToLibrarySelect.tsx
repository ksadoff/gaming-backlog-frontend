import axios from 'axios';
import React from 'react';
import { useState } from "react";
import AddToLibraryButton from './AddToLibraryButton';

/**
 * An alternative approach to selecting a library
 */


const AddToLibrarySelect = () => {
    const libraryLabels = ["Backlog", "Wishlist", "Played"];

    const [selected, setSelected] = useState("")

    const handleSubmit = () => {
        //TODO: a lot of this is placeholder or temporary
        let data = {gameID: "Super Mario Odyssey", userID: "placeholder", library: selected}
            axios.post("http://localhost:3001/games/added", data)
                .then(res => console.log("Data sent"))
                .catch(err => console.log("ERROR: " + err))
        }

    return (
        <div className="add-to-library-button">
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
            {
                libraryLabels.map( (label: string, ind: number) => (
                    <option value={label} key={ind}>{label}</option>
                ))
            }
        </select>
        <br></br>
        <br></br>
        <AddToLibraryButton text="Add to Library" onClick={handleSubmit}/>
        </div>
    )
}

export default AddToLibrarySelect;
