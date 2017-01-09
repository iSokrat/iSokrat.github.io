'use strict';

import { getVideoBoardElement } from '../../view/builder/videoSurface';
import { updateNavPages } from '../../view/update';
import { 
    YoutubeHttpRequest, 
    ConstVideoSurface, 
}   from '../../constants';
import { 
    fromISOtoDMYFormat,
    getYoutubeRequestUrl,
} from '../../subsidiaryFunctions';


export default function requestHandler(surface) {
    // return handler
    return (data) => {
        for (let video of data.items) {
            const videoRequestUrl = getYoutubeRequestUrl({
                httpRequest: YoutubeHttpRequest.VIDEOS,
                settings: {
                    part: 'statistics',
                    key:   YoutubeHttpRequest._KEY,
                    id:    video.id.videoId, 
                }
            });

            fetch(videoRequestUrl)
                .then(res => res.json())
                .then((videoData) => {                    
                    const videoBoard = getVideoBoardElement({
                        videoName:        video.snippet.title,
                        countOfViews:     videoData.items[0].statistics.viewCount,
                        creationDate:     fromISOtoDMYFormat('.', video.snippet.publishedAt),
                        videoDescription: video.snippet.description,
                        altForImage:      "previewImage",
                        imageSet:         video.snippet.thumbnails,
                        urlToOriginalPage: {
                            httpRequest: YoutubeHttpRequest.WATCH,
                            settings: {
                                v: video.id.videoId,

                            }
                        },
                    });

                    surface.appendChild(videoBoard);
                    
                    updateNavPages({ 
                        surface, 
                        settings: {
                            rewindingStep: {
                                value: ConstVideoSurface.REWINDING_STEP_IN_VW,
                                units: 'vw',
                            }
                        }
                     });
                }).catch(console.log);
        }
    }
}