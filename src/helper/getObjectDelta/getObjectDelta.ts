/**
 * Find the difference between two objects.
 */

export const getObjectDelta = <T extends object>(a: T, b: Partial<T>): Partial<T> => {

    // if a and b have no entries we have no delta
    if (Object.keys(a).length === 0 && Object.keys(b).length === 0) {
        return {};
    }

    // if a or b is not an object we have a delta
    if (typeof a !== 'object' || typeof b !== 'object') {
        return b;
    }

    let delta = {};

    Object.keys(b).forEach((key) => {

        // if key is not in a we have a delta
        if (!Object.keys(a).includes(key)) {
            delta = { ...delta, [key]: b[key as keyof object] };
            return;
        }

        // assumption: b[key] is an array
        if (Array.isArray(b[key as keyof object])) {

            // if a[key] is not an array we have a delta
            if (!Array.isArray(a[key as keyof object])) {
                delta = { ...delta, [key]: b[key as keyof object] };
                return;
            }

            // create arrays (for TS types to be correct)
            const aArray = a[key as keyof object] as [];
            const bArray = b[key as keyof object] as [];

            // if both arrays are empty we have no delta
            if (aArray.length === 0 && bArray.length === 0) {
                delta = { ...delta };
                return;
            }

            // if array length is different we have a delta
            if (aArray.length !== bArray.length) {
                delta = { ...delta, [key]: b[key as keyof object] };
                return;
            }

            // create array for deltas
            const arrayDeltas: [] = [];

            bArray.forEach((entry, index) => {
                // getObjectDelta in array
                const inArrayDelta = getObjectDelta(aArray[index], bArray[index]);

                // if inArrayDelta has more then 0 entries we have a delta
                if (Object.keys(inArrayDelta).length) {
                    arrayDeltas.push(bArray[index]);
                }
            });

            // if arrayDeltas has more than 0 entries we have a delta
            if (Object.keys(arrayDeltas).length) {
                delta = { ...delta, [key]: arrayDeltas };
                return;
            }


            return;
        }

        // assumption: b[key] is an object
        if (typeof b[key as keyof object] === 'object') {

            // if a[key] is not an object we have a delta
            if (typeof a[key as keyof object] !== 'object') {
                delta = { ...delta, [key]: b[key as keyof object] };
                return;
            }

            // recursive: find objectDelta in a and b
            const objectDelta = getObjectDelta(a[key as keyof object], b[key as keyof object]);

            // if objectDelta has more than 0 entries we have a delta
            if (Object.keys(objectDelta).length) {
                delta = { ...delta, [key]: objectDelta };
                return;
            }
        }

        // if a[key] is not equal to b[key] we have a delta
        if (a[key as keyof object] !== b[key as keyof object]) {
            delta = { ...delta, [key]: b[key as keyof object] };
        }
    });

    return delta;
}