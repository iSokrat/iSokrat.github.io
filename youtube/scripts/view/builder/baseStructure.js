import { createElementFromHtml } from '../../subsidiaryFunctions';
import { getSearchInputElement } from './searchPanel';
import { getVideoSurfaceElement } from './videoSurface';
import { 
    getNavPageContainerElement,
    getNavPageTargetContainerElement,
} from './navPages';

function getHeaderElement() {
    return createElementFromHtml(
        `<header class="wrapper header">
         </header>
        `
    );
}

function getMainElement() {
    return createElementFromHtml(
        `<main class="wrapper content bottom-place">
         </main>`
    );
}

function getFooterElement() {
    return createElementFromHtml(
        `<footer class="wrapper footer">
         </footer>`
    );
}

export default function buildBaseHtmlStructure(root) {
    const header = getHeaderElement();
    header.appendChild(getSearchInputElement());
    root.appendChild(header);

    const main = getMainElement();
    main.appendChild(getVideoSurfaceElement());
    root.appendChild(main);
    
    const footer = getFooterElement();
    
    const navPageContainer = getNavPageContainerElement();
    navPageContainer.appendChild(getNavPageTargetContainerElement());
    
    footer.appendChild(navPageContainer);
    
    root.appendChild(footer);
}