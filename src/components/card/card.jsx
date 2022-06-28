import React from 'react';
import styles from './card.module.css'

const DEFAULT_IMAGE = '/images/default_logo.png'

const Card = ({ card }) => {
    const {name, company, title, email, message, theme, fileName, fileURL} = card;
    const url = fileURL || DEFAULT_IMAGE; //fileURL이 없다면 DEFAULT_IMAGE사용

    return(
        <li className={`${styles.card} ${getStyles(theme)}`}>
            <img className={styles.avatar} src={url} alt="profile photo" />
            <div className={styles.info}>
                <h1 className={styles.name}>{name}</h1>
                <p className={styles.company}>{company}</p>
                <p className={styles.title}>{title}</p>
                <p className={styles.email}>{email}</p>
                <p className={styles.message}>{message}</p>
            </div>
        </li>
    );
};

function getStyles(theme) {
    switch (theme) {
        case 'dark':
            return styles.dark;
        case 'light':
            return styles.light;
        case 'colorful':
            return styles.colorful;
        default:
            throw new Error(`unkown theme: ${theme}`);
    }
}

export default Card;

/*
getStyles(): 전달받은 theme에 따라 스타일을 적용하는 함수

switch문: 변수의 값에 따라서 문장을 실행할 수 있도록 하는 제어문으로 사용되는 키워드는  switch, case, default, break이다.
    - switch(변수)
    - case(변수가 --라면)
    - default(설정한 case외 변수가 들어온다면)
    - break(switch문 탈출)
*/
