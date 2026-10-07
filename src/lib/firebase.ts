// Firebase の初期化（ブラウザ側でのみ読み込む）
// ここの設定値はブラウザに公開される前提の値で、秘密情報ではない。
// データの保護は Firestore のセキュリティルール（firestore.rules）で行う。
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDhRoHgKeMiJbVf5Hy_2i2z68csyUl4sU8',
    authDomain: 'how-to-use-vcv-rack-ja.firebaseapp.com',
    projectId: 'how-to-use-vcv-rack-ja',
    storageBucket: 'how-to-use-vcv-rack-ja.firebasestorage.app',
    messagingSenderId: '615978577733',
    appId: '1:615978577733:web:e816279e7f4b8b253f582c',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.languageCode = 'ja';
export const db = getFirestore(app);
