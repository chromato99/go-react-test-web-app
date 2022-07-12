import './App.css';
import React from 'react';
import axios from 'axios';

import Login from './components/Login'
import MainPgae from './components/MainPage'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userData: null,
    };
    this.loginHandler = this.loginHandler.bind(this);
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

  logoutHandler() {
    this.setState({
      isLogin: false,
    });
  }

  render() {
    const { isLogin } = this.state;
    return (
      <div className='App'>
        {isLogin ? ( // check login for render page
          <MainPgae
            logoutHandler={this.logoutHandler}
            userData={this.state.userData}
          />
        ) : (
          <Login
            loginHandler={this.loginHandler}
            setUserInfo={this.setUserInfo}
          />
        )}
      </div>
    );
  }
}

export default App;
