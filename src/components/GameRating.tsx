import React from "react";


const FILLED_CIRCLE = (<svg height={10} width={10}>
    <ellipse cx="5" cy="5"  rx="5" ry="5"
             style={{fill: 'yellow'}}>
    </ellipse>
</svg>);

const UNFILLED_CIRCLE = (<svg height={10} width={10}>
    <ellipse cx="5" cy="5"  rx="5" ry="5"
             style={{fill: 'white', strokeWidth: 1, stroke: "black"}}>
    </ellipse>
</svg>);

interface GameRatingProps {
    rating: 0|1|2|3|4|5;
    filledIcon?: any;  // TODO: type
    unfilledIcon?: any;  // TODO: type
}

export const GameRating: React.FC<GameRatingProps> = ({
    rating,
    filledIcon = FILLED_CIRCLE,
    unfilledIcon = UNFILLED_CIRCLE,
}: GameRatingProps) => {
    const filled = Array(rating).fill(filledIcon);
    const unfilled = Array(5 - rating).fill(unfilledIcon);
    return (
        <div>
            {filled}
            {unfilled}
        </div>
    );
};
