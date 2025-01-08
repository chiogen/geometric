import { ImmutablePoint } from '../types.js';

export function pointEquals(left: ImmutablePoint, right: ImmutablePoint): boolean {
    return left[0] === right[0] && left[1] === right[1];
}

export function pointEqualsZero(point: ImmutablePoint): boolean {
    return point[0] === 0 && point[1] === 0;
}