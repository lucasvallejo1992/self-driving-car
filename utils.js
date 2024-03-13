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