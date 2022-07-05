import React, { useRef } from 'react';
import Button from '../button/button';
import styles from './card_edit_form.module.css'

const Card_edit_form = ({ FileInput, card, updateCard, deleteCard }) => {
    const nameRef = useRef();
    const companyRef = useRef();
    const themeRef = useRef();
    const titleRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();

    const {
        name,
        company,
        theme,
        title,
        email,
        message,
        fileName,
    } = card;
    
    const onFileChange = file => {
        updateCard({
            ...card,
            fileName: file.name,
            fileURL: file.url,
        })
    }
    
    const onChange = (event) => {
        if (event.currentTarget == null) {
            return;
        }
        event.preventDefault();
        updateCard({ 
            ...card, //기존 card의 key,value사용
            [event.currentTarget.name]: event.currentTarget.value, //name만 현재 입력된 값으로 변경사용
        })
    }

    const onSubmit = (event) => {
        deleteCard(card);
    }

    return (
        <form className={styles.form}>
            <input className={styles.input} type="text" name="name" ref={nameRef} value={name} onChange={onChange}/>
            <input className={styles.input} type="text" name="company" ref={companyRef} value={company} onChange={onChange}/>
            <select className={styles.select} name="theme" ref={themeRef} value={theme} onChange={onChange}>
                <option value="light">light</option>
                <option value="dark">dark</option>
                <option value="colorful">colorful</option>
            </select>
            <input className={styles.input} type="text" name="title" ref={titleRef} value={title} onChange={onChange}/>
            <input className={styles.input} type="text" name="email" ref={emailRef} value={email} onChange={onChange}/>
            <textarea className={styles.textarea} name="message" ref={messageRef} value={message} onChange={onChange}></textarea>
            <div className={styles.fileInput}>
                <FileInput name={fileName} onFileChange={onFileChange}/>
            </div>
            <Button name='Delete' onClick={onSubmit} />
        </form>
    );
};

export default Card_edit_form;

/*
[CardEditForm 수정과정(고정값 출력 -> 입력값 출력)]
1. useRef를 통해 입력값 받아오기
2. 입력값 업데이트 시 onChange() 호출
*/