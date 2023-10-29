import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import styles from './ThreeScene_ply.module.css';

const ThreeScene_ply = () => {
    const sceneRef = useRef(null);
    const scene = new THREE.Scene(); // scene変数をここで定義


    useEffect(() => {
        const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 15);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // シーンにカメラとライトを追加
        scene.add(camera);

        const light = new THREE.HemisphereLight(0x8d7c7c, 0x494966, 3);
        scene.add(light);

        addShadowedLight(1, 1, 1, 0xffffff, 3.5);
        addShadowedLight(0.5, 1, -1, 0xffd500, 3);

        // PLYファイルの読み込み
        const loader = new PLYLoader();
        loader.load('/models/ply/ascii/dolphins.ply', (geometry) => {
            geometry.computeVertexNormals();
            const material = new THREE.MeshStandardMaterial({ color: 0x009cff, flatShading: true });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.y = -0.2;
            mesh.position.z = 0.3;
            mesh.rotation.x = -Math.PI / 2;
            mesh.scale.multiplyScalar(0.001);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            scene.add(mesh);
        });

        loader.load('/models/ply/binary/point_cloud.ply', (geometry) => {
            geometry.computeVertexNormals();
            const material = new THREE.MeshStandardMaterial({ color: 0x009cff, flatShading: true });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = -0.2;
            mesh.position.y = -0.02;
            mesh.position.z = -0.2;
            mesh.scale.multiplyScalar(0.0006);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            scene.add(mesh);
        });

        // レンダラーの設定
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        scene.background = new THREE.Color(0x72645b);

        const container = document.getElementById('scene-container');
        container.appendChild(renderer.domElement);

        // カメラの初期位置と向きを設定
        camera.position.set(3, 0.15, 3);
        const cameraTarget = new THREE.Vector3(0, -0.1, 0);
        controls.target = cameraTarget;

        // ウィンドウサイズが変わった時の処理を追加
        window.addEventListener('resize', () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        });

        // アニメーションループの設定
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        // アニメーションの開始
        animate();

        return () => {
            // コンポーネントがアンマウントされたときのクリーンアップ処理を行う場合はここで行う
        };
    }, []);

    function addShadowedLight(x, y, z, color, intensity) {
        const directionalLight = new THREE.DirectionalLight(color, intensity);
        directionalLight.position.set(x, y, z);
        scene.add(directionalLight); // `scene` 変数を使用
        directionalLight.castShadow = true;
        const d = 1;
        directionalLight.shadow.camera.left = -d;
        directionalLight.shadow.camera.right = d;
        directionalLight.shadow.camera.top = d;
        directionalLight.shadow.camera.bottom = -d;
        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 4;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.bias = -0.001;
    }

    return <div id="scene-container" className={styles.sceneContainer} />;
};

export default ThreeScene_ply;
