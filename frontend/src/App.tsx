import React from 'react';
import MainPage from './components/MainPage.tsx';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import SignIn from './components/SignIn.tsx';
import SignUp from './components/SignUp.tsx';
import MyTasks from './components/MyTasks.tsx';

class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
        <Routes>
          <Route path='/main' element = {<MainPage />}></Route>
          <Route path='/sign-in' element = {<SignIn />}></Route>
          <Route  path='/sign-up' element = {<SignUp />}></Route>
          <Route path='/my-tasks' element = {<MyTasks />}></Route>
        </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
