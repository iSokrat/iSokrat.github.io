'use strict';

// VW -Viewport width
const ConstVideoSurface = {
    REWINDING_STEP_IN_VW: 100,
    CURRENT_LEFT_POS_FOR_VIDEO_BOARD_IN_VW: 0,
    COUNT_OF_PAGE_TURNING: 2, // every countOfPageTurning page turning load new videos
}

const MouseEventState = {
    NEUTRAL: 0,
    MOUSE_DOWN: 1,
}

const MediaInfo = {
    neutral: {
        name: 'neutral'
    },
    md: {
        name: 'md',
        maxWidth: 1170,
        units: 'px',
    },
    sm: {
        name: 'sm',
        maxWidth: 992,
        units: 'px',
    },
    xsm: {
        name: 'xsm',
        maxWidth: 480,
        units: 'px',
    },
}

const YoutubeHttpRequest = {
    _KEY:   'AIzaSyCLOMb2UTyHYC6e_KzmhltRgfeFyqVrkPY',
    SEARCH: 'https://www.googleapis.com/youtube/v3/search',
    VIDEOS: 'https://www.googleapis.com/youtube/v3/videos',
    WATCH:  'https://www.youtube.com/watch',
}

export {
    ConstVideoSurface,
    MouseEventState,
    MediaInfo,
    YoutubeHttpRequest,
}

