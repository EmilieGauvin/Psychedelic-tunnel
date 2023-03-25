import * as THREE from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r146/build/three.module.js'
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World.js'
import Debug from './Utils/Debug'
import Stats from 'stats.js'
import PointerEvents from './Utils/PointerEvents'

let instance = null

export default class Experience {
    constructor(canvas) {
        if (instance) {
            return instance
        }
        instance = this

        //Stats
        this.statsActive = window.location.hash === '#stats'
        if (this.statsActive) {
            this.stats = new Stats()
            this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
            document.body.appendChild(this.stats.dom)
        }

        //Global acces
        window.experience = this

        //Options
        this.canvas = canvas

        //Set up variables
        this.distBetweenPlanes = 0.5


        //Set up
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.pointerEvents = new PointerEvents()
        this.pointer = this.pointerEvents.pointer


        this.world = new World()

        this.sizes.on('resize', () => {
            this.resize()
        })

        //Time tick event
        this.time.on('tick', () => {
            this.update()
        })

    }

    lightMode() {
        this.renderer.lightMode()
        if (this.world) this.world.lightMode()
    }

    darkMode() {
        this.renderer.darkMode()
        if (this.world) this.world.darkMode()
    }

    noZoom() {
        this.camera.noZoom()
        if (this.world) this.world.noZoom()
    }

    zoom() {
        this.camera.zoom()
        if (this.world) this.world.zoom()
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        if (this.statsActive) this.stats.begin()

        this.camera.update()
        this.renderer.update()
        if (this.world) this.world.update()

        if (this.statsActive) this.stats.end()
    }

    destroy() {
        this.sizes.off('resize')
        this.time.off('tick')

        //Travers the wholde scene
        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()

                for (const key in child.material) {
                    const value = child.material[key]

                    if (value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        if (this.debug.active)
            this.debug.ui.destroy()
    }
}
