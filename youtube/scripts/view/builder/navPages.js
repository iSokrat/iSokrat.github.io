'use strict';

import { createElementFromHtml } from '../../subsidiaryFunctions';

export function getNavPageTargetElement(number) {
    return createElementFromHtml(
        `<a href="#">${number}</a>`
    );
}

export function getNavPageContainerElement() {
    return createElementFromHtml(
        `<nav id='nav-pages' class="nav-pages h-align-block-center" aria-label="Page navigation">
        </nav>`
    );
}

export function getNavPagePrevElement() {
    return createElementFromHtml(
        `<a class="nav-pages-prev" aria-label="Previews" href="#">
            <span aria-hidden="true">&laquo;</span>
        </a>`
    );
}

export function getNavPageTargetContainerElement() {
    return createElementFromHtml(
        `<div class="nav-pages-container">
         </div>`
    );
}

export function getNavPageNextElement() {
    return createElementFromHtml(
        `<a class="nav-pages-next" aria-label="Next" href="#">
            <span aria-hidden="true">&raquo;</span>
        </a>`
    );
}
