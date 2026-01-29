/** @format */

import * as THREE from 'three';

class Common {
    readonly devicePixelRatio: number;
    readonly clock: THREE.Clock;
    readonly renderer: THREE.WebGLRenderer | null;
    width: number;
    height: number;
    aspect: number;
    time: number;
    timeScale: number;

    static RENDERER_PARAM = {
        clearColor: 0xffffff,
        alpha: 0,
    };

    /**
     * Check if WebGL is available
     */
    static isWebGLAvailable(): boolean {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            return !!gl;
        } catch (e) {
            return false;
        }
    }

    /**
     * @constructor
     */
    constructor() {
        this.devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
        
        // Check WebGL availability before creating renderer
        if (!Common.isWebGLAvailable()) {
            console.warn('WebGL is not available. Interactive droplets will be disabled.');
            this.renderer = null;
        } else {
            try {
                this.renderer = new THREE.WebGLRenderer();
            } catch (error) {
                console.warn('Failed to create WebGL renderer:', error);
                this.renderer = null;
            }
        }
        
        this.clock = new THREE.Clock();
        this.width = typeof window !== 'undefined' ? window.innerWidth : 1920;
        this.height = typeof window !== 'undefined' ? window.innerHeight : 1080;
        this.aspect = this.width / this.height;
        this.time = 0;
        this.timeScale = 2.0;
    }

    /**
     * # Initialization
     */
    init() {
        if (!this.renderer) return;
        const clearColor = new THREE.Color(Common.RENDERER_PARAM.clearColor);
        this.renderer.setClearColor(clearColor, Common.RENDERER_PARAM.alpha);
        this.resize();
    }

    /**
     * # Resize handling
     */
    resize() {
        if (typeof window === 'undefined' || !this.renderer) return;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width / this.height;

        this.renderer.setSize(this.width, this.height);
        // this.renderer.setPixelRatio(this.devicePixelRatio);
    }

    /**
     * # rAF update
     */
    update(){
        this.time = this.clock.getElapsedTime() * this.timeScale;
    }
}

export default Common;
