import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { 
    getDatabase, 
    ref, 
    onValue, 
    set,
    remove,
    serverTimestamp,
    query,
    orderByChild 
} from 'firebase/database';
import './OnlineTracker.css';

const CLEANUP_INTERVAL = 5000; // 5 detik
const SESSION_TIMEOUT = 30000; // 30 detik

const OnlineTracker = () => {
    const [onlineUsers, setOnlineUsers] = useState(0);

    useEffect(() => {
        // Inisialisasi Firebase
        const app = initializeApp({
            apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
            authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
            databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
            projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
            storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
            appId: import.meta.env.VITE_FIREBASE_APP_ID
        });

        const db = getDatabase(app);
        
        // Generate session ID unik untuk setiap kunjungan
        const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const userRef = ref(db, `online_users/${sessionId}`);
        
        // Set status pengunjung
        const updateUserStatus = () => {
            set(userRef, {
                timestamp: Date.now(),
                lastActive: Date.now()
            });
        };

        // Update status awal
        updateUserStatus();

        // Setup interval untuk update status
        const intervalId = setInterval(updateUserStatus, CLEANUP_INTERVAL);

        // Monitor jumlah pengunjung online
        const onlineRef = ref(db, 'online_users');
        const activeUsersQuery = query(onlineRef, orderByChild('lastActive'));
        
        const unsubscribe = onValue(activeUsersQuery, (snapshot) => {
            const now = Date.now();
            let activeCount = 0;

            snapshot.forEach((childSnapshot) => {
                const userData = childSnapshot.val();
                if (now - userData.lastActive < SESSION_TIMEOUT) {
                    activeCount++;
                }
            });

            setOnlineUsers(activeCount);
        });

        // Cleanup saat component unmount
        return () => {
            clearInterval(intervalId);
            unsubscribe();
            remove(userRef);
        };
    }, []);

    if (!onlineUsers) return null;

    return (
        <div className="online-tracker">
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