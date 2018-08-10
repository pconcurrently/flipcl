declare module "*.json" {
    const value: any;
    export default value;
}

declare module 'react-sound' {
    import * as React from 'react';
    export interface SoundProps {
        url?: string, // The url of the sound to play.
        playStatus?: string, //  (Sound.status.{PLAYING,STOPPED,PAUSED}): The current sound playing status. Change it in successive renders to play, stop, pause and resume the sound.
        status?: string,
        playFromPosition?: number, // Seeks to the position specified by this prop, any time it changes. After that, the sound will continue playing (or not, if the playStatus is not PLAYING). Use this prop to seek to different positions in the sound, but not use it as a controlled component. You should use either this prop or position, but not both.
        position?: number, // The current position the sound is at
        volume?: number, // The current sound's volume. A value between 0 and 100.
        playbackRate?: number,
        autoload?: boolean,
        loop?: boolean,
        onError?: () => void,
        onLoading?: () => void,
        onLoad?: () => void,
        onPlaying?: () => void,
        onPause?: () => void,
        onResume?: () => void,
        onStop?: () => void,
        onFinishedPlaying?: () => void,
        onBufferChange?: () => void,
    }

    export default class Sound extends React.Component<SoundProps> {
        constructor(props: SoundProps);
    }
}

declare module 'soundmanager2' {
    interface SMProps {
        setup?: any;
    }
    export default class SM<SMProps> {
    }
}