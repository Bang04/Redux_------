import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
//전체 애플리케이션에 리덕스 스토어를 제공하는 방법
root.render(<Provider store = {store} ><App /></Provider>);
