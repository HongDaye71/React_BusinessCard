import { useState } from 'react';
import Header from '../header/header'
import Footer from '../footer/footer'
import React, { useEffect } from 'react';
import styles from './maker.module.css';
import { useNavigate } from 'react-router-dom';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ authService }) => {
    const [cards, setCards] = useState([
        {
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
        {
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
        {
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
    ])

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

    return(
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor cards={cards}/>
                <Preview cards={cards}/>
            </div>
            <Footer />
        </section>
    )
}

export default Maker;