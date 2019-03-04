import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Coursesales from './Coursesales';

class App extends Component {
  render() {
    var courses = [
      {name: "Java", price: 199},
      {name: "JavaScript", price: 299},
      {name: "HTML", price: 399},
      {name: "C++", price: 199},
      {name: "C#", price: 599} 
    ];

    return (
      <div>
        <div className="App">
           <img src={logo} className="App-logo" alt="logo" />
           <h2> Welcome to course purchase page </h2>
        </div>
        <Coursesales items={courses} />
      </div>
    );
  }
}

export default App;
