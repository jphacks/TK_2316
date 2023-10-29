import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // OrbitControls を import

const ThreeScene = () => {
    const sceneRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 20);
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        // シーンにカメラとライトを追加
        scene.add(camera);
        const light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light);

        // KTX2Loaderのインスタンスを作成
        const ktx2Loader = new KTX2Loader().setTranscoderPath('/jsm/libs/basis/').detectSupport(renderer);
        
        // GLTFLoaderとKTX2Loader、MeshoptDecoderを設定
        const gltfLoader = new GLTFLoader().setKTX2Loader(ktx2Loader).setMeshoptDecoder(MeshoptDecoder);

        // モデルの読み込みと表示
        gltfLoader.load('/models/gltf/facecap.glb', (gltf) => {
            const mesh = gltf.scene.children[0];
            scene.add(mesh);
            
            // モデルの設定
            mesh.scale.set(12, 12, 12); // モデルのスケール設定

            // アニメーションの設定
            const mixer = new THREE.AnimationMixer(mesh);
            const clip = gltf.animations[0];
            const action = mixer.clipAction(clip);
            action.play();

            // カメラの初期位置と向きを設定
            camera.position.set(0, 1, 3);
            camera.lookAt(0, 1, 0);

            // OrbitControlsの設定
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.minDistance = 2.5;
            controls.maxDistance = 5;
            controls.minAzimuthAngle = -Math.PI / 2;
            controls.maxAzimuthAngle = Math.PI / 2;
            controls.maxPolarAngle = Math.PI / 1.8;
            controls.target.set(0, 0.15, -0.2);

            // レンダリングとアニメーションの設定
            const animate = () => {
                requestAnimationFrame(animate);
                mixer.update(0.01); // アニメーションの更新
                controls.update(); // OrbitControlsの更新
                renderer.render(scene, camera); // レンダリング
            };

            // アニメーションの開始
            animate();
        });

        // レンダラーの設定
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // ウィンドウサイズが変わった時の処理を追加
        window.addEventListener('resize', () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            // カメラのアスペクト比を更新
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();

            // レンダラーのサイズを更新
            renderer.setSize(newWidth, newHeight);
        });

        return () => {
            // コンポーネントがアンマウントされたときのクリーンアップ処理を行う場合はここで行う
        };
    }, []);

    return <div ref={sceneRef} />;
};

export default ThreeScene;
