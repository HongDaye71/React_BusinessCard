import { useState } from 'react';
import Header from '../header/header'
import Footer from '../footer/footer'
import React, { useEffect } from 'react';
import styles from './maker.module.css';
import { useNavigate } from 'react-router-dom';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ FileInput, authService }) => {
    const [cards, setCards] = useState({
        1: {
            id: '1',
            name: 'Ellie',
            company: 'Samsung',
            theme: 'light',
            title: 'Software Engineer',
            email: 'ellie@gmail.com',
            message: 'go for it',
            fileName: 'ellie',
            fileURL : null
        },
        2: {
            id: '2',
            name: 'Daye',
            company: 'Hyundai',
            theme: 'dark',
            title: 'Software Engineer',
            email: 'hongdaye71@gmail.com',
            message: 'go for it',
            fileName: 'daye',
            fileURL : null
        },
        3: {
            id: '3',
            name: 'Jihwan',
            company: 'Hanyang University',
            theme: 'colorful',
            title: 'Researcher',
            email: 'Jihwan@gmail.com',
            message: 'go for it',
            fileName: 'ellie',
            fileURL : null
        },
    });

    const navigate = useNavigate();

    const onLogout = () => {
        authService.logout();
    };

    useEffect(() => {
        authService.onAuthChange(user => {
            if(!user) {
                navigate('/');
                console.log('clicked logout button')
            }
        });
        //사용자의 정보변경이 발생한 경우 실행되며, 로그아웃으로 인해 정보가 남아있지 않다면 Home으로 화면이동
    })

    const createOrUpdateCard = card => {
        setCards(cards => {
            const updated = { ...cards };
            updated[card.id] = card; //해당하는 key에 card업데이트
            return updated; 
            });
        
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