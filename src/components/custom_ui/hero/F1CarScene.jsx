import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Float } from "@react-three/drei";
import carModelUrl from "@/assets/oracle_red_bull_f1_car_rb19_2023.glb?url";

function Car({ scale = 2.2, position = [0, -0.6, 0], rotation = [0, Math.PI / 5, 0] }) {
  const { scene } = useGLTF(carModelUrl);
  return <primitive object={scene} scale={scale} position={position} rotation={rotation} />;
}

useGLTF.preload(carModelUrl);

function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  );
}

export function F1CarScene({
  camera = { position: [4, 2.5, 7], fov: 38 },
  carScale = 2.2,
  carPosition = [0, -0.6, 0],
  carRotation = [0, Math.PI / 5, 0],
  autoRotateSpeed = 0.7,
  floatIntensity = 0.25,
}) {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<Loader />}>
        <Canvas
          gl={{ alpha: true, antialias: true }}
          camera={camera}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[8, 10, 6]} intensity={2.5} />
            <directionalLight position={[-6, 4, -4]} intensity={0.6} color="#1a0a2e" />
            <pointLight position={[0, 6, 2]} intensity={0.8} color="#FCD116" />
            <pointLight position={[-4, 2, 4]} intensity={0.4} color="#B11226" />
            <Environment preset="studio" />
            <Float speed={1.4} rotationIntensity={0.06} floatIntensity={floatIntensity}>
              <Car scale={carScale} position={carPosition} rotation={carRotation} />
            </Float>
          </Suspense>
          <OrbitControls
            autoRotate
            autoRotateSpeed={autoRotateSpeed}
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.3}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
