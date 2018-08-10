import * as React from 'react';

import Menu from './Menu';
import Game from './Game';
import Sound from './Sound';

import { STAGES, DIFFICULTIES, PLAY_STATUS, BOARD_SIZES, ICONS_PER_ROW } from './constants';

import './MemoryCardGame.scss';

interface MemoryCardState {
    level: string,
    stage: number,
    playingPosition: number,
    boardSize: number,
    iconsPerRow: number
}

const calculateBoardSize = (): number => {
    let rtnSize = 0;
    let innerHeight = 0, innerWidth = 0;
    if (typeof window !== 'undefined') {
        innerHeight = window.innerHeight;
        innerWidth = window.innerWidth;

        if (innerWidth > innerHeight) {
            innerWidth = innerHeight;
        }
    }

    if (innerWidth >= 1200) {
        rtnSize = BOARD_SIZES.XL;
    } else if (innerWidth >= 992) {
        rtnSize = BOARD_SIZES.LG;
    } else if (innerWidth >= 768) {
        rtnSize = BOARD_SIZES.MD;
    } else if (innerWidth >= 576) {
        rtnSize = BOARD_SIZES.SM;
    } else {
        rtnSize = BOARD_SIZES.XS;
    }

    return rtnSize;
}

const initialState = {
    level: DIFFICULTIES.EASY,
    stage: STAGES.MENU,
    playingPosition: 3000,
    boardSize: calculateBoardSize(),
    iconsPerRow: 10
}

class MemoryCard extends React.Component<{}, MemoryCardState> {
    constructor(props: any) {
        super(props);

        if (typeof window !== undefined && (window as any).soundManager) {
            (window as any).soundManager.setup({ debugMode: false });
        }

        this.state = initialState;

        this.chooseLevel = this.chooseLevel.bind(this);
        this.updateBoardSize = this.updateBoardSize.bind(this);
        this.goToStage = this.goToStage.bind(this);
    }

    chooseLevel(level: string) {
        const transformedLevel = DIFFICULTIES[level];
        this.setState({
            level: transformedLevel,
            stage: STAGES.PLAY,
            iconsPerRow: ICONS_PER_ROW[transformedLevel]
        })
    }

    updateBoardSize() {
        // this.setState({
        //     boardSize: calculateBoardSize(),
        // });
    }

    goToStage(stage: number) {
        this.setState({
            ...initialState
        });
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateBoardSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateBoardSize);
    }

    render() {
        const { stage, playingPosition, boardSize, iconsPerRow } = this.state;
        const actualBoardSize = boardSize * iconsPerRow / ICONS_PER_ROW[DIFFICULTIES.VERY_HARD];
        return (
            <div className="game-container">
                <h1 className="title">Memory Card Game</h1>
                {/* <Sound
                    url="assets/audio/adamant_opinion.mp3"
                    playStatus={PLAY_STATUS.PLAYING}
                    playFromPosition={playingPosition}
                    loop
                /> */}
                <div className="main-board" style={{ width: boardSize, height: boardSize }}>
                    <div className="actual-board" style={{ width: actualBoardSize, height: actualBoardSize }}>
                        {stage === STAGES.MENU ? (
                            <Menu chooseLevel={this.chooseLevel} />
                        ) : null}
                        {stage === STAGES.PLAY ? (
                            <Game iconsPerRow={iconsPerRow} boardSize={actualBoardSize} />
                        ) : null}
                    </div>
                </div>
                {stage !== STAGES.MENU ? <button className="gaming-button" onClick={() => this.goToStage(STAGES.MENU)}>BackTo Menu</button> : null}
            </div>
        );
    }
};

export default MemoryCard;