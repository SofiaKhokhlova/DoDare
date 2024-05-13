import React from 'react';
import MainPage from './components/MainPage.tsx';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignIn from './components/SignIn.tsx';
import SignUp from './components/SignUp.tsx';
import MyTasks from './components/MyTasks.tsx';

class App extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            token: localStorage.getItem('accessToken')
        }
    }

    componentDidUnmount() {
        window.addEventListener('storage', this.handleStorageChange);
    }

    componentWillUnmount() {
        window.removeEventListener('storage', this.handleStorageChange);
    }

    handleStorageChange = () => {
        this.setState({
            token: localStorage.getItem('accessToken')
        })
    }

    render() {
        const token = this.state;
        return (
          <>
            <BrowserRouter>
            <Routes>
              <Route path='/main' element = {<MainPage />}></Route>
              <Route path='/sign-in' element = {<SignIn />}></Route>
              <Route  path='/sign-up' element = {<SignUp />}></Route>
                {token ? (
                    <Route path="/my-tasks" element={<MyTasks />} />
                ) : (
                    <Route path='/main' element = {<MainPage />} />
                )}
            </Routes>
            </BrowserRouter>
          </>
        );
  }
}

export default App;
