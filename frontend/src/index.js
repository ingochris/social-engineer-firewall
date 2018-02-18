import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App, Jumbotron} from './App';
import registerServiceWorker from './registerServiceWorker';

const root = document.getElementById('root');

ReactDOM.render(<App />, root)
registerServiceWorker();