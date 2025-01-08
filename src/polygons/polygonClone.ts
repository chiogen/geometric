import { pointClone } from '../points/pointClone.js';
import { ImmutablePolygon, Polygon } from '../types.js';

export function polygonClone(polygon: ImmutablePolygon): Polygon {
    return polygon.map(pointClone);
}