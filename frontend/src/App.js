import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';

let dataArray = []

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {triggers: [], nextIdx: 0, count: 0};
  }

  handleMicClick(event) {
    this.state.triggers.push({
      title: "testtitle",
      time: new Date(),
      body: "lorem ipsum",
      id: this.state.nextIdx,
      flagged: isFlagged("", this.state.count)
    });
    this.setState({
      triggers: this.state.triggers,
      nextIdx: this.state.nextIdx + 1,
      count: this.state.count + 1
    });
  }

  render() {
    return (
      <div className="App">
      
        <Jumbotron title="S.E.F." subTitle="Social Engineer Firewall" onClick={this.handleMicClick.bind(this)}/>
        
        <div class="container">
          {_.orderBy(this.state.triggers, 'id').reverse()
            .map(trigger =>
              <TextLine title={trigger.title} time={trigger.time} body={trigger.body} flagged={trigger.flagged} key={trigger.id} />
           )}
        </div>
      </div>
    );
  }
}

export class TextLine extends React.Component {
  render() {
    return (
      <div class="text-line">
        <div class={this.props.flagged}>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-block">
                <br/>
                <h4 class="card-title">{this.props.title}</h4>
                <h6 class="card-subtitle mb-2 text-muted">{formatDate(this.props.time)}</h6>
                <p class="card-text"><i>{this.props.body}</i></p>
                <br/>              
              </div>
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
              <p><a class="btn btn-primary btn-lg" href="#" role="button" onClick={this.props.onClick}><i class="fas fa-microphone"></i></a></p>    
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

function isFlagged(text, count) {
  // API Call
  var classification = count % 2 == 0 ? "flagged" : "not-flagged";
  console.log(classification);
  return classification
}

function formatDate(date) {
  var date = date.toString().split(" ");
  var shortDate = "";

  for(var i = 0; i < 5; i++) {
    shortDate += " " + date[i]
  }

  return shortDate;
}

