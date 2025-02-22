import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
    getDatabase, 
    ref, 
    onValue, 
    set,
    remove,
    serverTimestamp,
    query,
    orderByChild,
} from 'firebase/database';
import './OnlineTracker.css';

const CLEANUP_INTERVAL = 5000; // 5 detik
const SESSION_TIMEOUT = 30000; // 30 detik (reduced for testing)

// Konfigurasi Firebase dari environment variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inisialisasi Firebase App
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const OnlineTracker = () => {
    const [onlineUsers, setOnlineUsers] = useState(0);
    const [connectionError, setConnectionError] = useState(false);

    useEffect(() => {
        const cachedCount = localStorage.getItem('onlineUsersCount');
        if (cachedCount) {
            setOnlineUsers(parseInt(cachedCount));
        }

        try {
            const onlineRef = ref(database, 'online');
            const userCountRef = ref(database, 'userCount');
            const connectedRef = ref(database, '.info/connected');

            onValue(connectedRef, (snap) => {
                if (snap.val()) {
                    const userRef = ref(database, `online/${Date.now()}`);
                    set(userRef, {
                        timestamp: serverTimestamp(),
                        lastActive: Date.now()
                    });
                    set(ref(database, `online/${userRef.key}/disconnectedAt`), serverTimestamp());
                }
            });

            onValue(userCountRef, (snapshot) => {
                const count = snapshot.val() || 0;
                setOnlineUsers(count);
                localStorage.setItem('onlineUsersCount', count.toString());
            });

            // Perbaikan pada bagian cleanup
            const cleanup = setInterval(() => {
                const now = Date.now();
                const activeUsersQuery = query(onlineRef, orderByChild('lastActive'));
                
                // Menggunakan onValue sebagai pengganti .on
                onValue(activeUsersQuery, (snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        const userData = childSnapshot.val();
                        if (now - userData.lastActive > SESSION_TIMEOUT) {
                            remove(ref(database, `online/${childSnapshot.key}`));
                        }
                    });
                });
            }, CLEANUP_INTERVAL);

            return () => {
                clearInterval(cleanup);
                // Membersihkan listeners saat komponen unmount
                onValue(connectedRef, () => {});
                onValue(userCountRef, () => {});
            };

        } catch (error) {
            console.error('Firebase connection error:', error);
            setConnectionError(true);
        }
    }, []);

    if (connectionError) return null;

    return (
        <div className="online-tracker" style={{ position: 'relative' }}>
            <div className="tracker-container">
                <div className="online-count">
                    <span className="pulse"></span>
                    <span>{onlineUsers} online</span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(OnlineTracker);