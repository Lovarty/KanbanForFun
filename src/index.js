import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Board from './Board';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Board />, document.getElementById('root'));
registerServiceWorker();
