'use strict';

import { getYoutubeRequestUrl } from '../../subsidiaryFunctions';

export default function makeYoutubeSearchRequest(searchItem, settings, handler) {
    fetch(getYoutubeRequestUrl(settings))
        .then((res) => res.json())
        .then(data => makeResponseEvent(searchItem, data))
        .then(handler)
        .catch(console.log);
}


function makeResponseEvent(searchItem, data) {
    const responseEvent = new CustomEvent(
        'response', {
            detail: data
        }
    );

    searchItem.dispatchEvent(responseEvent);

    return data;
}