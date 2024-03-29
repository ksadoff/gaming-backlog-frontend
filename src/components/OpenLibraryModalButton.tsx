import React from "react"

interface ButtonInfo {
    text: string,
    onClick: () => void
}

const OpenLibraryModalButton = (props: ButtonInfo) => {
    return (
    <button
        className= "add-to-library-button"
        onClick={props.onClick}
    >
    {props.text}
    </button>
)
}

export default OpenLibraryModalButton;
