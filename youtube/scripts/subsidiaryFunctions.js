'use strict';

import { MediaInfo } from './constants';

// subsidiary functions
export function toStringViewportWidth(number) {
    return `${number}vw`;
}

export function toStringPx(number) {
    return `${number}px`;
}

export function getTransformTranslate3DString(x, y, z) {
    return `translate3d(${x}, ${y}, ${z})`;
}

export function getCalcString(args) {
    return args.join('');
}

export function getPointObj(x, y) {
    return { x, y };
}

export function getYoutubeRequestUrl(reqSettings) {
    const requestBaseUrl = `${ reqSettings.httpRequest }?`;
    
    const { settings } = reqSettings;
    const requestExpr = [];
    for (let key in settings) {
        requestExpr.push(`${key}=${settings[key]}`);
    }
    
    return requestBaseUrl.concat(requestExpr.join('&'));
}

export function getCurrentBreakPointName() {
    const windowWidthInVW = document.documentElement.clientWidth;

    if (windowWidthInVW < MediaInfo.xsm.maxWidth) {
        return MediaInfo.xsm.name;
    }

    if (windowWidthInVW < MediaInfo.sm.maxWidth) {
        return MediaInfo.sm.name;
    }
    
    if (windowWidthInVW < MediaInfo.md.maxWidth) {
        return MediaInfo.md.name;
    }

    return MediaInfo.neutral.name;
}

export function getCountOfNavPageTargets(navPageTargetsContainer) {
    return navPageTargetsContainer.childElementCount;
}

// DMY - Day Month Year
export function fromISOtoDMYFormat(delim, isoStringDate) {
    return isoStringDate.substring(0, 10)
                        .split('-')
                        .reverse()
                        .join(delim);
}

export function createElementFromHtml(html) {
    const item = document.createElement('div');
    
    item.innerHTML = html;

    return item.firstChild;
}