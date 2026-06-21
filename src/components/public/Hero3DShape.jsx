import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DShape() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = mount.offsetWidth;
    const height = mount.offsetHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Icosahedron wireframe — abstract, geometric, fits the "futuristic premium" brief
    const geometry = new THREE.IcosahedronGeometry(3.4, 1);
    const wireframeGeometry = new THREE.WireframeGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.45,
    });
    const wireframe = new THREE.LineSegments(wireframeGeometry, material);
    scene.add(wireframe);

    // Inner core sphere with a secondary accent color
    const coreGeometry = new THREE.IcosahedronGeometry(1.4, 1);
    const coreWireframe = new THREE.WireframeGeometry(coreGeometry);
    const coreMaterial = new THREE.LineBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.35,
    });
    const core = new THREE.LineSegments(coreWireframe, coreMaterial);
    scene.add(core);

    let frameId;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (!prefersReducedMotion) {
        wireframe.rotation.y += 0.0018;
        wireframe.rotation.x += 0.0008;
        core.rotation.y -= 0.003;
        core.rotation.x += 0.0015;
      }

      // subtle parallax tilt toward cursor
      wireframe.rotation.y += (mouseX - wireframe.rotation.y * 0) * 0.0002;
      camera.position.x += (mouseX - camera.position.x) * 0.02;
      camera.position.y += (-mouseY - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = mount.offsetWidth;
      const h = mount.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      wireframeGeometry.dispose();
      material.dispose();
      coreGeometry.dispose();
      coreWireframe.dispose();
      coreMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}
