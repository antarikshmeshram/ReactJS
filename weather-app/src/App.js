import React, { Component } from 'react';
import './App.css';
import Titles from "./components/Title"
import Form from "./components/Form"
import Weather from "./components/Weather"

const API_KEY = "3c82ea65552cf4ff2b81990ce99518af";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      temperature: '',
      city: '',
      country: '',
      humidity: '',
      description: '',
      error: ''
    }
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if(city && country) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
      const data = await api_call.json();
      console.log(data);
      this.setState({ 
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0],
     });
    } else {
      this.setState({
        error: "Please enter the values."
      });
    }
  }

  render() {
    return (
      <div>
        <Titles />
        <Form getWeather={this.getWeather} />
        <Weather 
          temperature={this.state.temperature} 
          humidity={this.state.humidity}
          city={this.state.city}
          country={this.state.country}
          description={this.state.description}
          error={this.state.error}
        />
      </div>
    );
  }
};

export default App;
