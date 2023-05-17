import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';
import reportWebVitals from './reportWebVitals';
import{BrowserRouter} from 'react-router-dom'
import {AuthProvider}from './context/auth.js'
import { SearchProvider } from './context/search';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <SearchProvider>

            
 <BrowserRouter>
 {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
    </BrowserRouter>
        </SearchProvider>
    </AuthProvider>
);

reportWebVitals();
