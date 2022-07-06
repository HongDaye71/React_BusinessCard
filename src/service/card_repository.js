import firebaseApp from './firebase';

class CardRepository {
    //실시간 데이터베이스 추가 (value가 있다면 onUpdate(ref경로에 있는 모든 데이터 받아오기)실행)
    syncCards(userId, onUpdate) {
        const ref = firebaseApp.database().ref(`${userId}/cards`);
        ref.on('value', snapshot => {
            const value = snapshot.val();
            value && onUpdate(value);
        })
        return () => ref.off();
    }
    saveCard(userId, card) {
        firebaseApp.database().ref(`${userId}/cards/${card.id}`).set(card);
    }

    removeCard(userId, card) {
        firebaseApp.database().ref(`${userId}/cards/${card.id}`).remove();
    }
}

export default CardRepository;

/*
[Firebase 실시간 데이터베이스 추가하기]
1. Console -> Project Click -> Realtime Database - Create Database
2. 로그인 한 사용자의 ID에 맞게 해당하는 카드를 DB에 저장
    (1) 카드가 사용자 ID별로 저장되도록 설정 (ex. cardRepository.saveCard(userId, card));
        -> set: 데이터를 저장하는 API (ref: 데이터를 저장할 경로)
3. 실시간 데이터 베이스 추가 (card-maker 페이지 새로고침 시 데이터가 사라지지 않도록)
*/