import * as React from 'react';

import Menu from './Menu';
import Game from './Game';
import Sound from './Sound';
import Score from './Score';
import Counter from './Counter';

import { STAGES, DIFFICULTIES, PLAY_STATUS, BOARD_SIZES, ICONS_PER_ROW } from './constants';

import './MemoryCardGame.scss';

interface MemoryCardState {
    level: string,
    stage: number,
    playingPosition: number,
    boardSize: number,
    iconsPerRow: number,
    counter: string,
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
        rtnSize = innerWidth;
    }

    return rtnSize;
}

const initialState = {
    level: DIFFICULTIES.EASY,
    stage: STAGES.MENU,
    playingPosition: 3000,
    boardSize: calculateBoardSize(),
    iconsPerRow: 10,
    counter: '00:00:00',
}

let interval: any;
class MemoryCard extends React.Component<{}, MemoryCardState> {
    private counter: any;
    constructor(props: any) {
        super(props);

        this.counter = React.createRef();

        if (typeof window !== undefined && (window as any).soundManager) {
            (window as any).soundManager.setup({ debugMode: false });
        }

        this.state = initialState;

        this.chooseLevel = this.chooseLevel.bind(this);
        this.updateBoardSize = this.updateBoardSize.bind(this);
        this.goToStage = this.goToStage.bind(this);
        this.goToMenu = this.goToMenu.bind(this);
        this.onFinish = this.onFinish.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateBoardSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateBoardSize);
    }

    chooseLevel(level: string) {
        const transformedLevel = DIFFICULTIES[level];
        this.setState({
            level: transformedLevel,
            stage: STAGES.PLAY,
            iconsPerRow: ICONS_PER_ROW[transformedLevel]
        });        
    }

    updateBoardSize() {
        // this.setState({
        //     boardSize: calculateBoardSize(),
        // });
    }

    goToStage(stage: number) {
        this.setState({
            stage
        });
    }

    goToMenu() {
        this.setState({
            ...initialState
        });
    }

    onFinish(startTime: any, endTime: any) {
        console.log(startTime, endTime);
        this.setState({
            stage: STAGES.SCORE
        });
    }

    render() {
        const { stage, playingPosition, boardSize, iconsPerRow, counter } = this.state;
        const actualBoardSize = boardSize * iconsPerRow / ICONS_PER_ROW[DIFFICULTIES.VERY_HARD];
        return (
            <div className="game-container">
                <h1 className="title">FLIPCL</h1>
                <Sound
                    url="assets/audio/adamant_opinion.mp3"
                    playStatus={PLAY_STATUS.PLAYING}
                    playFromPosition={playingPosition}
                    loop
                />
                <div className="main-board" style={{ width: boardSize, height: boardSize + 100 }}>
                    <div className="actual-board" style={{ width: actualBoardSize, height: actualBoardSize }}>
                        {stage === STAGES.MENU ? (
                            <Menu chooseLevel={this.chooseLevel} />
                        ) : null}
                        {stage === STAGES.PLAY ? (
                            <Game 
                                iconsPerRow={iconsPerRow} 
                                boardSize={actualBoardSize + iconsPerRow * 8} 
                                onFinish={this.onFinish}
                            />
                        ) : null}
                        {stage === STAGES.SCORE ? <Score /> : null}
                    </div>
                    <div className="home-button-wrapper">
                        {stage === STAGES.PLAY ?  <Counter ref={this.counter} /> : null}
                        {stage !== STAGES.MENU ? <button className="gaming-button home-button" onClick={this.goToMenu}>Back To Menu</button> : null}
                    </div>
                </div>
            </div>
        );
    }
};

export default MemoryCard;