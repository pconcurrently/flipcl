import * as React from 'react';;

import './Score.scss';

interface ScoreProps {
    duration: string
}

const Score = ({ duration }: ScoreProps) => {
    return (
        <div className="game-score">
            {`Score: ${duration}`}
        </div>
    );
};

export default Score;
