// Perspective
uniform mat4 uniProjection;
// Point
attribute vec4 attPoint;

varying vec2 varUV;

void main() {
  varUV = vec2( attPoint.w, attPoint.z );
  gl_Position = uniProjection * vec4(attPoint.xyz, 1);
}


