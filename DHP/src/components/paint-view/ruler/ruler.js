import {PLACEMENT} from './configs/common-config.js';

export default class Ruler {
	constructor(options = {}) {
		this.options = options;
	}

	draw(canvas) {
		const {
			rulerLength = 0, // px
			gapBetweenSegment = 0, // px
			segmentLength = 0,
			placement = PLACEMENT.TOP;
		} = this.options;
		const countOfGabs = (rulerLength / gapBetweenSegment) + 1;

		for (let currentSegment = 0; currentSegment < countOfGabs; currentSegment++) {
		}
	}

	_drawLine(canvas) {

	}
}