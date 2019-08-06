
import React, { Component } from 'react';
import './App.css';
//import axios from 'axios';
import { connect } from 'react-redux';
import Map from '../Maps/Maps';





class App extends Component {

  // componentDidMount() {
  //   this.getSearch();
  // }

  state = {
    search: '',
  }


  getSearch = () => {
    this.props.dispatch({ type: 'GOOGLE_SEARCH' })
  }



  handleChange = (event, propsName) => {
    console.log('In Handle Change');
    this.setState({
      [propsName]: event.target.value
    })

  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('in Handle Submit');
    this.props.dispatch({type: 'POST_GOOGLE', payload: this.state})


  }


  render() {
    //console.log(this.state);



    return (
      
      
      <div>
        <h1>Google Maps Places Spike </h1>
       



        <div>
          <Map google={this.props.google}
            center={{ lat: 18.5204, lng: 73.8567 }}
            height='300px'
            zoom={15}
          />
        </div>
        <br />
        <br/>
        <br/>

        <div>
          <form>
            <label>Search for Local Gyms</label>
            <input onChange={(event) => this.handleChange(event, 'search')} type='text' />
            <button onClick={this.handleSubmit} type='submit'>Submit</button>
          </form>
        </div>

        {this.props.reduxStore.googleApi.map((item, i) => (
          <div key={i}>
           
              <h2>Name:</h2>{item.name}
              <br />
              <h2>Address: </h2>{item.formatted_address}
              <br />
              <h2>Image:</h2> {JSON.stringify((item.photos ? item.photos[0].html_attributions : item.photo))} 
              <img src= {item.photos ? item.photos[0].html_attributions : item.photo}/>
              <br/>
              <h2>Hours: </h2> 
              <h2>Ratings: {item.user_ratings_total}</h2>
          
          </div>
          
          
        )
        )}

       

       

        




      </div>
    )
  }
}

const mapsToPropsState = (reduxStore) => ({
  reduxStore
})

export default connect(mapsToPropsState)(App);