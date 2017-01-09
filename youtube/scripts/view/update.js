'use strict';

import { getCountOfPages } from '../pages/info';

import { 
    getCountOfNavPageTargets, 
    getTransformTranslate3DString, 
} from '../subsidiaryFunctions';

import { getNavPageTargetElement } from './builder/navPages';

/* settings {
        rewindingStep {
            value,
            units
        },
        surfaceTransformXPos {
            value,
            units
        },
   }
*/
function updateView({ surface, settings }) {
    updateNavPages({ surface, settings });

    if (settings === undefined) {
        return;
    }

    if (settings.rewindingStep !== undefined) { 
        surface.style.width = 
            `${settings.rewindingStep.value * getCountOfPages(surface)}${settings.rewindingStep.units}`;
    }

    if (settings.surfaceTransformXPos !== undefined) {
        surface.style.transform = getTransformTranslate3DString(
            `${settings.surfaceTransformXPos.value}${settings.surfaceTransformXPos.units}`,
            '0px',
            '0px'
        );
    }
}

function updateNavPages({ surface, settings }) {
    const navPagesTargetsContainer = document
        .querySelector('#nav-pages')
        .querySelector('.nav-pages-container');

    const countOfPages = getCountOfPages(surface);
    const oldCountOfNavPageTargets = getCountOfNavPageTargets(navPagesTargetsContainer);

    for (let pageNumber = oldCountOfNavPageTargets + 1; pageNumber < countOfPages; pageNumber++) {
        const navPageTarget = getNavPageTargetElement(pageNumber);

        navPageTarget.addEventListener('click', addNavPageTargetsHandler(
            surface, 
            pageNumber - 1, // numbering beginning from 0
            settings.rewindingStep)
        );

        navPagesTargetsContainer.appendChild(navPageTarget);
    }
}

function addNavPageTargetsHandler(surface, pageNumber, rewindingStep) {
    return (e) => {
        surface.style.transform = getTransformTranslate3DString(
            `${-rewindingStep.value * pageNumber}${rewindingStep.units}`,
            '0px',
            '0px'
        );
    }
}

export {
    updateView,
    updateNavPages,
};