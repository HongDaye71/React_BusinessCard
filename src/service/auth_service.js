import firebase from 'firebase';
import firebaseApp from './firebase'

class AuthService {
    login(providerName) {
        const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
        return firebaseApp.auth().signInWithPopup(authProvider);
    }

    logout() {
        firebase.auth().signOut();
    }

    onAuthChange(onUserChanged) {
        firebase.auth().onAuthStateChanged(user => {
            onUserChanged(user);
        })
    }
}

export default AuthService

/*
AuthService Class Component: 사용자의 로그인 및 로그아웃 관리
providerName: Google, GitHub..

onAuthChange(): onUserChanged() 콜백함수를 받아 사용자가 바뀔 때마다 onUserChanged에 사용자 정보 전달
*/