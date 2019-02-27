attribute vec2 attXY;
attribute vec2 attUV;

varying vec2 varUV;

void main() {
    varUV = attUV;
    gl_Position = vec4( attXY, 0, 1);
}
