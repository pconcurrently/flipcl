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
