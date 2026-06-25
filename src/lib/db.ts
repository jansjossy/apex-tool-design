import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import localData from './portfolio-data.json';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Helper to check if Firebase is configured
const isFirebaseConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  );
};

let db: any = null;

if (isFirebaseConfigured()) {
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

export interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  image: string;
  scale: string;
  dwg: string;
  tag: string;
}

export interface Service {
  code: string;
  title: string;
  description: string;
}

export interface Profile {
  title: string;
  dwgNo: string;
  date: string;
  location: string;
  highlights: string[];
}

export interface Hero {
  name: string;
  tagline: string;
  subtitle: string;
  leadDesigner: string;
  ref: string;
  est: string;
}

export interface Header {
  title: string;
  version: string;
  scale: string;
  status: string;
}

export interface Contact {
  title: string;
  description: string;
  email: string;
  location: string;
}

export interface PortfolioData {
  header: Header;
  hero: Hero;
  profile: Profile;
  projects: Project[];
  services: Service[];
  contact: Contact;
}

export async function getPortfolioData(): Promise<PortfolioData> {
  if (db) {
    try {
      const docRef = doc(db, 'portfolio', 'data');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as PortfolioData;
      } else {
        // Document doesn't exist, let's seed it with localData
        await setDoc(docRef, localData);
        return localData as PortfolioData;
      }
    } catch (error) {
      console.error('Error fetching from Firestore, falling back to local JSON:', error);
    }
  }
  // Fallback to local JSON
  return localData as PortfolioData;
}

export async function savePortfolioData(data: PortfolioData): Promise<boolean> {
  if (db) {
    try {
      const docRef = doc(db, 'portfolio', 'data');
      await setDoc(docRef, data);
      return true;
    } catch (error) {
      console.error('Error saving to Firestore:', error);
      return false;
    }
  }
  console.warn('Firebase not configured. Save ignored.');
  return false;
}
