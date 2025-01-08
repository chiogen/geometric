export type Point = [number, number];
/** Not "really" immutable. Just typescript wont allow you to make changes to it. */
export type ImmutablePoint = readonly [number, number];
export type Line = [Point, Point];
/** Not "really" immutable. Just typescript wont allow you to make changes to it. */
export type ImmutableLine = readonly [ImmutablePoint, ImmutablePoint];
export type Polygon = Point[];
/** Not "really" immutable. Just typescript wont allow you to make changes to it. */
export type ImmutablePolygon = readonly ImmutablePoint[];