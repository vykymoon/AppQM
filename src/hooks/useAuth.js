// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { auth } from '../Firebase';
import { doc, getDoc } from 'firebase/firestore'; // Añade esta importación
import { db } from '../Firebase'; // Asegúrate de exportar db desde Firebase.js

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null); // Datos adicionales del usuario
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Obtener datos adicionales del usuario desde Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { currentUser, userData, loading };
}