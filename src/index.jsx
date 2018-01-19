import React from 'react';
import ReactDOM from 'react-dom';
import LogVisualizer from './components/LogVisualizer';

const resNode = document.createElement('p');
document.body.appendChild(resNode);
resNode.textContent = 'rendering...';

const appNode = document.createElement('div');
document.body.appendChild(appNode);
ReactDOM.render(<LogVisualizer {...require('./empty-props.json')} />, appNode);

setTimeout(() => {
  ReactDOM.render(<LogVisualizer {...require('./props.json')} />, appNode);
}, 10);
