import * as React from 'react';
import { IconType } from 'react-icons/lib';

interface CardProps {
    Icon: IconType,
    isFlipped?: boolean,
    size?: number,
    style?: any,
    iconsPerRow: number,
    boardSize: number,
    onClick: () => void,
}

interface CardState {
    isFlipped: boolean,
}

const iconStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
};

import './Card.scss';

class Card extends React.Component<CardProps, CardState> {
    constructor(props: CardProps) {
        super(props);
    }

    render() {
        const { Icon, isFlipped, boardSize, iconsPerRow, onClick, ...rest } = this.props;
        const size = boardSize / iconsPerRow;
        return (
            <div 
                className={`card-container ${isFlipped ? 'flipped' : ''}`} 
                style={{ width: size - 16, height: size - 16}}
                onClick={onClick}
            >
                <div className="card-backside" style={{ width: size - 16, height: size - 16 }}>
                    <Icon className="card" {...rest} size={size * 0.5} style={iconStyle} />
                </div>
            </div>
        );
    }
}

export default Card;
