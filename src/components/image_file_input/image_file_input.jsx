import React, { useRef, useState }from 'react';
import styles from './image_file_input.module.css';

const Image_file_input = ({ imageUploader, name, onFileChange }) => {
    const [loading, setLoading] = useState(false); //boolean state
    const inputRef = useRef();
    const onButtonClick = (event) => {
        event.preventDefault();
        inputRef.current.click();
    }
    const onChange = async event => {
        setLoading(true);
        const uploaded = await imageUploader.upload(event.target.files[0]); 
        //업로드가 완료되면, uploaded에 taget.files[0]할당
        setLoading(false);

        onFileChange({
            name: uploaded.original_filename,
            url: uploaded.url,
        })
    };

    return <div className={styles.container}>
        <input 
            ref={inputRef}
            className={styles.input} 
            type="file" 
            accept="image/*" 
            name="file" 
            onChange={onChange}/>
        { !loading && <button className={`${styles.button} ${name ? styles.pink: styles.grey}`} onClick={onButtonClick}> {name || 'No file'} 
        </button> }
        { loading && <div className={styles.loading}></div>}
    </div>
};

export default Image_file_input;

/*
[onButtonClick]
인풋의 UI를 수정할 수 없으므로 style을 사용하여 인풋은 보이지 않도록 하고 버튼클릭 시 인풋을 클릭하는 효과를 나타내도록 함

[onChange]
버튼(인풋)이 클릭되었을 때, 사진을 업로드하고 URL을 받아옴

[Etc.]
Promise: 비동기 처리에 활용되는 객체로 async사용 시 .then등을 사용할 수 있다.
*/