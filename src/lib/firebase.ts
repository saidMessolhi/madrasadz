import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

let app: any = null;
let auth: any = null;
let db: any = null;

export async function getFirebase() {
  if (!app) {
    try {
      // In Vite, we can try to fetch the config file
      const response = await fetch('/firebase-applet-config.json');
      if (!response.ok) throw new Error('Config not found');
      const config = await response.json();
      
      app = initializeApp(config);
      auth = getAuth(app);
      db = getFirestore(app, config.firestoreDatabaseId);

      // Validate connection
      const testConnection = async () => {
        try {
          await getDocFromServer(doc(db, 'test', 'connection'));
        } catch (error) {
          if (error instanceof Error && error.message.includes('offline')) {
            console.error("Firebase is offline. Check your configuration.");
          }
        }
      };
      testConnection();
    } catch (e) {
      console.warn("Firebase configuration not found or invalid. Please complete the setup in the UI.");
      return { app: null, auth: null, db: null };
    }
  }
  return { app, auth, db };
}
