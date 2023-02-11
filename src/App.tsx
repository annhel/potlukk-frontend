import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from './navigation/navbar';
import { HomePage } from './pages/home-page';
import { PotlukkDetailsHostPage } from './pages/potlukk-details-host';
import { RegistrationPage } from './pages/registration-page';
import { SignInPage } from './pages/sign-in-page';


function App() {
  return (<>
  <BrowserRouter>
    <NavBar></NavBar>
  <Routes>
    <Route path='/' element={<SignInPage/>}/>
    <Route path='/home' element={<HomePage/>}/>
    <Route path='/registration' element={<RegistrationPage/>}/>
    <Route path='/potlukkinfohost/:potlukkID' element={<PotlukkDetailsHostPage/>}/>
    <Route path='/potlukkinfoguest/:potlukkID' element={<PotlukkDetailsHostPage/>}/>

  </Routes>
  
  </BrowserRouter>
  
  </>
  );
}

export default App;
