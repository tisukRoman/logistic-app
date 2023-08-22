import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

export const getItem = async (collectionName, id) => {
  const snap = await getDoc(doc(db, collectionName, id));
  if (snap.exists()) {
    return snap.data();
  }
};

export const getList = async (collectionName) => {
  const ref = collection(db, collectionName);
  const q = query(ref);
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
export const getListWhere = async (collectionName, prop, value) => {
  const ref = collection(db, collectionName);
  const q = query(ref, where(prop, '==', value));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const updateItem = async (collectionName, id, payload) => {
  await setDoc(doc(db, collectionName, id), payload);
};

export const createItem = async (collectionName, payload) => {
  await addDoc(collection(db, collectionName), payload);
};

export const deleteItem = async (collectionName, id) => {
  await deleteDoc(doc(db, collectionName, id));
};

export const signup = async (collectionName, payload) => {
  const { user } = await createUserWithEmailAndPassword(
    auth,
    payload.email,
    payload.password
  );
  await setDoc(doc(db, collectionName, user.uid), payload);
};

export const logout = () => {
  return signOut(auth);
};

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const getItemsByProp = async (collectionName, propName, propValue) => {
  const q = query(
    collection(db, collectionName),
    where(propName, '==', propValue)
  );
  const querySnapshot = await getDocs(q);
  const res = [];
  querySnapshot.forEach((doc) => res.push({ ...doc.data(), id: doc.id }));
  return res;
};
