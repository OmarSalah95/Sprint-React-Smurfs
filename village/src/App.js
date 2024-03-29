import React, { Component } from 'react';
import axios from 'axios'
import { Route } from 'react-router-dom'


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

 deleteSmurf = (e, id) => {
    e.preventDefault();
    this.state.smurfs.map(smurf => smurf.id == id ? axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => console.log(err))
      : null
      )
    
    
}

  render() {
    if (!this.state.smurfs.length ) {
      return (
        <div className="App">
          <h1>Retreiving Smurfs From the Village...</h1>
        </div>
      );
    }else{
    return (
      <div className="App">
        <Route exact path='/addsmurf' render={props => <SmurfForm {...props} smurfs={this.state.smurfs} />}/>
        <Route
          exact 
          path='/' 
          render={props => 
            <Smurfs 
              {...props} 
              smurfs={this.state.smurfs} 
              deleteSmurf={this.deleteSmurf}
              />} 
        />
      </div>
    );
  }
}
}

export default App;
