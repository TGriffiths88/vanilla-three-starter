import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module';

// shaders
import fragmentShader from './assets/shaders/fragmentShader.glsl'
import vertexShader from './assets/shaders/vertexShader.glsl'

class App {
    constructor() {
        this.canvas = document.getElementById('canvas')
        this.clock = new THREE.Clock()
        this.renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: true})
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.scene = new THREE.Scene()
        this.stats = new Stats()
        document.documentElement.appendChild(this.stats.dom)
        this.shader = new THREE.ShaderMaterial({
            fragmentShader,
            vertexShader,
            uniforms: {
                uTime: {value: 0}
            },
            side: THREE.DoubleSide
        })
    }

    resize = () => {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
    }

    addObjects = () =>{
        this.plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1, 20, 20), this.shader)
        this.scene.add(this.plane)
    }

    init = () => {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000)
        this.camera.position.z = 2
        this.addObjects()
        this.addControls()
        this.animate()
        window.addEventListener('resize', this.resize)
    }

    addControls = () => {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true
    }

    animate = () => {
        this.shader.uniforms.uTime.value = this.clock.getElapsedTime()
        this.stats.update()
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
        window.requestAnimationFrame(this.animate)
    }
}

const app = new App()
app.init()