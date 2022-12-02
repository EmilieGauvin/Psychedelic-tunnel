import EventEmitter from "./EventEmitter";
import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'

export default class Time extends EventEmitter
{
    constructor()
    {
        super()
        
       //Setup
    //    this.start = Date.now()
    //    this.current = this.start
    //    this.elapsed = 0
    //    this.delta = 16

    this.clock = new THREE.Clock()
    this.previousTime = 0


       window.requestAnimationFrame(() =>
       {
           this.tick()
       })
    }

    tick()
    {
        // const currentTime = Date.now()
        // this.delta = currentTime - this.current
        // this.current  = currentTime
        // this.elapsed = this.current - this.start

        this.elapsed = this.clock.getElapsedTime()
        this.delta = this.elapsed - this.previousTime
        this.previousTime = this.elapsed
        this.trigger('tick')

        window.requestAnimationFrame(() =>
        {
            this.tick()
        })
    }
}
