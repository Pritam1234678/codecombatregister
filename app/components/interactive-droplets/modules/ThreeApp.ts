/** @format */

import Common from './Common';
import Pointer from './Pointer';
import Output from './Output';

export default class ThreeApp {
    private readonly output: Output;
    private readonly wrapper: HTMLElement;
    private readonly common: Common;
    private readonly pointer: Pointer;

    /**
     * @constructor
     * @param {HTMLElement} wrapper
     */
    constructor(wrapper: HTMLElement) {
        this.wrapper = wrapper;
        this.common = new Common();
        this.pointer = new Pointer();
        this.output = new Output(this.common, this.pointer);

        this.resize = this.resize.bind(this);
        this.render = this.render.bind(this);

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.resize);
        }

        // Bind pointer events with common instance
        this.pointer.onPointerMove = (e: PointerEvent) => {
            if (e.pointerType == 'touch' && e.isPrimary) {
                this.pointer.setCoords(e.pageX, e.pageY, this.common);
            } else {
                this.pointer.setCoords(e.clientX, e.clientY, this.common);
            }
        };

        this.pointer.onPointerDown = (e: PointerEvent) => {
            if (e.pointerType !== 'touch' || !e.isPrimary) return;
            this.pointer.setCoords(e.pageX, e.pageY, this.common);
        };
    }

    /**
     * # Initialization
     */
    init() {
        this.common.init();
        this.pointer.init();
        this.output.init();
    }

    /**
     * # Setup before starting rendering
     */
    setup() {
        if (!this.common.renderer) return;
        this.wrapper.appendChild(this.common.renderer.domElement);
        this.resize();
        this.common.clock.start();
    }

    /**
     * # Rendering process
     */
    render() {
        if (!this.common.renderer) return;
        requestAnimationFrame(this.render);

        this.common.update();
        this.output.update();
    }

    /**
     * # Resize handling
     */
    private resize() {
        this.common.resize();
        this.output.resize();
    }
}
