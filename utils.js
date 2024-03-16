/**
 * Performs linear interpolation between two numbers.
 *
 * @param {number} A - The first number.
 * @param {number} B - The second number.
 * @param {number} t - The interpolation factor. When t=0, the function returns A. When t=1, it returns B. For values of t between 0 and 1, the function returns a number between A and B.
 * @returns {number} - The interpolated value between A and B based on t.
 *
 * @example
 * // returns 30
 * linearInterpolation(10, 50, 0.5);
 */
function linearInterpolation(A, B, t) {
    return A + (B - A) * t;
}

/**
 * Calculates the intersection point of two line segments AB and CD.
 *
 * @param {Object} A - The start point of the first line segment, with properties x and y.
 * @param {Object} B - The end point of the first line segment, with properties x and y.
 * @param {Object} C - The start point of the second line segment, with properties x and y.
 * @param {Object} D - The end point of the second line segment, with properties x and y.
 * @returns {Object|null} - If the line segments intersect, returns an object with properties x and y representing the intersection point, and offset representing the normalized distance from A to the intersection point along the line segment AB. If the line segments do not intersect, returns null.
 *
 * @example
 * // returns {x: 0.5, y: 0.5, offset: 0.5}
 * getIntersection({x: 0, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}, {x: 1, y: 0});
 */
function getIntersection(A, B, C, D) {
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

    if (bottom != 0) {
        const t = tTop / bottom;
        const u = uTop / bottom;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return {
                x: linearInterpolation(A.x, B.x, t),
                y: linearInterpolation(A.y, B.y, t),
                offset: t
            }
        }
    }

    return null;
}

function polygonIntersect(polygonA, polygonB) {
    for (let i = 0; i < polygonA.length; i++) {
        for (let j = 0; j < polygonB.length; j++) {
            const intersection = getIntersection(
                polygonA[i],
                polygonA[(i + 1) % polygonA.length],
                polygonB[0],
                polygonB[(j + 1) % polygonB.length]
            );
            if (intersection) {
                return intersection;
            }
        }
    }
    return null;
}