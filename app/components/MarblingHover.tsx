'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Image from 'next/image';

interface MarblingHoverProps {
    frontImage: string;
    backImage: string;
    alt: string;
    className?: string;
}

export default function MarblingHover({ frontImage, backImage, alt, className = '' }: MarblingHoverProps) {
    const [isDesktop, setIsDesktop] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sceneRef = useRef<{
        scene?: THREE.Scene;
        camera?: THREE.OrthographicCamera;
        renderer?: THREE.WebGLRenderer;
        uniforms?: any;
        isMouseInside?: boolean;
        targetMouse?: THREE.Vector2;
        lerpedMouse?: THREE.Vector2;
        animationId?: number;
    }>({});

    useEffect(() => {
        const checkDevice = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    useEffect(() => {
        if (!isDesktop) return; // Skip Three.js on mobile
        if (!containerRef.current || !canvasRef.current) return;

        const container = containerRef.current;
        const canvas = canvasRef.current;

        // Vertex Shader
        const vertexShader = `
      varying vec2 v_uv;
      void main() {
        v_uv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

        // Fragment Shader with Ink Marbling Effect
        const fragmentShader = `
      precision highp float;

      uniform sampler2D u_frontTexture;
      uniform sampler2D u_backTexture;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_radius;
      uniform float u_turbulence;

      varying vec2 v_uv;

      vec3 hash33(vec3 p) {
        p = fract(p * vec3(443.8975, 397.2973, 491.1871));
        p += dot(p.zxy, p.yxz + 19.27);
        return fract(vec3(p.x * p.y, p.z * p.x, p.y * p.z));
      }

      float simplex_noise(vec3 p) {
        const float K1 = 0.333333333;
        const float K2 = 0.166666667;
        
        vec3 i = floor(p + (p.x + p.y + p.z) * K1);
        vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
        
        vec3 e = step(vec3(0.0), d0 - d0.yzx);
        vec3 i1 = e * (1.0 - e.zxy);
        vec3 i2 = 1.0 - e.zxy * (1.0 - e);
        
        vec3 d1 = d0 - (i1 - K2);
        vec3 d2 = d0 - (i2 - K2 * 2.0);
        vec3 d3 = d0 - (1.0 - 3.0 * K2);
        
        vec4 h = max(0.6 - vec4(dot(d0, d0), dot(d1, d1), dot(d2, d2), dot(d3, d3)), 0.0);
        vec4 n = h * h * h * h * vec4(
          dot(d0, hash33(i) * 2.0 - 1.0),
          dot(d1, hash33(i + i1) * 2.0 - 1.0),
          dot(d2, hash33(i + i2) * 2.0 - 1.0),
          dot(d3, hash33(i + 1.0) * 2.0 - 1.0)
        );
        
        return 0.5 + 0.5 * 31.0 * dot(n, vec4(1.0));
      }

      vec2 curl(vec2 p, float time) {
        const float epsilon = 0.001;
        float n1 = simplex_noise(vec3(p.x, p.y + epsilon, time));
        float n2 = simplex_noise(vec3(p.x, p.y - epsilon, time));
        float n3 = simplex_noise(vec3(p.x + epsilon, p.y, time));
        float n4 = simplex_noise(vec3(p.x - epsilon, p.y, time));
        return vec2((n2 - n1) / (2.0 * epsilon), (n4 - n3) / (2.0 * epsilon));
      }

      float inkMarbling(vec2 p, float time, float intensity) {
        float result = 0.0;
        
        vec2 flow = curl(p * 1.5, time * 0.1) * intensity * 2.0;
        vec2 p1 = p + flow * 0.3;
        result += simplex_noise(vec3(p1 * 2.0, time * 0.15)) * 0.5;
        
        vec2 flow2 = curl(p * 3.0 + vec2(sin(time * 0.2), cos(time * 0.15)), time * 0.2) * intensity;
        vec2 p2 = p + flow2 * 0.2;
        result += simplex_noise(vec3(p2 * 4.0, time * 0.25)) * 0.3;
        
        vec2 flow3 = curl(p * 6.0 + vec2(cos(time * 0.3), sin(time * 0.25)), time * 0.3) * intensity * 0.5;
        vec2 p3 = p + flow3 * 0.1;
        result += simplex_noise(vec3(p3 * 8.0, time * 0.4)) * 0.2;
        
        return result * 0.5 + 0.5;
      }

      void main() {
        vec2 uv = v_uv;
        vec4 frontColor = texture2D(u_frontTexture, uv);
        vec4 backColor = texture2D(u_backTexture, uv);
        
        float screenAspect = u_resolution.x / u_resolution.y;
        vec2 correctedUV = uv;
        correctedUV.x *= screenAspect;
        vec2 correctedMouse = u_mouse;
        correctedMouse.x *= screenAspect;

        float dist = distance(correctedUV, correctedMouse);
        float marbleEffect = inkMarbling(uv * 2.0 + u_time * 0.075, u_time, u_turbulence * 2.0);
        float jaggedDist = dist + (marbleEffect - 0.5) * u_turbulence * 2.0;
        
        float mask = u_radius > 0.001 ? smoothstep(u_radius + 0.02, u_radius - 0.02, jaggedDist) : 0.0;
        
        vec3 finalColor = mix(frontColor.rgb, backColor.rgb, mask);
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

        const loader = new THREE.TextureLoader();
        let frontTexture: THREE.Texture;
        let backTexture: THREE.Texture;
        let texturesLoaded = 0;

        const onTextureLoad = () => {
            texturesLoaded++;
            if (texturesLoaded === 2) {
                setupScene();
            }
        };

        loader.load(frontImage, (texture) => {
            frontTexture = texture;
            frontTexture.minFilter = THREE.LinearFilter;
            frontTexture.magFilter = THREE.LinearFilter;
            onTextureLoad();
        });

        loader.load(backImage, (texture) => {
            backTexture = texture;
            backTexture.minFilter = THREE.LinearFilter;
            backTexture.magFilter = THREE.LinearFilter;
            onTextureLoad();
        });

        function setupScene() {
            const scene = new THREE.Scene();
            const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

            const width = container.clientWidth;
            const height = container.clientHeight;

            const uniforms = {
                u_frontTexture: { value: frontTexture },
                u_backTexture: { value: backTexture },
                u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
                u_time: { value: 0.0 },
                u_resolution: { value: new THREE.Vector2(width, height) },
                u_radius: { value: 0.0 },
                u_turbulence: { value: 0.225 }
            };

            const geometry = new THREE.PlaneGeometry(2, 2);
            const material = new THREE.ShaderMaterial({
                uniforms,
                vertexShader,
                fragmentShader,
                depthTest: false,
                depthWrite: false
            });

            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            const renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: false,
                alpha: false
            });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(width, height);

            sceneRef.current = {
                scene,
                camera,
                renderer,
                uniforms,
                isMouseInside: false,
                targetMouse: new THREE.Vector2(0.5, 0.5),
                lerpedMouse: new THREE.Vector2(0.5, 0.5)
            };

            animate();
        }

        function animate() {
            const ref = sceneRef.current;
            if (!ref.scene || !ref.camera || !ref.renderer || !ref.uniforms) return;

            ref.lerpedMouse!.lerp(ref.targetMouse!, 0.1);
            ref.uniforms.u_mouse.value.copy(ref.lerpedMouse!);

            if (ref.isMouseInside) {
                ref.uniforms.u_time.value += 0.01;
            }

            ref.renderer.render(ref.scene, ref.camera);
            ref.animationId = requestAnimationFrame(animate);
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;
            const inside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

            if (sceneRef.current.isMouseInside !== inside) {
                sceneRef.current.isMouseInside = inside;

                if (inside && sceneRef.current.uniforms) {
                    sceneRef.current.uniforms.u_radius.value = 0;
                    const targetRadius = 0.35;
                    const startTime = Date.now();
                    const duration = 400;

                    const animateRadius = () => {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);

                        if (sceneRef.current.uniforms) {
                            sceneRef.current.uniforms.u_radius.value = targetRadius * eased;
                        }

                        if (progress < 1) {
                            requestAnimationFrame(animateRadius);
                        }
                    };
                    animateRadius();
                } else if (!inside && sceneRef.current.uniforms) {
                    const startRadius = sceneRef.current.uniforms.u_radius.value;
                    const startTime = Date.now();
                    const duration = 300;

                    const animateRadius = () => {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = Math.pow(progress, 2);

                        if (sceneRef.current.uniforms) {
                            sceneRef.current.uniforms.u_radius.value = startRadius * (1 - eased);
                        }

                        if (progress < 1) {
                            requestAnimationFrame(animateRadius);
                        }
                    };
                    animateRadius();
                }
            }

            if (inside && sceneRef.current.targetMouse) {
                sceneRef.current.targetMouse.x = (x - rect.left) / rect.width;
                sceneRef.current.targetMouse.y = 1.0 - (y - rect.top) / rect.height;
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            if (sceneRef.current.animationId) {
                cancelAnimationFrame(sceneRef.current.animationId);
            }
            if (sceneRef.current.renderer) {
                sceneRef.current.renderer.dispose();
            }
        };
    }, [frontImage, backImage, isDesktop]);

    if (!isDesktop) {
        return (
            <div className={`relative w-full ${className} flex items-center justify-center bg-white/5 border border-white/10`}>
                <span className="text-white/20 font-heading font-black uppercase tracking-[0.2em] text-xl transform -rotate-90">{alt}</span>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={`relative w-full ${className}`}>
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
}
