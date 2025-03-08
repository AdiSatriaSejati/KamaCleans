import React, { useEffect, useState, useRef } from 'react';
import { 
    ref, 
    onValue, 
    set,
    remove,
    query,
    orderByChild 
} from 'firebase/database';
import { database } from '../../firebase/firebaseConfig';
import './OnlineTracker.css';

// Interval lebih lama untuk mengurangi operasi tulis
const CLEANUP_INTERVAL = 15000; // 15 detik
const SESSION_TIMEOUT = 60000; // 60 detik
const THROTTLE_TIME = 2000; // 2 detik

// Fungsi throttle untuk mengurangi frekuensi update
const throttle = (func, delay) => {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func(...args);
        }
    };
};

const OnlineTracker = () => {
    const [onlineUsers, setOnlineUsers] = useState(0);
    const sessionIdRef = useRef(`session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
    const userRef = useRef(null);
    const lastActivityRef = useRef(Date.now());
    
    useEffect(() => {
        // Gunakan database dari config file
        userRef.current = ref(database, `online_users/${sessionIdRef.current}`);
        
        // Set status pengunjung dengan throttling
        const updateUserStatus = throttle(() => {
            const now = Date.now();
            // Hanya update jika pengguna aktif (throttled)
            if (now - lastActivityRef.current < SESSION_TIMEOUT) {
                set(userRef.current, {
                    timestamp: now,
                    lastActive: now
                });
            }
        }, THROTTLE_TIME);

        // Update status awal
        updateUserStatus();

        // Setup interval untuk update status dengan interval lebih lama
        const intervalId = setInterval(updateUserStatus, CLEANUP_INTERVAL);

        // Event listeners untuk mendeteksi aktivitas pengguna
        const handleUserActivity = throttle(() => {
            lastActivityRef.current = Date.now();
            updateUserStatus();
        }, THROTTLE_TIME);

        // Track aktivitas pengguna
        window.addEventListener('mousemove', handleUserActivity, { passive: true });
        window.addEventListener('keydown', handleUserActivity, { passive: true });
        window.addEventListener('click', handleUserActivity, { passive: true });
        window.addEventListener('scroll', handleUserActivity, { passive: true });
        window.addEventListener('touchstart', handleUserActivity, { passive: true });

        // Monitor jumlah pengunjung online
        const onlineRef = ref(database, 'online_users');
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
            // Hapus referensi user saat meninggalkan halaman
            remove(userRef.current);
            
            // Hapus event listeners
            window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);
            window.removeEventListener('click', handleUserActivity);
            window.removeEventListener('scroll', handleUserActivity);
            window.removeEventListener('touchstart', handleUserActivity);
        };
    }, []);

    // Jika belum ada data, jangan render apa-apa
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

// Gunakan React.memo untuk menghindari render ulang yang tidak perlu
export default React.memo(OnlineTracker);