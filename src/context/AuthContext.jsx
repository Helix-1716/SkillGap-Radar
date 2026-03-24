import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  auth, 
  onAuthStateChanged, 
  googleProvider, 
  githubProvider, 
  signInWithPopup, 
  signOut 
} from "../lib/firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fallback avatar generator
  const getFallbackAvatar = (name) => {
    const seed = name || "User";
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Hydrate profile from Auth object initially
        // In a real app, you'd fetch from Firestore here
        const userProfile = {
          uid: currentUser.uid,
          displayName: currentUser.displayName || "Elite Pilot",
          email: currentUser.email,
          photoURL: currentUser.photoURL || getFallbackAvatar(currentUser.displayName),
          provider: currentUser.providerData[0]?.providerId || "email",
          lastLogin: new Date().toISOString()
        };
        setUser(currentUser);
        setProfile(userProfile);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      setLoading(false);
      console.error("Google Auth Error:", error);
      throw error;
    }
  };

  const loginWithGithub = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, githubProvider);
      return result.user;
    } catch (error) {
      setLoading(false);
      console.error("Github Auth Error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
      throw error;
    }
  };

  const getProfileImage = () => {
    if (profile?.customPhotoURL) return profile.customPhotoURL;
    if (profile?.photoURL) return profile.photoURL;
    return getFallbackAvatar(profile?.displayName);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      loading, 
      loginWithGoogle, 
      loginWithGithub, 
      logout,
      getProfileImage,
      setProfile // For manual updates from Profile page
    }}>
      {children}
    </AuthContext.Provider>
  );
};
