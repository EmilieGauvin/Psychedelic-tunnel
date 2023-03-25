import Experience from "../Experience";
import Objects from './Objects';

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        this.time = this.experience.time
        this.renderer = this.experience.renderer

        this.objects = new Objects()

    }

    lightMode() {
        if (this.objects) this.objects.lightMode()
    }

    darkMode() {
        if (this.objects) this.objects.darkMode()
    }

    noZoom() {
        if (this.objects) this.objects.noZoom()
    }

    zoom() {
        if (this.objects) this.objects.zoom()
    }

    update() {
        if (this.objects) this.objects.update()
    }
}





