import React, { Component } from 'react';
var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyCJU73ddLO29bR9zuWgXSU0o2mS0Ub1Zqc",
    authDomain: "fir-login-d92cc.firebaseapp.com",
    databaseURL: "https://fir-login-d92cc.firebaseio.com",
    projectId: "fir-login-d92cc",
    storageBucket: "fir-login-d92cc.appspot.com",
    messagingSenderId: "1036318532985"
  };
  firebase.initializeApp(config);

export default class Authen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            err: ''
        };
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.logout = this.logout.bind(this);
        this.google = this.google.bind(this);
    }

    google() {
        console.log("In google method");
        var provider = new firebase.auth.GoogleAuthProvider();
        var promise = firebase.auth().signInWithPopup (provider);
        promise.then(result => {
            var user = result.user;
            console.log(user);
            firebase.database().ref('users/'+user.uid).set({
                email: user.email,
                name: user.displayName
            });
        });
        promise.catch(e => {
            var message = e.message;
            console.log(message);
        });
    }

    login(event) {
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        console.log(email, password);

        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(e => {

            var err = e.message;
            console.log(err);
            this.setState({
                err: err
            });
        });
    }

    signup() {
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        console.log(email, password);
        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise
        .then(user => {
            var err = "Welcome" + user.email;
            firebase.database().ref('users/'+user.uid).set({
                email: user.email
            });
            console.log(user);
            this.setState({err : err});
        })
        .catch(e => {
            var err = e.message;
            console.log(err);
            this.setState({
                err: err
            });
               
        });
    }

    logout() {

    }

    render() {
        return(
            <div>
                <input id="email" ref="email" type="email" placeholder="Enter your email address" /><br />   
                <input id="pass" ref="password" type="password" placeholder="Enter your password" /><br />   
                <p>{this.state.err}</p>
                <button onClick={this.login}>Log In</button>
                <button onClick={this.signup}>Sign Up</button>
                <button onClick={this.logout}>Log Out</button><br />
                <button onClick={this.google} id="google">Sign in with google</button>
                </div>
        );
    }
}

