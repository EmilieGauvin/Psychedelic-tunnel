import * as THREE from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r146/build/three.module.js'
import Experience from "./Experience";



export default class Camera {
    constructor() {

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug
        this.distBetweenPlanes = this.experience.distBetweenPlanes
        this.zoomChange = 0
        
        //Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Camera')
        }

        this.setInstance()
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(0, 0, 1)
        this.scene.add(this.instance)

    }

    noZoom() {
        this.zoomChange = -1
    }

    zoom() {
        this.zoomChange = 1
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
        this.scaleRatio = this.experience.scaleRatio
    }

    update() {
        if (this.controls)
            this.controls.update()

        //Scale update
        if (this.zoomChange != 0) {
            this.instance.rotation.y += this.zoomChange * 0.01
            this.instance.rotation.x += this.zoomChange * 0.01
            this.instance.position.z -= this.zoomChange * 0.01


            if (this.zoomChange === 1) {
                if (this.instance.rotation.y >= Math.PI * 0.20) this.instance.rotation.y = Math.PI * 0.20
                if (this.instance.rotation.x >= Math.PI * 0.20) this.instance.rotation.x = Math.PI * 0.20
                if (this.instance.position.z <= 0) this.instance.position.z = 0

                if (this.instance.rotation.x === Math.PI * 0.20 && this.instance.rotation.y === Math.PI * 0.20 && this.instance.position.z === 0)
                    this.zoomChange = 0
            }

            if (this.zoomChange === -1) {
                if (this.instance.rotation.y <= 0) this.instance.rotation.y = 0
                if (this.instance.rotation.x <= 0) this.instance.rotation.x = 0
                if (this.instance.position.z >= 1) this.instance.position.z = 1

                if (this.instance.rotation.x === 0 && this.instance.rotation.y === 0 && this.instance.position.z === 1)
                    this.zoomChange = 0
            }
        }
    }
}

