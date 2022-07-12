import '../App.css';
import logo from '../logo.svg';
import React from "react";
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.loginRequestHandler = this.loginRequestHandler.bind(this);
  }

  inputHandler(e) {  // hanling input of username and password
    this.setState({ [e.target.name]: e.target.value });
  }

  loginRequestHandler() {

    axios
      .post( // Login request
        'http://localhost:8005/user/login',
        {
          username: this.state.username,
          password: this.state.password,
        },
        { 'Content-Type': 'application/json', withCredentials: true }
      )
      .then((res) => {
        this.props.loginHandler(true);
        // get user info
        return axios.get('http://localhost:8005/user', {
          withCredentials: true,
        });
      })
      .then((res) => {
        console.log(res.data)
        let { username, email } = res.data;
        this.props.setUserInfo({ // set user info
          username: username,
          email: email,
        });
      })
      .catch((err) => alert(err));
  }

  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <input
            id="username"
            name="username"
            placeholder="Username"
            onChange={(e) => this.inputHandler(e)}
            value={this.state.username}
            /><br></br>
          <input 
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => this.inputHandler(e)}
            value={this.state.password}
            /><br></br>
          <button onClick={this.loginRequestHandler} className='loginBtn'>
            Login
          </button>
        </div>
      </header>
    );
  }
}

export default Login;