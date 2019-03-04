import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Github from './Github';
import Header from './Components/Header';
import Auth0Lock from 'auth0-lock';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      idToken: '',
      profile: {}
    };
  }

  static defaultProps = {
    clientID: 'AWLsj9z2x2MsRb3qNNrK2230DGgd6S7s',
    domain: 'antriksh.auth0.com'
  }

  componentWillMount() {
      this.lock = new Auth0Lock(this.props.clientID, this.props.domain);
      this.lock.on('authenticated', (authResult) => {
            this.lock.getProfile(authResult.idToken, (error, profile) => {
              if(error) {
                console.log(error);
                return;
              }
              this.setProfile(authResult.idToken, profile);
            });
            
      });
  }

  setProfile(idToken, profile) {
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('profile', JSON.stringify(profile));

    this.setState({
      idToken: localStorage.getItem('idToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
    });
  }

  showLock() {
    this.lock.show();
  }

  render() {
    return (
      <div className="App">
        <Header 
        onLogin={this.showLock.bind(this)}
        /> 
        <Github />
      </div>
    );
  }
}

export default App;
