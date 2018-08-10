import * as React from 'react';
import Sound from 'react-sound';

class SoundWrapper extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <Sound {...this.props} />
    }

    shouldComponentUpdate() {
        return false;
    }
}

export default SoundWrapper;
