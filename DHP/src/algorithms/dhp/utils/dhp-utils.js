import {get} from '../../../utils/common-utils.js';

export function getLPath(vectors) {
    return vectors.map(
        ([array, countOfMinIndexes]) => getAbsMax(array, countOfMinIndexes)
    );
}

function getAbsMax(array, countOfMin) {
    const TUPLE = {
        FIRST: 0,
    };

    const [_first, _second] = [
        TUPLE.FIRST,
    ].map((bindNumber) => get.bind(null, bindNumber));

    return array
        .map((item, index) => [item, index])
        .sort((a, b) => Math.abs(_first(a)) - Math.abs(_first(b)))
        .slice(-countOfMin);
}

// cas
export function cas(n, v, N) {
    const res = (2 * Math.PI * n * v) / N;
    return Math.sin(res) + Math.cos(res);
}

// Прямое преобразование ДПХ
export function directProccess(collection) {
    let result = [];
    let N = collection.length;

    for (let v = 0; v < N; v++) {
        let currentG = collection.reduce((acc, g_n, n) => {
            return acc + g_n * cas(n, v, N);
        }, 0);   

        result.push(currentG);
    }

    return result;
}

// Обратное преобразование ДПХ
export function inverseProccess(collection) {
    let result = [];
    let N = collection.length;

    for (let n = 0; n < N; n++) {
        let currentG = collection.reduce((acc, g_v, v) => {
            return acc + g_v * cas(n, v, N);
        }, 0);   

        result.push(currentG / N);
    }

    return result;
}

export function restoreError(collectionBefore, collectionAfter) {
    let sum = 0;    
    const N = collectionBefore.length;
    const COORD = {
        X: 0,
        Y: 1
    }; 

    for (let x = 0; x < N; x++) {
        for (let y = 0; y < N; y++) {
            const subX = 
                collectionAfter[x][COORD.X] - collectionBefore[x][COORD.X];
            const subY = 
                collectionAfter[y][COORD.Y] - collectionBefore[y][COORD.Y];
            sum += Math.pow(subX * subX + subY * subY, 2);
        }
    }

    return Math.sqrt(sum / 2*N);
}