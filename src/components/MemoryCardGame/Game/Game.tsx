import * as React from 'react';
import * as _ from 'lodash';
import * as moment from 'moment';
import { IconType } from 'react-icons/lib';

import Card from '../Card';

import {
    FaQuora, FaReact, FaReddit, FaRocketchat, FaSafari, FaSass, FaShip, FaTablet, FaTelegram, FaTaxi, FaUber,
    FaBeer, FaBed, FaBandcamp, FaCalculator, FaCamera, FaCartPlus, FaDice, FaDiscord, FaDocker, FaDigitalOcean ,
    FaDeviantart, FaEmpire, FaEnvelope, FaEmber, FaFacebook, FaFeather, FaFighterJet, FaGamepad, FaGem, FaHeadphones, 
    FaHashtag, FaJava, FaJs, FaKeycdn, FaKiwiBird, FaLaptop, FaLastfm, FaMars, FaMedium, FaNodeJs, 
    FaNpm, FaNewspaper, FaNintendoSwitch, FaOpera, FaOpenid, FaPatreon, FaPaypal, FaPalette, FaQrcode, 
} from 'react-icons/fa';
import {
    IoIosAirplane, IoIosAppstore, IoIosBaseball, IoIosAlert, IoIosBatteryFull, IoIosApps, IoIosBluetooth, IoIosBoat, IoIosBonfire, IoIosBed, 
    IoIosCafe, IoIosCar, IoIosCellular, IoIosCash, IoIosClipboard, IoIosDisc, IoIosCart, IoIosChatbubbles, IoIosCall, IoIosCloud, 
    IoIosEgg, IoIosExit, IoIosFastforward, IoIosFlag, IoIosFlash, IoIosFlame, IoIosFootball, IoIosFitness, IoIosGlobe, IoIosGift, 
    IoIosHammer, IoIosHeadset, IoIosHeartDislike, IoIosHourglass, IoIosHelpBuoy, IoIosIceCream, IoIosInfinite, IoIosImages, IoIosJet, IoIosJournal, 
    IoIosLaptop, IoIosLeaf, IoIosLink, IoIosLocate, IoIosLock, IoIosMagnet, IoIosMail, IoIosMap, IoIosMegaphone, IoIosNotifications, 
} from 'react-icons/io';
import { 
    FiActivity, FiAirplay, FiAlertOctagon, FiAperture, FiAward, FiBattery, FiBell, FiBook, FiBluetooth, FiBox,
    FiCast, FiCheckCircle, FiChrome, FiCodepen, FiCompass, FiCloudRain, FiCpu, FiDatabase, FiDollarSign, FiDroplet,
    FiEye, FiFacebook, FiFeather, FiFilm, FiFlag, FiGithub, FiGitlab, FiGlobe, FiGrid, FiHardDrive,
    FiHeadphones, FiHeart, FiInbox, FiInstagram, FiLayers, FiLinkedin, FiLoader, FiLock, FiMail, FiMapPin,
    FiMonitor, FiMoon, FiMusic, FiPackage, FiPhone, FiPlayCircle, FiPower, FiSend, FiShield, FiShoppingCart,
} from 'react-icons/fi';

interface CollectionItem {
    Icon: IconType,
    name: string,
    isFlipped?: boolean,
    isSolved?: boolean,
}
interface FlippingItem {
    name: string,
    index: number
}

interface SetIcon {
    [name: string]: IconType
}

interface GameState {
    collection: CollectionItem[],
    startTime?: any,
    endTime?: any,
    flipping: FlippingItem[],
};
interface GameProps {
    iconsPerRow: number,
    boardSize: number,
    onFinish: (startTime: any, endTime: any) => void
};

import './Game.scss';

