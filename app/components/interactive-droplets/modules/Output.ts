/** @format */

import * as THREE from 'three';
import type Common from './Common';
import type Pointer from './Pointer';
import base_vert from '../shaders/vert/baseVert';
import output_frag from '../shaders/frag/outputFrag';

export default class Output {
    private readonly scene: THREE.Scene;
    private readonly camera: THREE.PerspectiveCamera;
    private readonly uniforms: THREE.ShaderMaterialParameters['uniforms'];
    private readonly trailLength: number;
    private pointerTrail: THREE.Vector2[];
    private readonly common: Common;
    private readonly pointer: Pointer;

    static CAMERA_PARAM = {
        fovy: 60,
        aspect: typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 16/9,
        near: 0.1,
        far: 50,
        position: new THREE.Vector3(0.0, 0.0, 10.0),
        lookAt: new THREE.Vector3(0.0, 0.0, 0.0),
    };

    /**
     * @constructor
     */
    constructor(common: Common, pointer: Pointer) {
        this.common = common;
        this.pointer = pointer;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            Output.CAMERA_PARAM.fovy,
            Output.CAMERA_PARAM.aspect,
            Output.CAMERA_PARAM.near,
            Output.CAMERA_PARAM.far
        );

        this.trailLength = 15;
        this.pointerTrail = Array.from({ length: this.trailLength }, () => new THREE.Vector2(0, 0));

        this.uniforms = {
            uTime: { value: this.common.time },
            uResolution: {
                value: new THREE.Vector2(this.common.width, this.common.height),
            },
            uPointerTrail: { value: this.pointerTrail },
        };
    }

    /**
     * # Initialization
     */
    init() {
        // Camera
        this.camera.position.copy(Output.CAMERA_PARAM.position);
        this.camera.lookAt(Output.CAMERA_PARAM.lookAt);

        // Mesh
        const planeGeometry = new THREE.PlaneGeometry(2.0, 2.0);
        const planeMaterial = new THREE.RawShaderMaterial({
            vertexShader: base_vert,
            fragmentShader: output_frag,
            wireframe: false,
            uniforms: this.uniforms,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        this.scene.add(plane);
    }

    /**
     * # Resize handling
     */
    resize() {
        this.camera.aspect = this.common.aspect;
        this.camera.updateProjectionMatrix();
        if (this.uniforms) {
            this.uniforms.uResolution.value.set(this.common.width, this.common.height);
        }
    }

    /**
     * # Render the final output scene
     */
    private render() {
        if (!this.common.renderer) return;
        if (this.uniforms) {
            this.uniforms.uTime.value = this.common.time;
        }
        this.common.renderer.render(this.scene, this.camera);
    }

    /**
     * # rAF update
     */
    update() {
        this.updatePointerTrail();
        this.render();
    }

    /**
     * # Update the pointer trail
     */
    updatePointerTrail() {
        for (let i = this.trailLength - 1; i > 0; i--) {
            this.pointerTrail[i].copy(this.pointerTrail[i - 1]);
        }
        this.pointerTrail[0].copy(this.pointer.coords);
    }
}
