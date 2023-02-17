import React from 'react';
import { configureStore, applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HomePage } from './pages/home-page';
import { PotlukkDetailsHostPage } from './pages/potlukk-details-host';
import { RegistrationPage } from './pages/registration-page';
import { SignInPage } from './pages/sign-in-page';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { HostPotlukk } from './pages/host-potlukk-page';

import { PotlukkDetailsGuestPage } from './pages/potlukk-details-guest-page'
import { createPotlukkReducer, rootSaga} from './reducers/potlukk-creation-reducer';

import { guestPageReducer } from './reducers/guest-page-reducer';
//import { applyMiddleware } from 'redux';
import { Provider } from 'react-redux/es/exports';
import { InviteGuests } from './pages/invitation-page';
import { rootSaga } from './saga/guest-view';

export const queryClient = new QueryClient();


//create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create a store to use the REDUX reducer, and apply saga middleware
const allReducers = combineReducers({createPotlukkReducer});
const store = createStore(allReducers, applyMiddleware(sagaMiddleware));

// run saga middleware
sagaMiddleware.run(rootSaga)


function App() {
  return (<>
  
  <BrowserRouter>
  <QueryClientProvider client={queryClient}>
  <Provider store = {store}>
  <Routes>

    <Route path='/' element={<SignInPage/>}/>
    <Route path='/register' element={<RegistrationPage/>}/>
    <Route path='/home' element={<HomePage/>}/>
    <Route path='/potlukkinfohost/:potlukkId' element={<PotlukkDetailsHostPage/>}/>
    <Route path='/potlukkinfohost/:potlukkId/invites/' element={<InviteGuests/>}/>
    <Route path='/potlukkinfoguest/:potlukkId' element={<PotlukkDetailsGuestPage/>}/>
    <Route path='/potlukkregistration' element={<HostPotlukk/>}/>

  </Routes>
  </Provider>
  </QueryClientProvider>
  </BrowserRouter>
  
  </>
  );
}

export default App;

// function createStore(todoReducer: any, arg1: any) {
//   throw new Error('Function not implemented.');
// }

// function applyMiddleware(sagaMiddleware: SagaMiddleware<object>): any {
//   throw new Error('Function not implemented.');
// }


