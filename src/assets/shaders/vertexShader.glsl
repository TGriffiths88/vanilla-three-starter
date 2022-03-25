uniform float uTime;
varying vec2 vUv;

void main() {
    vUv = uv;
    vec3 newPosition = vec3(position.x, position.y + sin(uTime) * 0.1, position.z);
    vec4 mvPosition = modelViewMatrix * vec4( newPosition, 1.0 );
	gl_Position = projectionMatrix * mvPosition;
}