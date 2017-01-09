'use strict';

import { 
    getYoutubeRequestUrl,
    createElementFromHtml
} from '../../subsidiaryFunctions';

function getPreviewImageHtml(setImages, alt) {
    return `<img class="video-board-preview"
                 src="${ setImages.default.url }"
                 srcset="${ setImages.medium.url } 1x, ${ setImages.high.url } 2x"
                 alt="${ alt }">`;
}

export function getVideoBoardElement({
    videoName,
    countOfViews,
    creationDate,
    videoDescription,
    altForImage,
    imageSet,
    urlToOriginalPage
}) {   
    return createElementFromHtml(
        `<div class="column-lg-3 column-md-4 column-sm-6 column-xsm-12">
            <div class="video video-board" 
                 ondrag="return false" 
                 ondragdrop="return false" 
                 ondragstart="return false">
                <div class="video-board-preview">
                   ${ getPreviewImageHtml(imageSet, altForImage) }
                </div>
                <div class="video-board-info">
                    <h3 class="video-name">
                        <a href="${ getYoutubeRequestUrl(urlToOriginalPage) }" target="_blank">${ videoName }</a>
                    </h3>
                    <ul class="fa-ul video-info-list">
                        <li>
                            <span class="fa-li fa fa-calendar-o fa-lg" aria-hidden="true"></span>
                            <b>${ creationDate }</b>
                        </li>
                        <li>    
                            <span class="fa-li fa fa-eye fa-lg" aria-hidden="true"></span>
                            <b>${ countOfViews }</b>
                        </li>
                    </ul>
                    <p class="video-description">
                        ${ videoDescription }
                    </p>
                </div>
            </div>
        </div>`
    );
}

export function getVideoSurfaceElement() {
    return createElementFromHtml(
        `<div id="video-surface" class="wrap-row wrap-row-v-extension">
         </div>`
    );
}