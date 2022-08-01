import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App';
import Login from './containers/Login';
import Register from './containers/Register';
import Pricing from './containers/Pricing';
import reportWebVitals from './reportWebVitals';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Home from './containers/Home';
import About from './containers/About';
import Search from './containers/Search';
import NewsDetail from './containers/NewsDetail';
import { Box } from '@mui/material';

import Tesswiper from './containers/Tesswiper';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <NavBar/>
    <Box sx={{flexGrow:1, display:'blok', mt:10, mb:4}}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/detail/:kategori/:id" element={<NewsDetail />}></Route>
        <Route path="/login" element={
          <ProtectedRoute loginOnly={false}>
            <Login />
          </ProtectedRoute>
        }></Route>
        <Route path="/register" element={
          <ProtectedRoute loginOnly={false}>
            <Register />
          </ProtectedRoute>
        }></Route>
        <Route path="/pricing" element={<Pricing />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/swiper" element={<Tesswiper />}></Route>
      </Routes>
    </Box>
    <Footer/>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
