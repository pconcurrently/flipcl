import * as React from 'react';

import { DIFFICULTIES } from '../constants'

import './Menu.scss';

interface MenuProps {
    chooseLevel: (level: string) => void
};

class Menu extends React.Component<MenuProps> {
    constructor(props: MenuProps) {
        super(props);

    }
    render() {
        const { chooseLevel } = this.props;
        const levels = Object.keys(DIFFICULTIES);

        return (
            <div className="menu-wrapper">
                {levels.map(level => (
                    <button 
                        key={level}
                        className="gaming-button"
                        onClick={() => chooseLevel(level)}
                    >
                        {DIFFICULTIES[level]}
                    </button>
                ))}
                
            </div>
        );
    }
}

export default Menu;
