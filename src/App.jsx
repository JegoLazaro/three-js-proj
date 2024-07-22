import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Box() {
  const mesh = useRef();

  // Rotate mesh every frame
  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh} scale={3}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
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

function Pyramid() {
  const mesh = useRef();

  // Define vertices of the pyramid
  const vertices = new Float32Array([
    // Base vertices
    -1.0, -1.0, 1.0,  // Vertex 0
    1.0, -1.0, 1.0,   // Vertex 1
    1.0, -1.0, -1.0,  // Vertex 2
    -1.0, -1.0, -1.0, // Vertex 3
    // Apex vertex
    0.0, 1.0, 0.0     // Vertex 4
  ]);

  // Define faces of the pyramid (using vertex indices)
  const indices = new Uint16Array([
    // Base face (square)
    0, 1, 2,
    0, 0, 0,
    // Side faces (triangles)
    0, 1, 4,
    1, 2, 4,
    2, 3, 4,
    3, 0, 4
  ]);

  // Create a buffer geometry and set the attributes
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeVertexNormals(); // Compute normals for lighting

  // Optional: Add a rotation animation
  useFrame(() => {
    mesh.current.rotation.x += 0.04;
    mesh.current.rotation.y += 0.04;
  });

  return (
    <mesh ref={mesh} geometry={geometry}>
      <meshStandardMaterial color="green" side={THREE.DoubleSide} />
    </mesh>
  );
}

function App() {
  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div style={{ width: '30%', height: '400px', backgroundColor: 'blue' }}>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box />
        </Canvas>
      </div>
      <div style={{ width: '30%', height: '400px', backgroundColor: 'green' }}>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Sphere />
        </Canvas>
      </div>
      <div style={{ width: '30%', height: '400px', backgroundColor: 'orange' }}>
      <Canvas >
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Pyramid />
        </Canvas>
      </div>
    </div>
    <div style={{ marginTop: 30, width: '100%', height: '400px', backgroundColor: 'red' }}>
        <Canvas>
          {/* <ambientLight /> */}
          <pointLight position={[10, 10, 10]} />
          {/* <Box /> */}
          <Pyramid />
          <Sphere />
        </Canvas>
      </div>
    </>
  );
}

export default App;