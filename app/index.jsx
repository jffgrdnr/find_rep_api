var React = require('react');
var ReactDOM = require('react-dom');
var Home = require('./home.jsx');
import styles from './styles.css';

ReactDOM.render(
	<div className="page">
		<header>
			<h1>Who's My Representative?</h1>
		</header>
		<Home />
	</div>
  ,
  document.getElementById('app')
);