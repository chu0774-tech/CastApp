import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSQE2Ysc14Qx3GsyETYGDd5mqu4HkAUjo",
  authDomain: "kiris-genealogia.firebaseapp.com",
  projectId: "kiris-genealogia",
  storageBucket: "kiris-genealogia.firebasestorage.app",
  messagingSenderId: "842320330239",
  appId: "1:842320330239:web:77019ffaba4a75903b3bca"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Save single bird immediately
export async function saveBird(bird) {
  try {
    await setDoc(doc(db, "birds", bird.id), JSON.parse(JSON.stringify(bird)));
    console.log("✅ Saved to Firebase:", bird.name);
    return true;
  } catch (e) {
    console.error("❌ Error saving bird:", e);
    return false;
  }
}

// Load all birds from Firestore
export async function loadBirdsFromFirestore() {
  try {
    const snapshot = await getDocs(collection(db, "birds"));
    const birds = [];
    snapshot.forEach(d => birds.push(d.data()));
    console.log("✅ Loaded from Firebase:", birds.length, "birds");
    return birds.length > 0 ? birds : null;
  } catch (e) {
    console.error("❌ Error loading birds:", e);
    return null;
  }
}

// Save ALL birds at once
export async function saveAllBirds(birds) {
  try {
    for (const bird of birds) {
      await setDoc(doc(db, "birds", bird.id), JSON.parse(JSON.stringify(bird)));
    }
    console.log("✅ Saved all birds to Firebase:", birds.length);
    return true;
  } catch (e) {
    console.error("❌ Error saving all birds:", e);
    return false;
  }
}

// Delete a bird
export async function deleteBird(birdId) {
  try {
    await deleteDoc(doc(db, "birds", birdId));
    return true;
  } catch (e) {
    console.error("❌ Error deleting bird:", e);
    return false;
  }
}
