uniform mat4 uniProjection;

attribute vec3 attPoint;
attribute vec2 attUV;

varying vec4 varUV;

void main() {  
  varUV = attUV;
  // Une simple multiplication permet d'appliquer
  // la perspective.
  gl_Position = uniProjection * vec4( attPoint, 1.0 );
} 