const SETS: {[set: string]: SetIcon[]} = {
    FA: [ 
        { FaReact }, { FaReddit }, { FaRocketchat }, { FaSafari }, { FaSass }, { FaShip }, { FaTablet }, { FaTelegram }, { FaTaxi }, { FaUber },
        { FaBeer }, { FaBed }, { FaBandcamp }, { FaCalculator }, { FaCamera }, { FaCartPlus }, { FaDice }, { FaDiscord }, { FaDocker }, { FaDigitalOcean }, 
        { FaDeviantart }, { FaEmpire }, { FaEnvelope }, { FaEmber }, { FaFacebook }, { FaFeather }, { FaFighterJet }, { FaGamepad }, { FaGem }, { FaHeadphones }, 
        { FaHashtag }, { FaJava }, { FaJs }, { FaKeycdn }, { FaKiwiBird }, { FaLaptop }, { FaLastfm }, { FaMars }, { FaMedium }, { FaNodeJs }, 
        { FaNpm }, { FaNewspaper }, { FaNintendoSwitch }, { FaOpera }, { FaOpenid }, { FaPatreon }, { FaPaypal }, { FaPalette }, { FaQrcode }, { FaQuora },
    ],
    IO: [
        { IoIosAirplane }, { IoIosAppstore }, { IoIosBaseball }, { IoIosAlert }, { IoIosBatteryFull }, { IoIosApps }, { IoIosBluetooth }, { IoIosBoat }, { IoIosBonfire }, { IoIosBed },
        { IoIosCafe }, { IoIosCar }, { IoIosCellular }, { IoIosCash }, { IoIosClipboard }, { IoIosDisc }, { IoIosCart }, { IoIosChatbubbles }, { IoIosCall }, { IoIosCloud },
        { IoIosEgg }, { IoIosExit }, { IoIosFastforward }, { IoIosFlag }, { IoIosFlash }, { IoIosFlame }, { IoIosFootball }, { IoIosFitness }, { IoIosGlobe }, { IoIosGift },
        { IoIosHammer }, { IoIosHeadset }, { IoIosHeartDislike }, { IoIosHourglass }, { IoIosHelpBuoy }, { IoIosIceCream }, { IoIosInfinite }, { IoIosImages }, { IoIosJet }, { IoIosJournal },
        { IoIosLaptop }, { IoIosLeaf }, { IoIosLink }, { IoIosLocate }, { IoIosLock }, { IoIosMagnet }, { IoIosMail }, { IoIosMap }, { IoIosMegaphone }, { IoIosNotifications },
    ],
    FI: [
        { FiActivity }, { FiAirplay }, { FiAlertOctagon }, { FiAperture }, { FiAward }, { FiBattery }, { FiBell }, { FiBook }, { FiBluetooth }, { FiBox },
        { FiCast }, { FiCheckCircle }, { FiChrome }, { FiCodepen }, { FiCompass }, { FiCloudRain }, { FiCpu }, { FiDatabase }, { FiDollarSign }, { FiDroplet },
        { FiEye }, { FiFacebook }, { FiFeather }, { FiFilm }, { FiFlag }, { FiGithub }, { FiGitlab }, { FiGlobe }, { FiGrid }, { FiHardDrive },
        { FiHeadphones }, { FiHeart }, { FiInbox }, { FiInstagram }, { FiLayers }, { FiLinkedin }, { FiLoader }, { FiLock }, { FiMail }, { FiMapPin },
        { FiMonitor }, { FiMoon }, { FiMusic }, { FiPackage }, { FiPhone }, { FiPlayCircle }, { FiPower }, { FiSend }, { FiShield }, { FiShoppingCart },
    ],
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
            flipping: [],
        };

        this.flipCard == this.flipCard.bind(this);
    }

    componentWillMount() {
        const { iconsPerRow } = this.props;
        // const collection = generateIconsCollection(randomizeSet(), iconsPerRow * iconsPerRow / 2);
        const collection = generateIconsCollection(randomizeSet(), 2);
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
        const { collection, flipping } = this.state;

        if (collection[index] && !collection[index].isSolved) {
            if (flipping.length === 1) {
                collection[index].isFlipped = true;
                flipping.push({ name: collection[index].name, index });
                this.setState({
                    collection,
                    flipping
                });

                if (flipping[0].name === flipping[1].name) {
                    collection[flipping[0].index].isSolved = true;
                    collection[flipping[1].index].isSolved = true;
                    this.setState({
                        collection,
                        flipping: []
                    });
                    const won = collection.every(item => item.isSolved);
                    if (won) {
                        const endTime = moment();
                        setTimeout(() => this.props.onFinish(this.state.startTime, endTime), 1000);
                    }
                } else {
                    setTimeout(() => {
                        collection[flipping[0].index].isFlipped = false;
                        collection[flipping[1].index].isFlipped = false;
                        this.setState({
                            collection,
                            flipping: []
                        });
                    }, 500)
                    
                }
            } else if (flipping.length === 0) {
                collection[index].isFlipped = true;
                flipping.push({ name: collection[index].name, index });
                this.setState({
                    collection,
                    flipping
                });
            }


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
