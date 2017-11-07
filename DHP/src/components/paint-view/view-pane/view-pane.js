import {CANVAS} from '../configs/common-config.js';
import Draw from '../utils/draw-utils.js';
import {scalePoints} from '../../../utils/common-utils.js';

export default class ViewPane {
	constructor(canvasId, points = [], options = CANVAS) {
		const canvas = document.getElementById(canvasId);
		this.canvas = canvas
		this.points = points;
		this.options = options;
	}

	draw() {
		const {options, points, canvas} = this;
		const paneScale = options.POINT.SCALE;
		const canvasContext = canvas.getContext('2d');
		const scaledPoints = scalePoints(points, paneScale.X, paneScale.Y);

		canvas.width = options.WIDTH;
		canvas.height = options.HEIGHT;
		
		// transform system coordinate to Decart coordinate
		// system
		canvasContext.translate(0, options.HEIGHT);
		canvasContext.scale(1, -1);

		canvasContext.fillStyle = options.FILL_COLOR;
		canvasContext.strokeRect(0, 0, options.WIDTH, options.HEIGHT); 
	
		Draw.drawPath(canvasContext, scaledPoints);
	}
}