// Returns the angle of reflection given an angle of incidence and a surface angle.
export function angleReflect(incidenceAngle: number, surfaceAngle: number): number {
  return (surfaceAngle * 2 - incidenceAngle % 360 + 360) % 360;
}