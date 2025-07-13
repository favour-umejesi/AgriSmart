import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs 
} from "firebase/firestore";
import { db } from "./firebase";

// Create or update user profile in Firestore
export const createUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

// Get user profile from Firestore
export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const data = userSnap.data();
      // Convert Firestore timestamps to JavaScript Date objects
      return {
        ...data,
        createdAt: data.createdAt ? data.createdAt.toDate() : null,
        updatedAt: data.updatedAt ? data.updatedAt.toDate() : null,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userId, updates) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: new Date(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Get users by role
export const getUsersByRole = async (role) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userRole", "==", role));
    const querySnapshot = await getDocs(q);
    
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return users;
  } catch (error) {
    console.error("Error getting users by role:", error);
    throw error;
  }
};

// Check if user profile exists
export const checkUserProfile = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists();
  } catch (error) {
    console.error("Error checking user profile:", error);
    throw error;
  }
}; 