import { ImmutableLine, ImmutablePolygon, Line } from '../types.js';
import { isClosed } from '../utils/closePolygon.js';

export function* iteratePolygonSegments(polygon: ImmutablePolygon, close = false): Generator<ImmutableLine> {

    for (let i = 0; i < polygon.length - 1; i++)
        yield [polygon[i], polygon[i + 1]];

    if (close && !isClosed(polygon))
        yield [polygon[polygon.length - 1], polygon[0]];

}