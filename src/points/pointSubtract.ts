import { ImmutablePoint, Point } from '../types.js';

export function pointSubtract(left: ImmutablePoint, right: ImmutablePoint): Point {
    return [
        left[0] - right[0],
        left[1] - right[1]
    ];
}