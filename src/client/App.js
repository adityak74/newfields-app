import React from 'react';
import './app.css';
import { compose } from 'redux';
import { lifecycle } from 'recompose';

const App = () => (
  <div className="root">
      <h1>Newfields - <span className="tagline">Data Collection App</span></h1>
      <span className="divider" />
      <span className="divider-blue" />
      <div className="section2" />
      <div className="section3" />
  </div>
);

const enhance = compose(
  lifecycle({
    componentDidMount() {
      
    },
  }),
);

export default enhance(App);
