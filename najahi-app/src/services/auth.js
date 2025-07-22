// src/services/auth.js - SIMPLIFIED VERSION
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile as updateFirebaseProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AUTH_STORAGE_KEY = 'najahi-auth';

const storeAuthData = (data) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
};

const loadAuthData = () => {
  const data = localStorage.getItem(AUTH_STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

const clearAuthData = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

// Register new user - NO FIRESTORE
export const register = async (userData) => {
  try {
    console.log('Registering user:', userData);
    
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      userData.email, 
      userData.password
    );
    
    const user = userCredential.user;
    
    // Update user profile with display name
    await updateFirebaseProfile(user, {
      displayName: userData.fullName || userData.name
    });
    
    const authData = {
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified
      },
      token: await user.getIdToken()
    };
    
    storeAuthData(authData);
    return authData;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Store additional data in localStorage instead of Firestore
export const verifyPhone = async (code, phone) => {
  try {
    console.log('Verifying phone:', phone, 'with code:', code);
    
    if (code.length !== 4) {
      throw new Error('Invalid verification code');
    }
    
    // Store in localStorage instead of Firestore
    const authData = loadAuthData();
    const updatedAuth = {
      ...authData,
      user: {
        ...authData.user,
        phone: phone,
        phoneVerified: true
      }
    };
    
    storeAuthData(updatedAuth);
    return updatedAuth;
  } catch (error) {
    console.error('Phone verification error:', error);
    throw error;
  }
};

// Store profile data in localStorage
export const updateProfile = async (profileData) => {
  try {
    console.log('Updating profile:', profileData);
    
    const authData = loadAuthData();
    const updatedAuth = {
      ...authData,
      user: {
        ...authData.user,
        level: profileData.level,
        filiere: profileData.filiere,
        school: profileData.school,
        city: profileData.city
      }
    };
    
    storeAuthData(updatedAuth);
    return updatedAuth;
  } catch (error) {
    console.error('Profile update error:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    console.log('Logging in user:', credentials.email);
    
    const userCredential = await signInWithEmailAndPassword(
      auth, 
      credentials.email, 
      credentials.password
    );
    
    const user = userCredential.user;
    
    const authData = {
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified
      },
      token: await user.getIdToken()
    };
    
    storeAuthData(authData);
    return authData;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    clearAuthData();
  } catch (error) {
    console.error('Logout error:', error);
    clearAuthData();
    throw error;
  }
};

export const isAuthenticated = () => {
  const authData = loadAuthData();
  return !!authData && !!authData.token;
};

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export default {
  register,
  verifyPhone,
  updateProfile,
  login,
  logout,
  isAuthenticated,
  onAuthStateChange,
  loadAuthData,
};