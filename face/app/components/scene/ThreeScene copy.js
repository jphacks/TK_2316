import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

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

        gltfLoader.load('/models/gltf/facecap.glb', (gltf) => {
            const mesh = gltf.scene.children[0];
            scene.add(mesh);
            // ... モデルの設定とアニメーションの処理 ...
            // モデルの設定
            // mesh.rotation.set(0, Math.PI, 0); // モデルの回転設定
            mesh.scale.set(2,2,2); // モデルのスケール設定

            // アニメーションの設定
            const mixer = new THREE.AnimationMixer(mesh);
            const clip = gltf.animations[0];
            const action = mixer.clipAction(clip);
            action.play();
        });

        // レンダラーの設定
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // カメラの初期位置と向きを設定
        camera.position.set(0, 1, 3);
        camera.lookAt(0, 1, 0);

        // アニメーションループの設定
        const animate = () => {
            requestAnimationFrame(animate);

            // レンダリング
            renderer.render(scene, camera);
        };

        // アニメーションの開始
        animate();

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
