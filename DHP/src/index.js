import Dhp from './algorithms/dhp/dhp.js';
import ViewPane from './components/paint-view/view-pane/view-pane.js';
import Table from './components/table/table.js';

const pointsInput = document.querySelector('#points-input');
const mxRange = document.querySelector('#mx-range');
const myRange = document.querySelector('#my-range');

mxRange.min = 0;
mxRange.max = 0;
myRange.min = 0;
myRange.max = 0;

pointsInput.addEventListener('input', () => {
	const points = getPointsFromInput(pointsInput); 
	// [[1,2],[1,3],[1,4],[2,5],[3,6],[4,7],[5,7],[6,6],[7,5],[7,4],[7,3],[6,2],[5,1],[4,1],[3,1],[2,1]]
	// home [[12,12],[11,12],[10,12],[9,12],[8,12],[7,12],[6,12],[5,12],[4,12],[3,12],[2,12],[1,12],[1,11],[1,10],[1,9],[1,8],[1,7],[1,6],[1,5],[1,4],[1,3],[1,2],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[12,2],[12,3],[12,4],[12,5],[12,6],[12,7],[12,8],[12,9],[12,10],[12,11], [12,12],[11,13],[11,14],[11,15],[11,16],[11,17],[11,18],[10,18],[10,17],[10,16],[10,15],[10,14],[9,15],[8,16],[7,17],[7,18],[6,17],[5,16],[4,15],[3,14],[2,13],[1, 12]]
	mxRange.max = points.length;
	myRange.max = points.length;
	update(points);
});

mxRange.addEventListener('input', (event) => {
	const range = event.target;
	const options = {
		dhpOptions: {
			signs: {Mx: range.value}
		}
	};
	console.log('Mx: ' + range.value);
	const points = getPointsFromInput(pointsInput);
	update(points, options);
});

myRange.addEventListener('input', (event) => {
	const range = event.target;
	const options = {
		dhpOptions: {
			signs: {My: range.value}
		}
	};
	console.log('My: ' + range.value);
	const points = getPointsFromInput(pointsInput);
	update(points, options);
});

function update(points, options = {}) {
	const defaultDhpOptions = {signs: {Mx: points.length, My: points.length}};

	// Draw matrix for CAS function
	const precision = 2;
	const tableId = 'table';
	const casTable = Dhp.casTable(points.length);

	updateTable(tableId, cutTableValues(casTable, precision));

	// Original path
	const viewPane = new ViewPane('area-before', points);
	viewPane.draw();

	//DHP with loss
	const dhpOptions = options.dhpOptions || defaultDhpOptions;
	const withLossSigns = Object.assign(
		{Mx: mxRange.value, My: myRange.value},
		dhpOptions.signs
	);

	const dhpWithLossOptions = Object.assign(
		{}, 
		defaultDhpOptions,
		{signs: withLossSigns} // dhp options from range controls
	);
	
	const {result: unzippedPoints} = makeDhpComputations(points, dhpWithLossOptions);
	drawPoints('area-after', unzippedPoints);

	// Show restore error
	showRestoreError(points, unzippedPoints);
}

function makeDhpComputations(
	points,
	dhpOptions
) {
	const zippedResult = Dhp.zip(points, dhpOptions);
	return Dhp.unzip(zippedResult);
}

function cutTableValues(table, precision) {
	return table.map((row) => row.map((value) => value.toFixed(precision)));
}

function drawPoints(
	canvasId,
	points
) {
	const dhpViewPane = new ViewPane(canvasId, points);
	dhpViewPane.draw();
}

function updateTable(tableId, tableData) {
	const table = new Table(tableData);
	const tableNode = table.tableNode;
	const targetPlace =	document.querySelector(`#${tableId}`);
	
	targetPlace.innerHTML = '';
	targetPlace.appendChild(tableNode);
}

function getPointsFromInput(input) {
	try {
		const points = JSON.parse(input.value);
		return (points instanceof Array)? points : [];
	} catch(e) {
		return [];
	}
}

function showRestoreError(collectionBefore, collectionAfter) {
	const restoredCoef = Dhp.restoreError(collectionBefore, collectionAfter);

	document
		.querySelector('#coef-error')
		.innerHTML = `${restoredCoef}`;
}