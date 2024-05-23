import React from 'react';
import AboutPage from './components/AboutPage.tsx';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignIn from './components/SignIn.tsx';
import SignUp from './components/SignUp.tsx';
import Main from './components/Main.tsx';
import { PointsContext } from './context/PointsContext.tsx';

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
            <PointsContext>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element = {<AboutPage />}></Route>
                        <Route path='/sign-in' element = {<SignIn />}></Route>
                        <Route  path='/sign-up' element = {<SignUp />}></Route>
                        {token ? (
                            <Route path="/user/*" element={<Main />} />
                        ) : (
                            <Route path='/' element = {<AboutPage />} />
                        )}
                    </Routes>
                </BrowserRouter>
            </PointsContext>
          </>
        );
  }
}

export default App;
