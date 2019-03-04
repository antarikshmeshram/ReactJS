import React, { Component } from 'react';
var firebase = require('firebase');
var uuid = require('uuid');
var config = {
    apiKey: "AIzaSyD3lwoq1zzI7XtVMLX-LLqMr5B1UH4zX_g",
    authDomain: "fir-app-ddc92.firebaseapp.com",
    databaseURL: "https://fir-app-ddc92.firebaseio.com",
    projectId: "fir-app-ddc92",
    storageBucket: "fir-app-ddc92.appspot.com",
    messagingSenderId: "94582530148"
  };
  firebase.initializeApp(config);

export default class Usurvey extends Component {
    nameSubmit(event) {
        var studentName = this.refs.name.value;
        this.setState({studentName: studentName}, function(){
            console.log(this.state)
        });
    }

    answerSelected(event) {
        var answers = this.state.answers;
        if(event.target.name === 'answer1') {
            answers.answer1 = event.target.value;
        } else if(event.target.name === 'answer2') {
            answers.answer2 = event.target.value;
        } else if(event.target.name === 'answer3') {
            answers.answer3 = event.target.value;
        }
        this.setState({answers: answers}, function() {
            console.log(this.state)
        });
    }

    questionSubmit() {
        firebase.database().ref('uSurvey/' + this.state.uid).set({
            studentName: this.state.studentName,
            answers: this.state.answers
        });
        this.setState({
            isSubmitted: true
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            uid: uuid.v1(),
            studentName: '',
            answers: {
                answer1: '',
                answer2: '',
                answer3: ''
            },
            isSubmitted: false
        };
        this.nameSubmit = this.nameSubmit.bind(this);
        this.answerSelected = this.answerSelected.bind(this);
        this.questionSubmit = this.questionSubmit.bind(this);
    }

    render() {
        var studentName;
        var questions;
        if(this.state.studentName === '' && this.state.isSubmitted === false) {
            studentName = <div>
                <hi>Enter your name: </hi>
                <form onSubmit={this.nameSubmit}>
                    <input type="text" placeholder="Enter your name" ref="name" />
                </form>
            </div>;
            questions = '';
        } else if(this.state.studentName !== '' && this.state.isSubmitted === false) {
            studentName = <h1>Welcome to U-survey, {this.state.studentName}</h1>;
            questions = <div>
                <h2>Here are some questions: </h2>
                <form onSubmit={this.questionSubmit}>
                    <div className="card">
                        <label>What kind of your courses you like the most?</label><br/><br/>
                        <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected} />Technology <br/> 
                        <input type="radio" name="answer1" value="Design" onChange={this.answerSelected} />Design <br/>
                        <input type="radio" name="answer1" value="Architecture" onChange={this.answerSelected} />Architecture <br/>
                        <input type="radio" name="answer1" value="Arts" onChange={this.answerSelected} />Arts <br/>
                    </div>
                    <input type="submit" value="submit" />
                </form>
            </div>
        } else if(this.state.isSubmitted === true) {
            studentName = <h1>Thanks, {this.state.studentName}</h1>
                             
        }
        return(
            <div>
                   {studentName}

                -------------------------------------------------------

                   {questions}
            </div>

        );
    }
}