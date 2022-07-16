import '../App.css';
import React from "react";
import axios from 'axios';

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.hadleLogout = this.hadleLogout.bind(this);
  }

  hadleLogout() {
    // request logout
    axios.post('http://localhost:8005/user/logout', null, {
        'Content-Type': 'application/json',
        withCredentials: true,
      })
      .then(() => this.props.logoutHandler()) 
      .catch((e) => alert(e));
  }

  render() {
    return this.props.userData == null ? (
        <div>Loading...</div>
    ) : (
      <div>
        <h1 className='App-title'>Sharpic</h1>
        <div className='App-center'>
          <h2>Main Page!!</h2>
          <button onClick={this.hadleLogout}>Logout</button>
        </div>
      </div>
    );
  }
}

export default MainPage;