import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCBvpaUNyD58NPcLW7LOzqxm2SVBYwVgS0",
    authDomain: "crown-clothing-db-7c91b.firebaseapp.com",
    projectId: "crown-clothing-db-7c91b",
    storageBucket: "crown-clothing-db-7c91b.appspot.com",
    messagingSenderId: "339035453317",
    appId: "1:339035453317:web:bfd7ee9fbcc7aac3c5b6ec"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error){
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef;
  };