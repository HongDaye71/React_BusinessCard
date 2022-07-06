import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import AuthService from './service/auth_service'
import ImageUploader from './service/image_uploader';
import Image_file_input from './components/image_file_input/image_file_input';
import CardRepository from './service/card_repository';

const authService =  new AuthService();
const cardRepository = new CardRepository();
const imageUploader = new ImageUploader();
const FileInput = props => (
<Image_file_input {...props} imageUploader={imageUploader}/>
) 
/*
FileInput: props를 받으면 Image_file_input을 생성하여 전달(props자동전달)
-> 사용자는 FileInput을 사용해 원하는 모든 props을 FileInput을 통해 전달할 수 있다 (Dependency Injection을 사용하지 않는 경우, imageUploaderA, imageUploaderB전달 시 두 개의 props를 각각 전달해야 하지만 위와같이 Dependency Injection을 사용하면 FileInput하나로 두 개의 props를 전달할 수 있다)*/


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App 
      authService={authService} 
      FileInput={FileInput}
      cardRepository={cardRepository}/>
  </React.StrictMode>
);

reportWebVitals();
 