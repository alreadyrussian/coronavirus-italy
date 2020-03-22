import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Google analytics
import ReactGA from 'react-ga';
ReactGA.initialize('UA-41390309-15');
// Now we need to know where our users going. For this, we have to trigger the pageview method from ReactGa
ReactGA.pageview(window.location.pathname + 
    window.location.search);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
