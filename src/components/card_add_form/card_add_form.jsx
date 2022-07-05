import React, { useRef, useState } from 'react';
import Button from '../button/button';
import styles from './card_add_form.module.css'

const CardAddForm = ({ FileInput, onAdd }) => {
    const formRef = useRef();
    const nameRef = useRef();
    const companyRef = useRef();
    const themeRef = useRef();
    const titleRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();
    const [file, setFile] = useState({ fileName: null, fileURL: null });

    const onFileChange = file => {
        setFile({
            fileName: file.name,
            fileURL: file.url,
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const card = {
            id: Date.now(),
            name : nameRef.current.value || '',
            company : companyRef.current.value || '',
            theme : themeRef.current.value,
            title : titleRef.current.value || '',
            email : emailRef.current.value || '',
            message : messageRef.current.value || '',
            fileName: file.fileName || '',
            fileURL: file.fileURL || '',
        };
        formRef.current.reset(); //제출 시, value reset
        setFile({ fileName: null, fileURL: null })
        onAdd(card);
    }

    return (
        <form ref={formRef} className={styles.form}>
            <input ref={nameRef} className={styles.input} type="text" name="name" placeholder="Name" />
            <input ref={companyRef} className={styles.input} type="text" name="company" placeholder="Company" />
            <select  ref={themeRef} className={styles.select} name="theme" placeholder="Theme">
                <option placeholder="light">light</option>
                <option placeholder="dark">dark</option>
                <option placeholder="colorful">colorful</option>
            </select>
            <input ref={titleRef} className={styles.input} type="text" name="title" placeholder="Title" />
            <input ref={emailRef} className={styles.input} type="text" name="email" placeholder="Email" />
            <textarea ref={messageRef} className={styles.textarea} name="message" placeholder="Message"></textarea>
            <div className={styles.fileInput}>
                <FileInput name={file.fileName} onFileChange={onFileChange}/>
            </div>
            <Button name='Add' onClick={onSubmit} />
        </form>
    );
};

export default CardAddForm;


/*
[CardAddForm 생성과정]
1. CardEditForm 폴더복사
2. value는 placeholder로 변경
3. CardAddForm에 map을 통해 정보를 전달해주는 editor에 CardAddForm추가
4. useRef를 통해 입력값 받아오기
5. onAdd에 값을 전달하여 Maker에서 새로운 카드를 생성 

[Etc.]
특정 키워드 자동선택: Ctrl + D
다중선택(드래그사용): Alt + Shift
커서이동: 방향키 단독사용(한 칸씩 이동) or Ctrl + 방향키사용(가장 좌측 혹은 우측이동)
*/