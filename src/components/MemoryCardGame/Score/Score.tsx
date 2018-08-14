import * as React from 'react';
import * as moment from 'moment';

const momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);

import './Score.scss';

interface ScoreProps {
    startTime: any,
    endTime: any,
}

const Score = ({ startTime, endTime }: ScoreProps) => {
    const duration = moment.duration(endTime.diff(startTime));
    const durationAsSeconds = (duration as any).format();
    return (
        <div className="game-score">
            {`Score: ${durationAsSeconds}`}
        </div>
    );
};

export default Score;
