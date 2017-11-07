import * as DhpUtils from './utils/dhp-utils.js';
import * as CommonUtils from '../../utils/common-utils.js';

export default class Dhp {
    static zip(points, options = {}) {
        let {Mx = 0, My = 0} = options.signs;
        
        let [x, y] = CommonUtils.fromPointsToVectors(points);

        // get first processed X and Y vectors
        let [directProcessedX, directProcessedY] = [x, y].map(DhpUtils.directProccess);

        // get [M] indexes for each vector for which values has the max absolute value
        let [zippedX, zippedY] = 
            DhpUtils.getLPath([
                [directProcessedX, Mx],
                [directProcessedY, My]
            ]);

        return {
            zippedX: {
                data: zippedX,
                originalLength: x.length
            },
            zippedY: {
                data: zippedY,
                originalLength: y.length
            },
        }
    }

    static unzip({zippedX, zippedY}) {
        const setUnzippedValues = (collection, value, index) => {
            const ZIP_VALUE = 0;
            const ZIP_INDEX = 1;

            for (let i = 0; i < collection.length; i++) {
                if (collection[i][ZIP_INDEX] === index) {
                    return collection[i][ZIP_VALUE];
                }
            }

            return 0;
        };  
        const makeRestored = (length, callback) => Array.from({length}, callback);

        // get only items are valuable. Other set to 0
        let [restoredUnzippedX, restoredUnzippedY] = [
            makeRestored(zippedX.originalLength, setUnzippedValues.bind(null, zippedX.data)),
            makeRestored(zippedY.originalLength, setUnzippedValues.bind(null, zippedY.data)),
        ];

        let [restoredX, restoredY] = [restoredUnzippedX, restoredUnzippedY]
            .map(DhpUtils.inverseProccess)

        let restoredPoints = CommonUtils.fromVectorsToPoints([restoredX, restoredY]);
        
        return {
            result: restoredPoints
        }
    }

    static casTable(collectionLength) {
        let result = [];
        let N = collectionLength;

        for (let v = 0; v < N; v++) {
            const row = [];

            for(let n = 0; n < N; n++) {
                const item = DhpUtils.cas(n, v, N);
                row.push(item);
            }

            result.push(row);
        }

        return result;
    }

    static restoreError(collectionBefore, collectionAfter) {
        return DhpUtils.restoreError(collectionBefore, collectionAfter);
    }
}