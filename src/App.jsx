import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Box() {
  const mesh = useRef();

  // Rotate mesh every frame
  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh} scale={3}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  );
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Sphere() {
  const mesh = useRef();
  const [active, setActive] = useState(false)

  // Rotate mesh every frame
  useFrame(() => {
    mesh.current.rotation.x += 0.02;
    mesh.current.rotation.y += 0.02;
  });

  return (
    <mesh onClick={() => setActive(!active)} ref={mesh} scale={3} position={!active ? [getRandomInt(-2,3), getRandomInt(-2,3),  getRandomInt(-1,3)] : [getRandomInt(-2,3), getRandomInt(-2,3),  getRandomInt(-1,3)]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={'blue'} />
    </mesh>
  );
}

function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div style={{ width: '45%', height: '400px', backgroundColor: 'blue' }}>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box />
        </Canvas>
      </div>
      <div style={{ width: '45%', height: '400px', backgroundColor: 'orange' }}>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Sphere />
        </Canvas>
      </div>
    </div>
  );
}

export default App;