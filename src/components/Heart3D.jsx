import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Trái tim 3D tạo từ hàng nghìn hạt sáng, đập nhẹ và xoay theo ngón tay
function ParticleHeart({ count = 5000, small }) {
  const ref = useRef();
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = ["#ff8fab", "#f19bb0", "#ffd1dc", "#e8507a", "#ffffff", "#f5c6a5"].map((c) => new THREE.Color(c));
    for (let i = 0; i < count; i++) {
      const t = Math.random() * Math.PI * 2;
      // phần lớn hạt nằm gần bề mặt để trái tim rõ hình
      const r = Math.random() < 0.7 ? 0.92 + Math.random() * 0.08 : Math.cbrt(Math.random());
      const x = 16 * Math.sin(t) ** 3;
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      const depth = Math.sqrt(Math.max(0, 1 - (r * r) * 0.15)) * 6 * (1 - Math.abs(y + 5) / 22);
      positions.set([x * r * 0.1, (y * r + 2) * 0.1, (Math.random() * 2 - 1) * depth * 0.1 * r], i * 3);
      const c = palette[(Math.random() * palette.length) | 0];
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, colors };
  }, [count]);

  useFrame(({ clock, pointer }) => {
    const t = clock.elapsedTime;
    const beat = 1 + Math.max(0, Math.sin(t * 3.2)) ** 8 * 0.08;
    ref.current.scale.setScalar(beat);
    ref.current.rotation.y = t * 0.35 + pointer.x * 0.6;
    ref.current.rotation.x = -pointer.y * 0.3;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={small ? 0.06 : 0.05} vertexColors transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  );
}

export default function Heart3D() {
  const small = typeof window !== "undefined" && innerWidth < 600;
  return (
    <Canvas camera={{ position: [0, 0, small ? 8.5 : 6], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6} position={[0, small ? 0.85 : 0.7, 0]}>
        <ParticleHeart count={small ? 3500 : 6000} small={small} />
      </Float>
      <Sparkles count={60} scale={[6, 4, 3]} size={3} speed={0.3} color="#ffb3c4" />
    </Canvas>
  );
}
