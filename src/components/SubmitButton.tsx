import React from "react"

interface ButtonInfo {
    text: string,
    onClick: () => void
}

const SubmitButton = (props: ButtonInfo) => {
    return (
    <button
        className= "submit-button"
        onClick={props.onClick}
    >
    {props.text}
    </button>
)
}

export default SubmitButton;
