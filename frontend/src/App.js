import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';

let dataArray = []

export class App extends Component {
  render() {
    return (
      <div className="App">
      
        < Jumbotron title="S.E.F." subTitle="Social Engineer Firewall"/>
        
        <div class="container">
          <TextLine />
          <TextLine />
          <TextLine />
        </div>
      </div>
    );
  }
}

export class TextLine extends React.Component {
  render() {
    return (
      <div class="text-line">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-block">
                <br/>
                <h4 class="card-title">Trigger Type</h4>
                <h6 class="card-subtitle mb-2 text-muted">{getDate()}</h6>
                <p class="card-text"><i>Some quick example text to build on the card title and make up the bulk of the card's content.</i></p>
                <br/>              
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class Jumbotron extends React.Component {
  render() {
    return (
      <div class="container head-section">
        <div class="row">
          <div class="col-md-12">
            <div class="jumbotron">
              <h1>{this.props.title}</h1>
              <p>{this.props.subTitle}</p>
              <p><a class="btn btn-primary btn-lg" href="#" role="button" onClick={test}><i class="fas fa-microphone"></i></a></p>    
            </div>  
          </div>
        </div>
      </div>
    ); 
  }
}

function test() {
  console.log("printtt");
  ReactDOM.render(<h1>test</h1>, document.getElementById("root"))
}

function getDate() {
  var date = new Date().toString().split(" ");
  var shortDate = "";

  for(var i = 0; i < 5; i++) {
    shortDate += " " + date[i]
  }

  return shortDate;
}

