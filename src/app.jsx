import styles from './app.module.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import Maker from './components/maker/maker';

function App({ authService }) {
  return (
  <div className={styles.app}>
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Login authService={authService}/>} />
        <Route path='/maker' exact element={<Maker authService={authService}/>} /> 
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
