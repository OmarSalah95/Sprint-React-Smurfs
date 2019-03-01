import React, { Component } from 'react';
import axios from 'axios'
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<components>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
   componentDidMount() {
    axios     
    .get(`http://localhost:3333/smurfs`)
       .then(res => {
        //  console.log(res.data);
         this.setState({
           smurfs: res.data
         });
       })
       .catch(err => {
         console.log(err);
       });
}

  render() {
    return (
      <div className="App">
      
        <SmurfForm />

        <Smurfs smurfs={this.state.smurfs} />
      </div>
    );
  }
}

export default App;
