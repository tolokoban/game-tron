precision mediump float;

uniform sampler2D uniTexture;
varying vec2 varUV;


void main() {
  gl_FragColor = vec4(varUV.x, varUV.y, 0, 1);
  gl_FragColor = texture2D( uniTexture, varUV );
}
