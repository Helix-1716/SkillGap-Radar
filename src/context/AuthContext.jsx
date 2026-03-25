import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  auth, 
  onAuthStateChanged, 
  googleProvider, 
  githubProvider, 
  signInWithPopup, 
  signOut 
} from "../lib/firebase";
import { supabase } from "../lib/supabase";

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

  // Upsert user profile into Supabase
  const upsertProfile = async (currentUser) => {
    const profileData = {
      id: currentUser.uid,
      display_name: currentUser.displayName || "Elite Pilot",
      email: currentUser.email,
      photo_url: currentUser.photoURL || getFallbackAvatar(currentUser.displayName),
      provider: currentUser.providerData[0]?.providerId || "email",
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from("profiles")
      .upsert(profileData, { onConflict: "id" })
      .select()
      .single();

    if (error) {
      console.error("Supabase profile upsert error:", error);
      // Return a local fallback so the app still works
      return {
        ...profileData,
        title: "",
        location: "",
        bio: "",
        created_at: new Date().toISOString()
      };
    }
    return data;
  };

  // Log security event to Supabase
  const logSecurityEvent = async (userId, title, description = "") => {
    const deviceInfo = navigator.userAgent;
    const { error } = await supabase.from("security_logs").insert({
      user_id: userId,
      type: "event",
      title,
      description,
      device: deviceInfo,
      location: Intl.DateTimeFormat().resolvedOptions().timeZone,
      status: "active"
    });
    if (error) console.error("Security log error:", error);
  };

  // Log session to Supabase
  const logSession = async (userId) => {
    const deviceInfo = navigator.userAgent;
    const { error } = await supabase.from("security_logs").insert({
      user_id: userId,
      type: "session",
      title: deviceInfo.substring(0, 80),
      description: "Active session",
      device: deviceInfo,
      location: Intl.DateTimeFormat().resolvedOptions().timeZone,
      status: "current"
    });
    if (error) console.error("Session log error:", error);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          setUser(currentUser);
          
          // Upsert profile in Supabase and hydrate state
          const supabaseProfile = await upsertProfile(currentUser);
          setProfile({
            uid: currentUser.uid,
            displayName: supabaseProfile.display_name || currentUser.displayName || "Elite Pilot",
            email: supabaseProfile.email || currentUser.email,
            photoURL: supabaseProfile.photo_url || currentUser.photoURL || getFallbackAvatar(currentUser.displayName),
            provider: supabaseProfile.provider || "email",
            title: supabaseProfile.title || "",
            location: supabaseProfile.location || "",
            bio: supabaseProfile.bio || "",
            lastLogin: new Date().toISOString()
          });
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (err) {
        console.error("Auth sync error:", err);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      // Log login event
      await logSecurityEvent(result.user.uid, "Login via Google", "User authenticated with Google OAuth");
      await logSession(result.user.uid);
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
      // Log login event
      await logSecurityEvent(result.user.uid, "Login via GitHub", "User authenticated with GitHub OAuth");
      await logSession(result.user.uid);
      return result.user;
    } catch (error) {
      setLoading(false);
      console.error("Github Auth Error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (user) {
        await logSecurityEvent(user.uid, "User Logged Out", "Session terminated by user");
      }
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
      throw error;
    }
  };

  const updateProfile = async (updates) => {
    if (!user) return;
    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq("id", user.uid)
      .select()
      .single();

    if (!error && data) {
      setProfile(prev => ({
        ...prev,
        displayName: data.display_name || prev.displayName,
        title: data.title || "",
        location: data.location || "",
        bio: data.bio || "",
      }));
    }
    return { data, error };
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
      updateProfile,
      setProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
