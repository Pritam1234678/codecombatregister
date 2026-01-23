/** @format */

import * as THREE from 'three';

class Pointer {
    pointerMoved: boolean;
    coords: THREE.Vector2;
    private prevCoords: THREE.Vector2;
    diff: THREE.Vector2;
    private timer: ReturnType<typeof setTimeout> | null;

    /**
     * @constructor
     */
    constructor() {
        this.pointerMoved = false;
        this.coords = new THREE.Vector2();
        this.prevCoords = new THREE.Vector2();
        this.diff = new THREE.Vector2();
        this.timer = null;

        this.onPointerMove = this.onPointerMove.bind(this);
        this.onPointerDown = this.onPointerDown.bind(this);
    }

    /**
     * # Register event listeners
     */
    init() {
        if (typeof document === 'undefined') return;
        document.body.addEventListener('pointermove', this.onPointerMove, false);
        document.body.addEventListener('pointerdown', this.onPointerDown, false);
    }

    /**
     * # Set coordinates
     * @param {number} x
     * @param {number} y
     */
    setCoords(x: number, y: number, common: any) {
        if (this.timer) clearTimeout(this.timer);

        const coordsX = (x / common.width) * 2 - 1;
        const coordsY = -(y / common.height) * 2 + 1;
        this.coords.set(coordsX, coordsY);

        this.pointerMoved = true;

        this.timer = setTimeout(() => {
            this.pointerMoved = false;
        }, 100);
    }

    /**
     * # Pointer interaction handling
     * @param {PointerEvent} e
     */
    onPointerMove(e: PointerEvent) {
        // Will be bound with common instance
    }

    /**
     * # Touch input handling
     * @param {PointerEvent} e
     */
    onPointerDown(e: PointerEvent) {
        // Will be bound with common instance
    }

    /**
     * # Update the difference in pointer coordinates
     */
    update() {
        this.diff.subVectors(this.coords, this.prevCoords);
        this.prevCoords.copy(this.coords);
    }
}

export default Pointer;
