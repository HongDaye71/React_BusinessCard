import React, { useEffect } from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ authService }) => {
  const navigate = useNavigate();
  const goToMaker = (userId) => {
    navigate(
      '/maker', 
      { state: {id: userId} });
  }

  useEffect(() => {
    authService.onAuthChange(
      user => {user && goToMaker(user.id) 
      //사용자의 정보변경이 발생한 경우 실행되며, 이전 로그인으로 인해 정보가 남아있다면 Maker로 화면이동
    })
  })

  const onLogin = event => {
    authService //
      .login(event.currentTarget.textContent) //ProviderName으로는 버튼에 들어있는 텍스트 사용
      .then(data => goToMaker(data.user.uid));
  };
  return (
    <section className={styles.login}>
      <Header />
      <section>
        <h1>Login</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Google
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Github
            </button>
          </li>
        </ul>
      </section>
      <Footer />

    </section>
  );
};

export default Login;
