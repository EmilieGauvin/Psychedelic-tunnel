// import * as dat from 'GUI'
import * as dat from 'https://cdn.jsdelivr.net/npm/lil-gui@0.17/+esm'


export default class Debug
{
    constructor()
    {
        this.active = window.location.hash === '#debug'

        if(this.active)
        {
            this.ui = new dat.GUI()
        }
    }
}
