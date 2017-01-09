'use strict';

import { MouseEventState } from '../../constants';
import { 
    getCountOfVideoCardsOnPage,
    getCountOfPages,
} from '../../pages/info';

import {
    toStringViewportWidth,
    toStringPx,
    getPointObj,
    getCalcString,
} from '../../subsidiaryFunctions';

export default function TouchEventHandler(settings) {
    const {
        startEndPoints,
        rewindingStepInVW,
    } = settings;

    let {
        currLeftPosForSurfaceInVW,
    } = settings;

    // handler for touchstart event
    const touchStartHandler = (e) => {
        // registration start touch position
        startEndPoints.start = getPointObj(
            e.targetTouches[0].clientX,
            e.targetTouches[0].clientY
        );
    }

    // handler for touchmove event
    const touchMoveHandler = e => {
        const leftPos = toStringViewportWidth(currLeftPosForSurfaceInVW);
        const startPointXString = toStringPx(startEndPoints.start.x);
        const currentPointXString = toStringPx(e.changedTouches[0].clientX);

        const calcXString = `calc(
            ${leftPos} -
            (${startPointXString} - ${currentPointXString})
        )`;

        const captureRewindEvent = new CustomEvent('rewindmove', {
            detail: {
                surface: e.currentTarget,
                settings: {
                    surfaceTransformXPos: {
                        value: calcXString, 
                        units: '',
                    },
                    rewindingStep: {
                        value: rewindingStepInVW,
                        units: 'vw',
                    }   
                }
            },
        });

        e.currentTarget.dispatchEvent(captureRewindEvent);
    }

    // handler for touchend event
    const touchEndHandler = (e) => {
        // registration end touch position
        startEndPoints.end = getPointObj(
            e.changedTouches[0].clientX,
            e.changedTouches[0].clientY
        );
        
        handlePath(startEndPoints, e.currentTarget);
    }

    // handle ended touching actions on touchedSurface.
    // make rewind based on { start, end } object.
    const handlePath = ({
        start,
        end
    }, surface) => {
        const leftBoundary = 0;
        const rightBoundary = 
            getCountOfPages(surface)
            * rewindingStepInVW
            - rewindingStepInVW;

        const horizontalDistance = end.x - start.x;
        
        if (horizontalDistance > 0) {
            // if current page is first then forbid rewinding to left
            if (Math.abs(currLeftPosForSurfaceInVW) <= leftBoundary) {
                rewindToRight(0, surface); // return to the initial state
                return; 
            }

            rewindToLeft(1, surface); // console.log("RIGHT");
            return;
        }

        if (horizontalDistance < 0) {
            // if current page is last then forbid rewinding to right
            if (Math.abs(currLeftPosForSurfaceInVW) >= rightBoundary) {
                rewindToLeft(0, surface); // return to the initial state
                return;
            }

            rewindToRight(1, surface);  // console.log("LEFT");
            return;
        }

        //update current position
        rewindToRight(0, surface);
    }

    const rewindToLeft = (toPageNumber, surface) => {
        if (toPageNumber !== 0) {
            currLeftPosForSurfaceInVW += toPageNumber * rewindingStepInVW;
        }

        const leftRewindEvent = new CustomEvent('rewindleft', {
            detail: {
                surface: surface,
                settings: {
                    surfaceTransformXPos: {
                        value: currLeftPosForSurfaceInVW, 
                        units: 'vw',
                    },
                    rewindingStep: {
                        value: rewindingStepInVW,
                        units: 'vw',
                    }   
                },
            }
        });

        surface.dispatchEvent(leftRewindEvent);
    }

    const rewindToRight = (toPageNumber, surface) => {
        if (toPageNumber !== 0) {
            currLeftPosForSurfaceInVW -= toPageNumber * rewindingStepInVW;
        }

        const rightRewindEvent = new CustomEvent('rewindright', {
            detail: {
                surface: surface,
                settings: {
                    surfaceTransformXPos: {
                        value: currLeftPosForSurfaceInVW, 
                        units: 'vw',
                    },
                    rewindingStep: {
                        value: rewindingStepInVW,
                        units: 'vw',
                    }   
                },
            }
        });

        surface.dispatchEvent(rightRewindEvent);
    }

    return {
        touchStartHandler,
        touchMoveHandler,
        touchEndHandler,
    }
}