precision mediump float;

uniform vec3 uniColor;

varying varUV;


void main() {
  gl_FragColor = vec4( uniColor, 1 );
}
