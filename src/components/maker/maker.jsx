import { useState } from 'react';
import Header from '../header/header'
import Footer from '../footer/footer'
import React, { useEffect } from 'react';
import styles from './maker.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ FileInput, authService, cardRepository }) => {
    const location = useLocation();
    const [cards, setCards] = useState({});
    const [userId, setUserId] = useState(location.state.id);

    const navigate = useNavigate();

    const onLogout = () => {
        authService.logout();
    };

    //사용자 아이디 변경시 마다 DB정보 업데이트
    useEffect(() => {
        if(!userId) {
            return;
        }
        const stopSync = cardRepository.syncCards(userId, cards => {
            setCards(cards);//cards를 두 번째 인자로 전달하여 onUpdate발생 시 value를 cards에 할당
        })
        return () => stopSync();
        //컴포넌트 언마운트 시 정리해야 하는 일을 콜백함수 형태로 useEffect에서 리턴해주면, 리액트가 자동으로 언마우트 시 호출
        //ref.off()가 stopSync에 할당 -> 언마운트시 stopSync실행 -> 할당된 ref.off()실행
    }, [userId]);

    //로그인 구현
    useEffect(() => {
        authService.onAuthChange(user => {
            if(user) {
                
                //console.log(`user ${user}`)
            } else {
                navigate('/');
            }
        });
        //사용자의 정보변경이 발생한 경우 실행되며, 로그아웃으로 인해 정보가 남아있지 않다면 Home으로 화면이동
    });

    const createOrUpdateCard = card => {
        setCards(cards => {
            const updated = { ...cards };
            updated[card.id] = card; //해당하는 key에 card업데이트
            return updated; 
            });
        cardRepository.saveCard(userId, card); //userId와 업데이트 할 card전달
        
        /*
        =============================================================================
        [기존의 map을 사용하는 업데이트 방식]
        예제코드: 
        if (card.id === item.id) {
            return ---
        }
        return item;
        단점: 모든 목록을 돌아야 함으로 리스트 수가 많아질수록 성능이 저하됨
        개선방법: card를 배열에 저장하는 대신 id를 key로 이용하고 card 내부의 오브젝트를 value로 사용
            1. id['']와 같은 코드작성을 통해 원하는 데이터를 받아오고 업데이트 할 수 있음
            2. 위와 같이 useState를 배열이 아닌 방식으로 수정
            3. 배열이 아님으로 map사용 시 card안에 있는 모든 key를 돌 수 있도록 수정
            4. maker에서 map을 사용하지 않고 [card.id]를 통해 접근
        =============================================================================
        [setState의 다른 사용법]
        아래와 같은 방식으로 코드를 작성할 경우, 복사하는 cards가 최신버전이 아닐 수 있으므로 위와 같이 코드를 작성하여 setCards를 부를때의 상태를 update에 복사할 수 있음

        const updated = {...cards};
        updated[card.id] = card; 
        setCards(updated);
        */
    }

    const deleteCard = card => {
        setCards(cards => {
            const updated = { ...cards };
            delete updated[card.id] 
            return updated; 
            });
        cardRepository.removeCard(userId, card);
    }

    return(
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor 
                    FileInput={FileInput}
                    cards={cards} 
                    addCard={createOrUpdateCard} 
                    updateCard={createOrUpdateCard} 
                    deleteCard={deleteCard}/>
                <Preview cards={cards}/>
            </div>
            <Footer />
        </section>
    )
}

export default Maker;