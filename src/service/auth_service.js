import firebase from 'firebase';
import firebaseApp from './firebase'

class AuthService {
    login(providerName) {
        const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
        return firebaseApp.auth().signInWithPopup(authProvider);
    }
}

export default AuthService

/*
AuthService Class Component: 사용자의 로그인 및 로그아웃 관리
providerName: Google, GitHub..  
*/