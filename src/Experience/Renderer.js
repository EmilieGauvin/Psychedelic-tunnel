import * as THREE from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r146/build/three.module.js'
import { EffectComposer } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r146/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r146/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r146/examples/jsm/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r146/examples/jsm/postprocessing/SMAAPass.js';

import Experience from "./Experience";

export default class Renderer {
    constructor() {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setInstance()
        this.setPostProcessing()
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        }
        )
        this.instance.physicallyCorrectLights = true
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor(0xffffff)
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    setPostProcessing() {
        const renderTarget = new THREE.WebGLRenderTarget(
            800,
            600,
            {
                samples: this.instance.getPixelRatio() === 1 ? 2 : 0
            }
        )
        this.effectComposer = new EffectComposer(this.instance, renderTarget)
        this.effectComposer.setSize(this.sizes.width, this.sizes.height)
        this.effectComposer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))

        const renderPass = new RenderPass(this.scene, this.camera.instance)
        this.effectComposer.addPass(renderPass)

        this.setUnrealBloom()

        if (this.instance.getPixelRatio() === 1 && !this.instance.capabilities.isWebGL2) {
            this.setAntialias()
        }

    }

    setUnrealBloom() {
        this.unrealBloomPass = new UnrealBloomPass()
        this.effectComposer.addPass(this.unrealBloomPass)
        this.unrealBloomPass.strength = 0
        this.unrealBloomPass.radius = 1
    }

    setAntialias() {
        const smaaPass = new SMAAPass()
        this.effectComposer.addPass(smaaPass)
        console.log('Using SMAA')
    }

    lightMode() {
        this.instance.setClearColor(0xffffff)
        this.unrealBloomPass.strength = 0
    }

    darkMode() {
        this.instance.setClearColor(0x000000)
        this.unrealBloomPass.strength = 1.5

    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
        this.effectComposer.setSize(this.sizes.width, this.sizes.height)
        this.effectComposer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    update() {
        if (this.effectComposer) this.effectComposer.render()
        else this.instance.render(this.scene, this.camera.instance)
    }
}
