'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function AnimatedShaderBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    const w = container.offsetWidth
    const h = container.offsetHeight
    renderer.setSize(w, h)
    // Cap pixel ratio at 1 — biggest single perf win
    renderer.setPixelRatio(1)
    container.appendChild(renderer.domElement)

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime:       { value: 0 },
        iResolution: { value: new THREE.Vector2(w, h) },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2  iResolution;

        #define NUM_OCTAVES 2

        float rand(vec2 n) {
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u  = fract(p);
          u = u * u * (3.0 - 2.0 * u);
          return mix(
            mix(rand(ip),                rand(ip + vec2(1.0, 0.0)), u.x),
            mix(rand(ip + vec2(0.0,1.0)), rand(ip + vec2(1.0,1.0)), u.x),
            u.y
          );
        }

        float fbm(vec2 x) {
          float v = 0.0;
          float a = 0.35;
          mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
          for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(x);
            x  = rot * x * 2.0 + vec2(100.0);
            a *= 0.45;
          }
          return v;
        }

        void main() {
          vec2 p = (gl_FragCoord.xy - iResolution.xy * 0.5)
                   / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
          vec2 v;
          vec4 o = vec4(0.0);

          float f = 2.0 + fbm(p + vec2(iTime * 4.0, 0.0)) * 0.5;

          /* Reduced from 35 → 20 iterations — same visual, 40% cheaper */
          for (float i = 0.0; i < 20.0; i++) {
            v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5;

            vec4 auroraColors = vec4(
              0.80 + 0.20 * sin(i * 0.20 + iTime * 0.4),
              0.18 + 0.10 * cos(i * 0.30 + iTime * 0.5),
              0.04 + 0.05 * sin(i * 0.40 + iTime * 0.3),
              1.0
            );

            vec4 curr = auroraColors
              * exp(sin(i * i + iTime * 0.8))
              / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));

            float thin = smoothstep(0.0, 1.0, i / 20.0) * 0.6;
            o += curr * thin;
          }

          o = tanh(pow(o / 100.0, vec4(1.6)));
          gl_FragColor = vec4(o.rgb * 0.65, o.a * 0.80);
        }
      `,
      transparent: true,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Pause when section is off-screen
    let isVisible = false
    const observer = new IntersectionObserver(
      (entries) => { isVisible = entries[0].isIntersecting },
      { threshold: 0 }
    )
    observer.observe(container)

    // Cap at 30fps — halves GPU load vs 60fps
    let frameId: number
    let lastTime = 0
    const FPS_INTERVAL = 1000 / 30

    const animate = (now: number) => {
      frameId = requestAnimationFrame(animate)
      if (!isVisible) return
      const delta = now - lastTime
      if (delta < FPS_INTERVAL) return
      lastTime = now - (delta % FPS_INTERVAL)
      material.uniforms.iTime.value += 0.033
      renderer.render(scene, camera)
    }
    frameId = requestAnimationFrame(animate)

    // Debounced resize
    let resizeTimer: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        if (!container) return
        const nw = container.offsetWidth
        const nh = container.offsetHeight
        renderer.setSize(nw, nh)
        material.uniforms.iResolution.value.set(nw, nh)
      }, 150)
    }
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      cancelAnimationFrame(frameId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="orbit-shader-bg"
      aria-hidden="true"
    />
  )
}
