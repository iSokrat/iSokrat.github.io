import { createElementFromHtml } from '../../subsidiaryFunctions';

export function getSearchInputElement() {
    return createElementFromHtml(
        `<input id="search" 
                class="input input-search h-align-block-center" 
                type="text" 
                placeholder="Search videos...">`
    )
}

