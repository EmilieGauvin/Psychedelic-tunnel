import * as THREE from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r146/build/three.module.js'
import Experience from '../Experience.js'
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'


export default class Objects {
    constructor(texture) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera
        this.debug = this.experience.debug
        this.pointer = this.experience.pointer

        //Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('shader')
        }

        // options
        this.scale = 1
        this.scaleChange = 0
        this.count = 10
        this.meshesArray = []
        this.uCenterArray = []
        this.animationOffset = 0.02
        this.distBetweenPlanes = this.experience.distBetweenPlanes


        this.setUp()
    }

    setUp() {
        //Ucenter Array set up
        for (let i = 0; i < this.count; i++) {
            this.uCenterArray.push({ x: 0.5, y: 0.5 })
        }

        // Geometry
        const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)

        // Material
        this.shaderMaterial = new THREE.ShaderMaterial({
            vertexShader: testVertexShader,
            fragmentShader: testFragmentShader,
            uniforms:
            {
                uOffset: { value: 0 },
                uThickness: { value: 0.003 },
                uAlpha: { value: 0 },
                uWaveThickness: { value: 1 },
                uTime: { value: 0 },
                uCenter: { value: new THREE.Vector2(0.5, 0.5) },
                uMode: { value: 0 }
            },
            side: THREE.DoubleSide,
            transparent: true
        })

        //Debug
        if (this.debug.active) {
            this.debugFolder.add(this.shaderMaterial.uniforms.uFrequency, 'value').min(-2).max(10).step(0.01).name('uFrequency')
            this.debugFolder.add(this.shaderMaterial.uniforms.uWaveThickness, 'value').min(-2).max(10).step(0.01).name('uWaveThickness')
            this.debugFolder.add(this.shaderMaterial.uniforms.u3, 'value').min(-2).max(10).step(0.01).name('u3')
        }

        this.materialArray = []
        // Mesh function
        const meshCreation = () => {

            const material = this.shaderMaterial.clone()
            this.materialArray.push(material)
            const mesh = new THREE.Mesh(geometry, material)
            this.meshesArray.push(mesh)

            material.uniforms.uAlpha.value = 0.4 - Math.pow(this.meshesArray.indexOf(mesh) / this.count, 1)
            mesh.position.z = -this.meshesArray.indexOf(mesh) * this.distBetweenPlanes

            this.scene.add(mesh)
        }

        for (let i = 0; i < this.count; i++) {
            meshCreation()
        }
    }

    lightMode() {
        for (const material of this.materialArray) {
            material.uniforms.uMode.value = 0
        }
    }

    darkMode() {
        for (const material of this.materialArray) {
            material.uniforms.uMode.value = 1
        }
    }

    noZoom() {
        this.scaleChange = -1
    }

    zoom() {
        this.scaleChange = 1
    }

    update() {
        //Scale update
        if (this.scaleChange != 0) {
            this.scale = this.scale + this.scaleChange * 0.2

            for (const mesh of this.meshesArray) {
                mesh.scale.set(this.scale, this.scale, 1)
            }

            if (this.scaleChange === 1 && this.scale >= 10) {
                this.scale = 10
                this.scaleChange = 0
            }

            if (this.scaleChange === -1 && this.scale <= 1) {
                this.scale = 1
                this.scaleChange = 0
            }
        }

        //Uniforms updates
        this.uCenterArray.shift()
        this.uCenterArray.push({ x: - this.pointer.x / 15 + 0.5, y: - this.pointer.y / 15 + 0.5 })

        for (let i = 0; i < this.count; i++) {
            this.materialArray[this.count - 1 - i].uniforms.uTime.value = this.time.elapsed + i * this.animationOffset
            this.materialArray[this.count - 1 - i].uniforms.uCenter.value.x = this.uCenterArray[i].x
            this.materialArray[this.count - 1 - i].uniforms.uCenter.value.y = this.uCenterArray[i].y
        }
    }
}
