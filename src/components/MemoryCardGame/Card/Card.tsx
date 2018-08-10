import * as React from 'react';
import { IconType } from 'react-icons/lib';

interface CardProps {
    Icon: IconType,
    isFlipped?: boolean,
    size?: number,
    style?: any,
    iconsPerRow: number,
    boardSize: number
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

        this.state = {
            isFlipped: false,
        }

        this.flip = this.flip.bind(this);
    }

    flip() {
        const { isFlipped } = this.state;
        this.setState({
            isFlipped: !isFlipped
        })
    }

    render() {
        const { Icon, isFlipped, boardSize, iconsPerRow, ...rest } = this.props;
        const size = boardSize / iconsPerRow;
        return (
            <div 
                className={`card-container ${this.state.isFlipped ? 'flipped' : ''}`} 
                style={{ width: size, height: size}}
                onClick={this.flip}
            >
                <div className="card-backside">
                    <Icon className="card" {...rest} size={size - 20} style={iconStyle} />
                </div>
            </div>
        );
    }
}

export default Card;
