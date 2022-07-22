import './App.css';
import React from 'react';
import axios from 'axios';

import Login from './components/Login'
import Signup from './components/Signup'
import MainPgae from './components/MainPage'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      isSignup: false,
      userData: null,
    };
    this.loginHandler = this.loginHandler.bind(this);
    this.signupHandler = this.signupHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
    axios.get("http://localhost:8005/user")
      .then((res)=>{
        if(res.data.username !== "Not Login") {
          this.setUserInfo(res.data);
          this.loginHandler();
        }
      })
      .catch((err) => alert(err));
 }

  loginHandler() {
    this.setState({
      isLogin: true,
    });
  }

  setUserInfo(object) {
    this.setState({ userData: object });
  }

  signupHandler() {
    if (this.state.isSignup === false) {
      this.setState({ isSignup: true });
    } else {
      this.setState({ isSignup: false })
    }
  }

  logoutHandler() {
    this.setState({
      isLogin: false,
    });
  }

  render() {
    const { isLogin, isSignup } = this.state;
    return (
      <div>
        {isLogin ? ( // check login for render page
          <MainPgae
            logoutHandler={this.logoutHandler}
            userData={this.state.userData}
          />
        ) : (
          isSignup ? (
            <Signup
              signupHandler={this.signupHandler}
            />
          ) : (
          <Login
            loginHandler={this.loginHandler}
            signupHandler={this.signupHandler}
            setUserInfo={this.setUserInfo}
          />
        )
        )}
      </div>
    );
  }
}

export default App;
