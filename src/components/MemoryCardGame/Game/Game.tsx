import * as React from 'react';
import * as _ from 'lodash';
import { IconType } from 'react-icons/lib';
import Card from '../Card';

import {
    FaBeer, FaBed, FaBandcamp,
    FaCalculator, FaCalendar, FaCamera, FaCartPlus, 
    FaDice, FaDiscord, FaDocker, FaDeviantart, FaEmpire, FaEnvelope, FaEmber, FaFacebook, FaFeather, FaFighterJet, FaGamepad, FaGem, FaHeadphones, FaHashtag, FaJava, FaJs, FaKeycdn, FaKiwiBird, FaLaptop, FaLastfm, FaMars, FaMedium, FaNodeJs, FaNpm, FaNewspaper, FaNintendoSwitch, FaOpera, FaOpenid, FaPatreon, FaPaypal, FaPalette, FaQrcode, FaQuora, FaReact, FaReddit, FaRocketchat, FaSafari, FaSass, FaShip, FaTablet, FaTelegram, FaTaxi, FaUber,
} from 'react-icons/fa';


interface GameProps {
    iconsPerRow: number,
    boardSize: number
};

interface GameState {
    collection: IconType[], // Will be a component with props IconType
};

import './Game.scss';

const SETS: {[set: string]: IconType[]} = {
    FA: [ FaBeer, FaBed, FaBandcamp, FaCalculator, FaCalendar, FaCamera, FaCartPlus, FaDice, FaDiscord, FaDocker, 
        FaDeviantart, FaEmpire, FaEnvelope, FaEmber, FaFacebook, FaFeather, FaFighterJet, FaGamepad, FaGem, FaHeadphones, 
        FaHashtag, FaJava, FaJs, FaKeycdn, FaKiwiBird, FaLaptop, FaLastfm, FaMars, FaMedium, FaNodeJs, 
        FaNpm, FaNewspaper, FaNintendoSwitch, FaOpera, FaOpenid, FaPatreon, FaPaypal, FaPalette, FaQrcode, FaQuora,
        FaReact, FaReddit, FaRocketchat, FaSafari, FaSass, FaShip, FaTablet, FaTelegram, FaTaxi, FaUber
    ],
    IO: [ FaBeer, FaBed, FaBandcamp, FaCalculator, FaCalendar, FaCamera, FaCartPlus, FaDice, FaDiscord, FaDocker ],
    MD: [ FaBeer, FaBed, FaBandcamp, FaCalculator, FaCalendar, FaCamera, FaCartPlus, FaDice, FaDiscord, FaDocker ],
}

const randomizeSet = (): string => {
    const setKeys = Object.keys(SETS);
    const randomizedIndex = Math.floor(Math.random() * 3);

    return setKeys[randomizedIndex];
}

const generateIconsCollection = (set: string, amount: number): IconType[] => {
    const allIcons = SETS[set];
    let rtnCollection: IconType[] = [];

    for(let i = 0; i < amount; i++) {
        rtnCollection = rtnCollection.concat([allIcons[i], allIcons[i]]);
    }

    return _.shuffle(rtnCollection);
}


class Game extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);

        this.state = {
            collection: []
        };
    }

    componentWillMount() {
        const { iconsPerRow } = this.props;
        const collection = generateIconsCollection('FA', iconsPerRow * iconsPerRow / 2);
        this.setState({
            collection
        });
    }

    render() {
        const { iconsPerRow, boardSize } = this.props;
        const { collection } = this.state;
        return (
            <div className="game-wrapper">
                {collection.map((Icon, index) => (
                    <Card Icon={Icon} key={`${Icon.name}_${index}`} iconsPerRow={iconsPerRow} boardSize={boardSize} />
                ))}
            </div>
        );
    }
}

export default Game;
