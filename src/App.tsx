import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavBar } from './navigation/navbar';
import { HomePage } from './pages/home-page';
import { PotlukkDetailsHostPage } from './pages/potlukk-details-host';
import { RegistrationPage } from './pages/registration-page';
import { SignInPage } from './pages/sign-in-page';

const queryClient = new QueryClient();

function App() {
  return (<>
  <BrowserRouter>
  <NavBar></NavBar>
  <QueryClientProvider client={queryClient}>

  <Routes>

    <Route path='/' element={<SignInPage/>}/>
    <Route path='/register' element={<RegistrationPage/>}/>
    <Route path='/home' element={<HomePage/>}/>
    <Route path='/potlukkinfohost/:lukkId' element={<PotlukkDetailsHostPage/>}/>
    <Route path='/potlukkinfoguest/:lukkId' element={<PotlukkDetailsHostPage/>}/>

  </Routes>
  
  </QueryClientProvider>
  </BrowserRouter>
  
  </>
  );
}

export default App;
