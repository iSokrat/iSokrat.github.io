export function fromPointsToVectors(points) {
    let coordinateVectors = [[], []];

    return points.reduce((acc, point) => {
        const [X, Y] = [0, 1];
            
        acc[X].push(point[X])
        acc[Y].push(point[Y])
            
        return acc;
    }, coordinateVectors);
}

export function fromVectorsToPoints(vectors) {
    let result = [];
    let length = vectors[0].length;

    for (let i = 0; i < length; i++) {
        result.push(vectors.map((vector) => vector[i]));
    }

    return result;
}

export function scalePoints(points = [[]], scaleX = 1, scaleY = 1) {
	return points.map(([x, y]) => [x * scaleX, y * scaleY]);
};

export function get (i, array = [[]]) {
    return array[i];
}