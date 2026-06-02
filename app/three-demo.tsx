"use client";

import { useEffect, useRef, useState } from "react";

export function ThreeDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");

      if (cancelled) return;
      const stage = stageRef.current;
      if (!stage) return;

      const W = stage.clientWidth || 480;
      const H = stage.clientHeight || 320;

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
      camera.position.set(0, 0, 6);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      const canvas = renderer.domElement;
      canvas.style.display = "block";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.cursor = "grab";
      canvas.style.touchAction = "none";
      stage.appendChild(canvas);

      // ── A faceted "gem" that catches the light ──
      const group = new THREE.Group();
      scene.add(group);

      const geom = new THREE.IcosahedronGeometry(1.7, 1);
      const material = new THREE.MeshStandardMaterial({
        color: 0x2733e6,
        metalness: 0.4,
        roughness: 0.33,
        flatShading: true,
      });
      const gem = new THREE.Mesh(geom, material);
      group.add(gem);

      // a thin wireframe shell for a bit of structure
      const wire = new THREE.LineSegments(
        new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.74, 1)),
        new THREE.LineBasicMaterial({
          color: 0x8b94ff,
          transparent: true,
          opacity: 0.35,
        })
      );
      group.add(wire);

      // ── Lighting: bright key, cool & warm rims to lift it off the cream ──
      scene.add(new THREE.AmbientLight(0xffffff, 0.85));

      const key = new THREE.DirectionalLight(0xffffff, 2.6);
      key.position.set(4, 5, 5);
      scene.add(key);

      const rim = new THREE.PointLight(0x9fb4ff, 55, 30);
      rim.position.set(-5, -2, 3);
      scene.add(rim);

      const fill = new THREE.PointLight(0xffffff, 22, 30);
      fill.position.set(3, -4, -4);
      scene.add(fill);

      // floating motes for depth
      const moteGeo = new THREE.BufferGeometry();
      const N = 70;
      const pos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 11;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
      }
      moteGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const motes = new THREE.Points(
        moteGeo,
        new THREE.PointsMaterial({
          color: 0x2733e6,
          size: 0.05,
          transparent: true,
          opacity: 0.32,
        })
      );
      scene.add(motes);

      // ── Drag-to-rotate with inertia + gentle auto-spin ──
      let rotX = -0.2;
      let rotY = 0.4;
      let velX = 0;
      let velY = 0.004;
      let dragging = false;
      let lastX = 0;
      let lastY = 0;

      function onDown(e: PointerEvent) {
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        canvas.setPointerCapture(e.pointerId);
        canvas.style.cursor = "grabbing";
      }
      function onMove(e: PointerEvent) {
        if (!dragging) return;
        velY = (e.clientX - lastX) * 0.006;
        velX = (e.clientY - lastY) * 0.006;
        lastX = e.clientX;
        lastY = e.clientY;
      }
      function onUp() {
        dragging = false;
        canvas.style.cursor = "grab";
      }

      canvas.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);

      let raf = 0;
      let t = 0;
      function tick() {
        t += 0.01;
        rotX += velX;
        rotY += velY;
        velX *= 0.93;
        velY = velY * 0.93 + 0.004 * 0.07;
        group.rotation.x = rotX;
        group.rotation.y = rotY;
        // breathing scale
        const s = 1 + Math.sin(t) * 0.03;
        gem.scale.setScalar(s);
        wire.scale.setScalar(s);
        motes.rotation.y += 0.0008;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      }
      tick();

      function onResize() {
        if (!stage) return;
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
      const ro = new ResizeObserver(onResize);
      ro.observe(stage);

      setReady(true);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        canvas.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        geom.dispose();
        material.dispose();
        wire.geometry.dispose();
        (wire.material as { dispose(): void }).dispose();
        moteGeo.dispose();
        (motes.material as { dispose(): void }).dispose();
        renderer.dispose();
        if (stage.contains(canvas)) stage.removeChild(canvas);
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div className="t-three">
      <div className="t-three-stage-wrap">
        <div className="t-three-stage" ref={stageRef} />
        {!ready && (
          <div className="t-three-loading">› warming up the renderer…</div>
        )}
      </div>
      <div className="t-three-foot">
        <span className="t-three-hint">grab to spin it</span>
        <span className="t-three-hint">three.js · webgl · real-time</span>
      </div>
    </div>
  );
}
