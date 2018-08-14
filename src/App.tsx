import * as React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import {
    Container
} from 'reactstrap';
import MemoryCardGame from './components/MemoryCardGame';

import './scss/App.scss';

class App extends React.Component<{}> {
    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        document.addEventListener('contextmenu', this._handleContextMenu);
    }
    componentWillUnmount() {
        document.removeEventListener('contextmenu', this._handleContextMenu);
    }

    _handleContextMenu(e: any) {
        e.preventDefault();
        return false;
    }

    render() {
        return (
            <div className="page-wrapper">
                <Switch>
                    <Route path="/" component={MemoryCardGame}></Route>
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
