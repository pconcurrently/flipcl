import * as React from 'react';
import * as _ from 'lodash';
import * as moment from 'moment';
import { IconType } from 'react-icons/lib';

import Card from '../Card';

import {
    FaBeer, FaBed, FaBandcamp, FaCalculator, FaCamera, FaCartPlus, FaDice, FaDiscord, FaDocker, FaDigitalOcean ,
    FaDeviantart, FaEmpire, FaEnvelope, FaEmber, FaFacebook, FaFeather, FaFighterJet, FaGamepad, FaGem, FaHeadphones, 
    FaHashtag, FaJava, FaJs, FaKeycdn, FaKiwiBird, FaLaptop, FaLastfm, FaMars, FaMedium, FaNodeJs, 
    FaNpm, FaNewspaper, FaNintendoSwitch, FaOpera, FaOpenid, FaPatreon, FaPaypal, FaPalette, FaQrcode, 
    FaQuora, FaReact, FaReddit, FaRocketchat, FaSafari, FaSass, FaShip, FaTablet, FaTelegram, FaTaxi, FaUber,
} from 'react-icons/fa';
import {
    IoIosAirplane
} from 'react-icons/io';

interface CollectionItem {
    Icon: IconType,
    name: string,
    isFlipped?: boolean,
    isSolved?: boolean,
}

interface SetIcon {
    [name: string]: IconType
}

interface GameState {
    collection: CollectionItem[],
    currentOpen?: { index: number, name: string },
    startTime?: any,
    endTime?: any,
};
interface GameProps {
    iconsPerRow: number,
    boardSize: number,
    onFinish: (startTime: any, endTime: any) => void
};

import './Game.scss';

const SETS: {[set: string]: SetIcon[]} = {
    FA: [ 
        { FaBeer }, { FaBed }, { FaBandcamp }, { FaCalculator }, { FaCamera }, { FaCartPlus }, { FaDice }, { FaDiscord }, { FaDocker }, { FaDigitalOcean }, 
        { FaDeviantart }, { FaEmpire }, { FaEnvelope }, { FaEmber }, { FaFacebook }, { FaFeather }, { FaFighterJet }, { FaGamepad }, { FaGem }, { FaHeadphones }, 
        { FaHashtag }, { FaJava }, { FaJs }, { FaKeycdn }, { FaKiwiBird }, { FaLaptop }, { FaLastfm }, { FaMars }, { FaMedium }, { FaNodeJs }, 
        { FaNpm }, { FaNewspaper }, { FaNintendoSwitch }, { FaOpera }, { FaOpenid }, { FaPatreon }, { FaPaypal }, { FaPalette }, { FaQrcode }, { FaQuora },
        { FaReact }, { FaReddit }, { FaRocketchat }, { FaSafari }, { FaSass }, { FaShip }, { FaTablet }, { FaTelegram }, { FaTaxi }, { FaUber }
    ],
    IO: [
        { IoIosAirplane } ,
    ],
    // MD: [ FaBeer, FaBed, FaBandcamp, FaCalculator, FaCalendar, FaCamera, FaCartPlus, FaDice, FaDiscord, FaDocker ],
}

const randomizeSet = (): string => {
    const setKeys = Object.keys(SETS);
    const randomizedIndex = Math.floor(Math.random() * 3);

    return setKeys[randomizedIndex];
}

const generateIconsCollection = (set: string, amount: number): SetIcon[] => {
    const allIcons = SETS[set];
    let rtnCollection: SetIcon[] = [];

    for(let i = 0; i < amount; i++) {
        const icon = allIcons[i];
        rtnCollection = rtnCollection.concat([allIcons[i], allIcons[i]]);
    }

    return _.shuffle(rtnCollection);
}

class Game extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);

        this.state = {
            collection: [],
        };

        this.flipCard == this.flipCard.bind(this);
    }

    componentWillMount() {
        const { iconsPerRow } = this.props;
        // const collection = generateIconsCollection('FA', iconsPerRow * iconsPerRow / 2);
        const collection = generateIconsCollection('FA', 2);
        const collectionMapping = collection.map(item => ({
            Icon: item[Object.keys(item)[0]],
            name: Object.keys(item)[0],
            isFlipped: false,
            isSolved: false,
        }));
        this.setState({
            collection: collectionMapping,
            startTime: moment()
        });
    }

    flipCard(index: number) {
        const { collection, currentOpen } = this.state;
        if (collection[index] && !collection[index].isSolved) {
            collection[index].isFlipped = true;
            this.setState({
                collection,
            });
            setTimeout(() => {
                if (currentOpen) {
                    if (currentOpen.name === collection[index].name) {
                        collection[index].isSolved = true;
                        collection[currentOpen.index].isSolved = true;
                        setTimeout(() => {
                            this.setState({
                                collection,
                                currentOpen: null
                            });
                            const won = collection.every(item => item.isSolved);
                            if (won) {
                                const endTime = moment();
                                this.props.onFinish(this.state.startTime, endTime);
                            }
                        }, 400);
                    } else {
                        collection[index].isFlipped = false;
                        collection[currentOpen.index].isFlipped = false;
                        setTimeout(() => this.setState({
                            collection,
                            currentOpen: null
                        }), 400);
                    }
                } else {
                    collection[index].isFlipped = true;
                    this.setState({
                        collection,
                        currentOpen: { index, name: collection[index].name }
                    });
                }
            }, 200)
        }
    }

    render() {
        const { iconsPerRow, boardSize } = this.props;
        const { collection } = this.state;
        return (
            <div className="game-wrapper">
                {collection.map((item, index) => (
                    <Card 
                        Icon={item.Icon} 
                        key={`icon_${item.name}_${index}`} 
                        iconsPerRow={iconsPerRow} 
                        boardSize={boardSize}
                        isFlipped={item.isFlipped || item.isSolved}
                        onClick={() => this.flipCard(index)}
                    />
                ))}
            </div>
        );
    }
}

export default Game;
