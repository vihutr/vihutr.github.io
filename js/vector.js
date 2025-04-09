export function vAdd(v1, v2) { return [v1[0] + v2[0], v1[1] + v2[1]] }
export function vSubtract(v1, v2) { return [v1[0] - v2[0], v1[1] - v2[1]] }
export function vMultiply(v, s) { return [v[0] * s, v[1] * s] }
export function vLength(v) { return Math.sqrt(v[0] * v[0] + v[1] * v[1]) }
export function vNormalize(v) { return [v[0] / len(v), v[1] / len(v) }
export function vDot(v1, v2) { return v1[0] * v2[0] + v1[1] * v2[1] }
