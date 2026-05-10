import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  onSnapshot
} from 'firebase/firestore';
import { getFirebase } from '../lib/firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

async function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const { auth } = await getFirebase();
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const schoolService = {
  // Generic CRUD
  async add(collectionName: string, data: any) {
    try {
      const { db } = await getFirebase();
      if (!db) throw new Error("Database not initialized");
      return await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: Date.now()
      });
    } catch (error) {
      await handleFirestoreError(error, OperationType.CREATE, collectionName);
    }
  },

  async getAll(collectionName: string) {
    try {
      const { db } = await getFirebase();
      if (!db) throw new Error("Database not initialized");
      const snapshot = await getDocs(collection(db, collectionName));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      await handleFirestoreError(error, OperationType.LIST, collectionName);
    }
  },

  async update(collectionName: string, id: string, data: any) {
    try {
      const { db } = await getFirebase();
      if (!db) throw new Error("Database not initialized");
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, { ...data, updatedAt: Date.now() });
    } catch (error) {
      await handleFirestoreError(error, OperationType.UPDATE, `${collectionName}/${id}`);
    }
  },

  async delete(collectionName: string, id: string) {
    try {
      const { db } = await getFirebase();
      if (!db) throw new Error("Database not initialized");
      await deleteDoc(doc(db, collectionName, id));
    } catch (error) {
      await handleFirestoreError(error, OperationType.DELETE, `${collectionName}/${id}`);
    }
  },

  // Specific queries
  async getStudentsByLevel(level: string) {
    try {
      const { db } = await getFirebase();
      if (!db) throw new Error("Database not initialized");
      const q = query(collection(db, 'students'), where('level', '==', level));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      await handleFirestoreError(error, OperationType.LIST, 'students');
    }
  }
};
