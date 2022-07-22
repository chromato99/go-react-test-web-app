import '../App.css';
import React from "react";
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      repassword: '',
      signupState: '',
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.signupStateHandler = this.signupStateHandler.bind(this);
    this.signupRequestHandler = this.signupRequestHandler.bind(this);
  }

  inputHandler(e) {  // hanling input of username and password
    this.setState({ [e.target.name]: e.target.value });
  }

  signupStateHandler(s) {
    this.setState({signupState: s});
  }

  signupRequestHandler() {
    if (this.state.password === this.state.repassword) {
      axios
      .post( // Login request
        'http://localhost:8005/user/signup',
        {
          username: this.state.username,
          password: this.state.password,
        },
        { 'Content-Type': 'application/json', withCredentials: true }
      )
      .then((res) => {
        console.log(res.data)
        if (res.data.state === 'OK') {
            this.props.signupHandler(true);
        } else {
          this.signupStateHandler(res.data.state);
        }
      })
      .catch((err) => alert(err));
    } else {
      this.signupStateHandler('Password is not same');
    }
    
  }

  render() {
    return (
      <div className="App-center">
        <h1>Signup Sharpic</h1>
        <h3>{this.state.signupState}</h3>
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
            <input 
            id="repassword"
            name="repassword"
            type="repassword"
            placeholder="Re-Password"
            onChange={(e) => this.inputHandler(e)}
            value={this.state.repassword}
            /><br></br>
          <button onClick={this.signupRequestHandler} className='signupBtn'>
            Signup
          </button>
        </div>
      </div>
    );
  }
}

export default Signup;