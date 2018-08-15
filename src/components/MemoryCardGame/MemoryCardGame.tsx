import * as React from 'react';
import {
    Modal, ModalBody, ModalFooter, Button
} from 'reactstrap';
import axios from 'axios';
import firebase from '../../firebase';

import * as moment from 'moment';

const momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment)

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
    startTime?: any,
    endTime?: any,
    isModalOpen: boolean,
    playingStatus: string,
    userIp: string,
    duration?: string,
    highscores?: any,
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
    isModalOpen: false,
    playingStatus: PLAY_STATUS.STOPPED,
    userIp: '',
}

let interval: any;
class MemoryCard extends React.Component<{}, MemoryCardState> {
    private userIp: any;
    private modalTimer: any;
    private firebaseRef: any;
    private firebaseCallback: any;
    private highscores: any;
    constructor(props: any) {
        super(props);

        if (typeof window !== undefined && (window as any).soundManager) {
            (window as any).soundManager.setup({ debugMode: false });
        }

        this.state = initialState;

        this.chooseLevel = this.chooseLevel.bind(this);
        this.updateBoardSize = this.updateBoardSize.bind(this);
        this.goToStage = this.goToStage.bind(this);
        this.goToMenu = this.goToMenu.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentWillMount() {
        axios.get('https://geoip-db.com/jsonp/')
            .then(res => {
                if (res.status === 200) {
                    const data = JSON.parse(res.data.replace(/^callback\(|\)\;/g, '').replace(')', ''));
                    this.userIp = data.IPv4;
                }
            })
            .catch(error => {
            });
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateBoardSize);
        this.firebaseRef = firebase.database().ref('/highscores');
        this.firebaseCallback = this.firebaseRef.on('value', (snap: any) => {
            this.highscores = snap.val();
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateBoardSize);
    }

    chooseLevel(level: string) {
        const transformedLevel = DIFFICULTIES[level];
        this.setState({
            level: transformedLevel,
            stage: STAGES.PLAY,
            iconsPerRow: ICONS_PER_ROW[transformedLevel],
            playingStatus: PLAY_STATUS.PLAYING,
        });        
    }

    updateBoardSize() {
        if (this.modalTimer) {
            clearTimeout(this.modalTimer);
        }
        this.modalTimer = setTimeout(() => this.setState({
            isModalOpen: true,
        }), 200);
    }

    reloadPage() {
        if (typeof window !== 'undefined') {
            window.location.reload();
        }
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
        const { level } = this.state;
        const ip = this.userIp.replace(/\./g, '_');
        const duration = moment.duration(endTime.diff(startTime));
        const durationAsSeconds = (duration as any).format();
        const userHighScore = this.highscores[ip][level];
        if (Math.ceil(duration.asSeconds()) < userHighScore) {
            this.firebaseRef.update({
                [ip]: {
                    [level]: Math.ceil(duration.asSeconds())
                },
            });
        }
        this.setState({
            stage: STAGES.SCORE,
            duration: durationAsSeconds,
        });
    }

    toggleModal() {
        const isModalOpen = this.state;
        this.setState({
            isModalOpen: !isModalOpen
        });
    }

    render() {
        const { stage, playingPosition, boardSize, iconsPerRow, duration, playingStatus } = this.state;
        const actualBoardSize = boardSize * iconsPerRow / ICONS_PER_ROW[DIFFICULTIES.VERY_HARD];
        return (
            <div className="game-container">
                <h1 className="title">FLIPCL</h1>
                <Sound
                    url="assets/audio/adamant_opinion.mp3"
                    playStatus={playingStatus}
                    playFromPosition={playingPosition}
                    loop
                    volume={50}
                />
                <div className="main-board" style={{ width: boardSize }}>
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
                        {stage === STAGES.SCORE ? <Score duration={duration} /> : null}
                    </div>
                </div>
                <div className="home-button-wrapper">
                    {stage === STAGES.PLAY ? <Counter /> : null}
                    {stage !== STAGES.MENU ? <button className="gaming-button home-button" onClick={this.goToMenu}>Back To Menu</button> : null}
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalBody>
                        Resolution changed. Please reload to continue playing!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.reloadPage}>Reload</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
};

export default MemoryCard;