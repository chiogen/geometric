import { ImmutablePoint, Point } from '../types.js';

export function pointClone(point: ImmutablePoint): Point {
    return [point[0], point[1]];
}