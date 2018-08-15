import * as React from 'react';
import Sound from 'react-sound';

import { PLAY_STATUS } from '../constants';

class SoundWrapper extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <Sound {...this.props} />
    }

    shouldComponentUpdate(nextProps: any) {
        if (this.props.playStatus === PLAY_STATUS.STOPPED && nextProps.playStatus === PLAY_STATUS.PLAYING) {
             return true;
        }
        return false;
    }
}

export default SoundWrapper;
