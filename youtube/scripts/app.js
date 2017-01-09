'use strict';

import { 
    ConstVideoSurface, 
    YoutubeHttpRequest
} from './constants';

import { getCountOfPages } from './pages/info';
import { 
    getPointObj,
    getCurrentBreakPointName,
} from './subsidiaryFunctions';

import VideoSurfaceTouchEventHandler from './video-surface/events/touchEventHandler';
import VideoSurfaceMouseEventHandler from './video-surface/events/mouseEventHandler';
import makeYoutubeSearchRequest from './query/search/request';
import searchRequestHandler from './query/search/requestHandler';
import { 
    updateView,
    updateNavPages, 
} from './view/update';
import buildBaseHtmlStructure from './view/builder/baseStructure';

buildBaseHtmlStructure(document.querySelector('body'));

const videoSurface = document.querySelector('#video-surface');

// object which stores coordinates for first and last touching
const startEndPoints = {
    START: getPointObj(0, 0),
    END: getPointObj(0, 0),
}

const initState = {
    rewindingStepInVW: ConstVideoSurface.REWINDING_STEP_IN_VW,
    currLeftPosForSurfaceInVW: ConstVideoSurface.CURRENT_LEFT_POS_FOR_VIDEO_BOARD_IN_VW,
    startEndPoints: {
        start: startEndPoints.START,
        end:   startEndPoints.END,
    },
}

// VIDEO SURFACE

// Touch

const touchEventHandler = new VideoSurfaceTouchEventHandler(initState)

// add listener for touch events
videoSurface.addEventListener('touchstart', touchEventHandler.touchStartHandler);
videoSurface.addEventListener('touchmove',  touchEventHandler.touchMoveHandler);
videoSurface.addEventListener('touchend',   touchEventHandler.touchEndHandler);

// Mouse

const mouseEventHandler = new VideoSurfaceMouseEventHandler(initState)

// add listener for touch events
videoSurface.addEventListener('mousedown', mouseEventHandler.mouseDownHandler);
videoSurface.addEventListener('mousemove', mouseEventHandler.mouseMoveHandler);
videoSurface.addEventListener('mouseup',   mouseEventHandler.mouseUpHandler);

// SEARCH

const searchItem = document.querySelector('#search');
let DefaultSearchRequestSettings = {
    httpRequest: YoutubeHttpRequest.SEARCH,
    settings: {
        key:         YoutubeHttpRequest._KEY,
        part:        'snippet',
        type:        'video',
        maxResults:  15,
    }
}

// Keyboard

searchItem.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        // clear old videos
        videoSurface.innerHTML = '';
        document
            .querySelector('#nav-pages')
            .querySelector('.nav-pages-container').innerHTML = '';

        const searchSettings = { ...DefaultSearchRequestSettings };
        searchSettings.settings.q = searchItem.value || 'javascript';

        makeYoutubeSearchRequest(
            event.currentTarget, 
            searchSettings, 
            searchRequestHandler(videoSurface)
        );
    }
});

// OTHER EVENTS

// searchItem.addEventListener('response'...
// chanches this variable
let nextPageToken = '';

// Responses
searchItem.addEventListener('response', function(event) {
    nextPageToken = event.detail.nextPageToken;
});

let currentPageAfterLoad = 0;

// Rewinding
videoSurface.addEventListener('rewindright', function(event) {
    if (currentPageAfterLoad < ConstVideoSurface.COUNT_OF_PAGE_TURNING) {
        currentPageAfterLoad++;        
    } else {
        currentPageAfterLoad = 0;

        const searchSettings = { ...DefaultSearchRequestSettings };
        searchSettings.settings.nextPageToken = nextPageToken;

        makeYoutubeSearchRequest(
            event.currentTarget,
            searchSettings,
            searchRequestHandler(videoSurface)
        );
    }

    updateView(event.detail);
});

videoSurface.addEventListener('rewindleft', function(event) { 
    updateView(event.detail);
});

videoSurface.addEventListener('rewindmove', function(event) { 
    updateView(event.detail);
});

// breakpoint detector
window.addEventListener('resize', breakPointDetector(getCurrentBreakPointName()));

function breakPointDetector(currentBreakPointName) {
    return (e) => {
        const breakPointName = getCurrentBreakPointName();
        
        if (currentBreakPointName !== breakPointName) {
            currentBreakPointName = breakPointName;

            const breakPointEvent = new CustomEvent('breakpointchange', {
                detail: breakPointName,
            });

            videoSurface.dispatchEvent(breakPointEvent);
        }
    }
}

videoSurface.addEventListener('breakpointchange', function(event) {
    document
        .querySelector('#nav-pages')
        .querySelector('.nav-pages-container').innerHTML = '';

    updateNavPages({ 
        surface: event.currentTarget,
        settings: {
            rewindingStep: {
                value: ConstVideoSurface.REWINDING_STEP_IN_VW,
                units: 'vw',
            }
        }
    });
});