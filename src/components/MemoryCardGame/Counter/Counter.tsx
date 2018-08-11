import * as React from 'react';
import * as moment from 'moment';

import './Counter.scss';

interface CounterState {
    counter: string,
}

class Counter extends React.Component<{}, CounterState> { 
    private interval: any;
    constructor(props: any) {
        super(props);
        this.state = {
            counter: '00:00:00',
        }
    }

    componentWillMount() {
        const startTimestamp = moment().startOf("day");
        this.interval = setInterval(() => {
            startTimestamp.add(1, 'second');
            this.setState({
                counter: startTimestamp.format('HH:mm:ss')
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="counter">
                {this.state.counter}
            </div>
        );
    }
}

export default Counter;
