import React from "react"
import '/src/styles/game-display.css'

interface ButtonInfo {
    text: string,
    onClick: () => void
}

const AddToLibrary = (props: ButtonInfo) => {
    return (
    <button
        className= "add-to-library-button"
        onClick={props.onClick}
    >
    {props.text}
    </button>
)
}

export default AddToLibrary;
