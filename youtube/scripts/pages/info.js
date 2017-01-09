'use strict';

import { 
    MediaInfo,

} from '../constants';
import { getCurrentBreakPointName } from '../subsidiaryFunctions';

function getCountOfVideoCardsOnPage() {
    const bp = getCurrentBreakPointName();

    switch(bp) {
        case MediaInfo.xsm.name: return 1;
        case MediaInfo.sm.name:  return 2;
        case MediaInfo.md.name:  return 3;
        default: return 4;
    }
}

function getCountOfVideos(surface) {
    return surface.childElementCount;
}

function getCountOfPages(surface) {
    return Math.ceil(
        getCountOfVideos(surface) / getCountOfVideoCardsOnPage()
    );
}

export {
    getCountOfVideoCardsOnPage,
    getCountOfVideos,
    getCountOfPages,
}