import { lineInterpolate } from "../lines/lineInterpolate.js";
import { ImmutablePolygon, Point, Polygon } from '../types.js';
import { polygonBounds } from "./polygonBounds.js";

export function polygonReflectX(polygon: ImmutablePolygon, reflectFactor = 1): Polygon {
  const [[min, _], [max, __]] = polygonBounds(polygon)!;

  return polygon.map(([x, y]): Point => {
    const r: Point = [min + max - x, y];

    if (reflectFactor === 0) {
      return [x, y];
    }
    else if (reflectFactor === 1) {
      return r;
    }
    else {
      const t = lineInterpolate([[x, y], r]);
      return t(Math.max(Math.min(reflectFactor, 1), 0));
    }
  });
}