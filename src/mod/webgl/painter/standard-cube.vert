// Perspective
uniform mat4 uniProjection;
uniform vec3 uniLocation;
// Point
attribute vec3 attPoint;
attribute vec2 attUV;

varying vec2 varUV;

void main() {
  varUV = attUV;
  gl_Position = uniProjection * vec4(attPoint + uniLocation, 1);
}


