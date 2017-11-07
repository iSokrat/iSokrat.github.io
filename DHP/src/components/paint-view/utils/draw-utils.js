import {CANVAS} from '../configs/common-config.js';

function drawPath(canvasContext, points = [], options = CANVAS) {
    canvasContext.lineWidth = options.LINE_WIDTH;
    canvasContext.strokeStyle = options.LINE_COLOR;

    canvasContext.beginPath();
    points.forEach((points) => {
      canvasContext.lineTo(...points);
    });
    canvasContext.stroke();
};
  
export default {
  drawPath
};